import {Document, ObjectId} from 'mongodb';

export interface ExamSchema extends Document {
  name: string;
  description: string | undefined;
  created_at: Date;
  created_by: ObjectId;
}
