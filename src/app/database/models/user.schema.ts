import {Document} from 'mongodb';

export interface UserSchema extends Document {
  name: string;
  email: string;
  password: string;
  salt: string;
}
