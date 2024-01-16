import {Document, ObjectId} from 'mongodb';

export interface EmailVerificationSchema extends Document {
  user_id: ObjectId;
  otp: string;
  email: string;
  last_send_time: Date;
  verification_try: number;
}
