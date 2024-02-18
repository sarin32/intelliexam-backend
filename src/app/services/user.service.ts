import {ObjectId} from 'mongodb';
import {LOGIN_TOKEN_LIFETIME} from '../config/config';
import {
  VERIFICATION_MAX_RESEND_INTERVAL,
  VERIFICATION__MAX_TRIES,
} from '../config/constants';
import {emailVerficationRepository, userRepository} from '../database';
import {AuthorizationError, ConflictError, ForbiddenError} from '../errors';
import emailUtil from '../utils/email-util';
import {
  generatePassword,
  generateSalt,
  validatePassword,
} from '../utils/password-util';
import {generateRandomString} from '../utils/string-util';
import {generateTemplate} from '../utils/template-util';
import {generateSignature} from '../utils/token-util';

type SignupParams = {
  email: string;
  password: string;
  name: string;
};

type SignInParams = {
  email: string;
  password: string;
};

type getUserInfoParams = {
  userId: string;
};

class UserService {
  private readonly repository = userRepository;
  private readonly emailVerificationRepository = emailVerficationRepository;

  async signup({email, name, password}: SignupParams) {
    const salt = await generateSalt();
    password = await generatePassword(password, salt);

    const isUserExists = await this.repository.isUserExistsWithEmail({email});
    if (isUserExists)
      throw new ConflictError('An account with this email id already exists');

    const {id} = await this.repository.createUser({
      email,
      name,
      password,
      salt,
    });

    const payload = {
      userId: id,
    };
    const token = await generateSignature(payload, LOGIN_TOKEN_LIFETIME);

    return {
      userId: id,
      token: `Bearer ${token}`,
    };
  }

  public async sendEmailForVerification({userId}: {userId: string}) {
    const user = await this.repository.findUserById({id: new ObjectId(userId)});
    if (!user) throw new Error('Could not find the user with the given id');

    if (user.isVerified)
      throw new ConflictError('The user email is already verified');

    const existingVerification =
      await this.emailVerificationRepository.getEmailVerification({
        userId: user._id,
      });

    if (existingVerification) {
      const timeSinceLastSend =
        Date.now() - existingVerification.last_send_time.getTime();

      if (timeSinceLastSend < VERIFICATION_MAX_RESEND_INTERVAL) {
        throw new ForbiddenError(
          'Resend request is not allowed within 1 minute of the previous request'
        );
      }

      if (existingVerification.verification_try >= VERIFICATION__MAX_TRIES) {
        throw new ForbiddenError(
          'Email verification tries have been exhausted'
        );
      }

      await this.emailVerificationRepository.updateVerificationById({
        id: existingVerification._id,
        incrementVerificationTry: true,
      });

      await this.sendEmailVerificationEmail({
        emailId: user.email,
        otp: existingVerification.otp,
      });
    } else {
      const otp = generateRandomString(6, {includeNumbers: true});

      await this.emailVerificationRepository.createEmailVerification({
        email: user.email,
        otp,
        userId: user._id,
      });

      await this.sendEmailVerificationEmail({
        emailId: user.email,
        otp,
      });
    }
  }

  async verifyEmailVerificationOTP({
    otp,
    userId,
  }: {
    otp: string;
    userId: string | ObjectId;
  }) {
    const verification =
      await this.emailVerificationRepository.getEmailVerification({
        userId: new ObjectId(userId),
      });

    if (!verification)
      throw new ConflictError('No verification process has been initiated');

    if (verification.otp !== otp) throw new AuthorizationError('Invalid OTP');

    await this.repository.markUserAsVerified({userID: new ObjectId(userId)});

    return {message: 'User email verified successfully'};
  }

  private async sendEmailVerificationEmail({
    otp,
    emailId,
  }: {
    otp: string;
    emailId: string;
  }) {
    const body = await generateTemplate('email-verification', {otp});
    await emailUtil.sendEmail({
      to: emailId,
      subject: 'OTP for your email verification',
      html: body,
      senderName: 'IntelliExam Admin',
    });
  }

  async signIn({email, password}: SignInParams) {
    const user = await this.repository.findUserByEmail({email});
    if (!user) throw new AuthorizationError('Invalid Credenials');

    const isValidPassword = await validatePassword(
      password,
      user.password,
      user.salt
    );
    if (!isValidPassword) throw new AuthorizationError('Invalid Credenials');

    const payload = {
      userId: user._id,
    };
    const token = await generateSignature(payload, LOGIN_TOKEN_LIFETIME);
    return {
      userId: user._id,
      token: `Bearer ${token}`,
    };
  }

  async getUserInfo({userId}: getUserInfoParams) {
    const user = await this.repository.findUserById({id: new ObjectId(userId)});

    if (!user) throw new Error('Invalid user id');

    return user;
  }
}

const userService = new UserService();
export default userService;
