import {ObjectId} from 'mongodb';
import {examRepository} from '../database';
import {BadRequestError, ForbiddenError} from '../errors';
import questionService from './question.service';

type CreateExamParams = {
  name: string;
  description?: string;
  userId: ObjectId;
};

type GetExamParams = {
  examId: string;
  userId: string;
};

class ExamService {
  private readonly repository = examRepository;

  async createExam({name, description, userId}: CreateExamParams) {
    const {id} = await this.repository.createExam({
      name,
      description,
      createdBy: userId,
    });

    return {
      examId: id,
      name,
      description,
      userId,
    };
  }

  async getExam({examId, userId}: GetExamParams) {
    const exam = await this.repository.findExamById({id: new ObjectId(examId)});

    if (!exam) {
      throw new BadRequestError('No exam found with the given id');
    }

    if (exam.created_by.toString() !== userId)
      throw new ForbiddenError('You dont have access to this resource');

    exam.questions = await questionService.getQuestionsByExamId({
      examId: new ObjectId(examId),
    });

    return exam;
  }
}

const examService = new ExamService();
export default examService;
