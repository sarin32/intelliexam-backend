import {Document} from 'mongodb';

export interface UserSchema extends Document {
  name: string;
  email: string;
  password: string;
  salt: string;
  created_at: Date;
  isVerififed: Boolean;
}
