import connection from '../connection';
import {EmailVerificationSchema} from './email-verification.schema';
import {ExamSchema} from './exam.schema';
import {QuestionSchema} from './question.schema';
import {UserSchema} from './user.schema';

export const userModal = connection.getCollection<UserSchema>('users');
export const emailVerificationModal =
  connection.getCollection<EmailVerificationSchema>('email_verification');
export const examModal = connection.getCollection<ExamSchema>('exams');
export const questionsModal =
  connection.getCollection<QuestionSchema>('questions');
