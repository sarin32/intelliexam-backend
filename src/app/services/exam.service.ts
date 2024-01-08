import {ObjectId} from 'mongodb';
import {examRepository} from '../database';
import {BadRequestError} from '../errors';
import questionService from './question.service';

type CreateExamParams = {
  name: string;
  description?: string;
  userId: string;
};

type GetExamParams = {
  examId: string | ObjectId;
  userId: string | ObjectId;
};

class ExamService {
  private readonly repository = examRepository;

  async createExam({name, description, userId}: CreateExamParams) {
    const {id} = await this.repository.createExam({
      name,
      description,
      createdBy: new ObjectId(userId),
    });

    return {
      examId: id,
      name,
      description,
      userId,
    };
  }

  async getExam({examId}: GetExamParams) {
    const exam = await this.repository.findExamById({id: new ObjectId(examId)});

    if (!exam) {
      throw new BadRequestError('No exam found with the given id');
    }

    exam.questions = await questionService.getQuestionsByExamId({
      examId: new ObjectId(examId),
    });

    return exam;
  }

  async hasAccessToExam({
    examId,
    userId,
  }: {
    examId: string | ObjectId;
    userId: string | ObjectId;
  }) {
    const exam = await this.repository.examExists({
      id: new ObjectId(examId),
      createdBy: new ObjectId(userId),
    });
    return exam;
  }
}

const examService = new ExamService();
export default examService;
