import {ObjectId} from 'mongodb';
import {examModal} from '../models';

type CreateExamParams = {
  name: string;
  description: string;
  createdBy: ObjectId;
};

type findExamByIdParams = {
  id: ObjectId;
};

class ExamRepository {
  private readonly modal = examModal;

  async createExam({name, description, createdBy}: CreateExamParams) {
    const result = await this.modal.insertOne({
      name,
      created_by: createdBy,
      description,
      created_at: new Date(),
    });
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
