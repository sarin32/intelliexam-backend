import {Document, ObjectId} from 'mongodb';

export interface QuestionSchema extends Document {
  exam_id: ObjectId;
  question: string;
  options: Array<string>;
  answer: number;
}
