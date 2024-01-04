import {userRepository} from '../database';
import {
  generatePassword,
  generateSalt,
  validatePassword,
} from '../utils/password-util';
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

class UserService {
  private readonly repository = userRepository;

  async signup({email, name, password}: SignupParams) {
    const salt = await generateSalt();
    password = await generatePassword(password, salt);

    const {userId} = await this.repository.createUser({
      email,
      name,
      password,
      salt,
    });

    const token = await generateSignature({userId});
    return {
      userId,
      token,
    };
  }

  async signIn({email, password}: SignInParams) {
    const user = await this.repository.findUserByEmail({email});
    if (!user) throw new Error('Invalid Credenials');

    const isValidPassword = validatePassword(
      password,
      user.password,
      user.salt
    );
    if (!isValidPassword) throw new Error('Invalid Credenials');

    const token = await generateSignature({userId: user._id});
    return {
      userId: user._id,
      token,
    };
  }
}

const userService = new UserService();
export default userService;
