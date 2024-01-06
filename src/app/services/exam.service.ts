import {ObjectId} from 'mongodb';
import {examRepository} from '../database';
import {BadRequestError} from '../errors';

type CreateExamParams = {
  name: string;
  description: string;
  createdBy: ObjectId;
};

type GetExamParams = {
  examId: string;
};

class ExamService {
  private readonly repository = examRepository;

  async createExam({name, description, createdBy}: CreateExamParams) {
    const {id} = await this.repository.createExam({
      name,
      description,
      createdBy,
    });

    return {
      examId: id,
      name,
      description,
      createdBy,
    };
  }

  async getExam({examId}: GetExamParams) {
    const exam = await this.repository.findExamById({id: new ObjectId(examId)});

    if (!exam) {
      throw new BadRequestError('No exam found with the given id');
    }

    return exam;
  }
}

const examService = new ExamService();
export default examService;
