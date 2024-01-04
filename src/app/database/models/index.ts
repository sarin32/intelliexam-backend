import connection from '../connection';
import {UserSchema} from './user.schema';

export const userModel = connection.getCollection<UserSchema>('users');
