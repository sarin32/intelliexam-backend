import {ObjectId} from 'mongodb';
import {examModal} from '../models';
import {ExamSchema} from '../models/exam.schema';

type CreateExamParams = {
  name: string;
  description?: string;
  createdBy: ObjectId;
};

type findExamByIdParams = {
  id: ObjectId;
};

class ExamRepository {
  private readonly modal = examModal;

  async createExam({name, description, createdBy}: CreateExamParams) {
    const exam: ExamSchema = {
      name,
      created_by: createdBy,
      created_at: new Date(),
    };
    if (description) {
      exam.description = description;
    }
    const result = await this.modal.insertOne(exam);

    if (!result.acknowledged) {
      throw new Error('Failed to create Exam');
    }
    return {
      id: result.insertedId,
    };
  }

  async findExamById({id}: findExamByIdParams) {
    const result = await this.modal.findOne({
      _id: id,
    });
    return result;
  }
}

const examRepository = new ExamRepository();
export default examRepository;
