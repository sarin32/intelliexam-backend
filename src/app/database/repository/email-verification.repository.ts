import {Filter, ObjectId, UpdateFilter} from 'mongodb';
import {emailVerificationModal} from '../models';
import {EmailVerificationSchema} from '../models/email-verification.schema';

type CreateEmailVerfictionParams = {
  userId: ObjectId;
  otp: string;
  email: string;
};

class EmailVerficationRepository {
  private readonly modal = emailVerificationModal;

  async createEmailVerification({
    email,
    otp,
    userId: user_id,
  }: CreateEmailVerfictionParams) {
    const result = await this.modal.insertOne({
      user_id,
      email,
      otp,
      last_send_time: new Date(),
      verification_try: 1,
    });
    if (!result.acknowledged) {
      throw new Error('Failed to create email verification');
    }

    return {
      id: result.insertedId,
    };
  }

  async getEmailVerification({userId}: {userId: ObjectId}) {
    const query: Filter<EmailVerificationSchema> = {user_id: userId};

    return await this.modal.findOne(query);
  }

  async updateVerificationById({
    id,
    incrementVerificationTry,
    otp,
  }: {
    id: ObjectId;
    incrementVerificationTry: boolean;
    otp?: string;
  }) {
    const query: Filter<EmailVerificationSchema> = {_id: id};

    const update: UpdateFilter<EmailVerificationSchema> = {};

    if (incrementVerificationTry) {
      update.$inc = {verification_try: 1};
    }

    const set: Record<string, unknown> = {};
    if (otp) {
      set.otp = otp;
    }
    set.last_send_time = new Date();
    update.$set = set;
    const result = await this.modal.updateOne(query, update);
    if (!result.acknowledged) throw new Error('Failed to update verification');

    if (result.modifiedCount < 1)
      throw new Error('Failed to update verification');
  }
}

const emailVerficationRepository = new EmailVerficationRepository();
export default emailVerficationRepository;
