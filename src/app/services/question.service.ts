import {ObjectId} from 'mongodb';
import {examRepository, questionRepository} from '../database';
import {BadRequestError, ForbiddenError} from '../errors';

type CreateQuestionParams = {
  question: string;
  examId: ObjectId;
  answer: number;
  options: Array<string>;
  userId: ObjectId;
};

type GetQuestionParams = {
  questionId: ObjectId;
  userId: ObjectId;
};

type UpdateQuestionParams = {
  questionId: ObjectId;
  question?: string;
  examId?: ObjectId;
  answer?: number;
  options?: Array<string>;
};

class QuestionService {
  private readonly repository = questionRepository;
  private readonly examrepository = examRepository;

  async createQuestion({
    question,
    examId,
    answer,
    options,
    userId,
  }: CreateQuestionParams) {
    const exam = await examRepository.findExamById({id: examId});

    if (!exam) throw new BadRequestError('No exam found with the given examId');

    if (exam.created_by.toString() !== userId.toString())
      throw new ForbiddenError('You dont have access to this exam');

    const {id} = await this.repository.createQuestion({
      question,
      examId,
      answer,
      options,
    });

    return {
      questionId: id,
      question,
      examId,
      answer,
      options,
    };
  }

  async getQuestion({questionId, userId}: GetQuestionParams) {
    const question = await this.repository.findQuestionById({
      id: questionId,
    });

    if (!question) {
      throw new BadRequestError(
        'Could not find any question with the given id'
      );
    }

    return question;
  }

  async updateQuestion({
    questionId,
    question,
    examId,
    answer,
    options,
  }: UpdateQuestionParams) {
    const updatedQuestion = await this.repository.updateQuestionById({
      id: questionId,
      question,
      examId,
      answer,
      options,
    });

    if (!updatedQuestion) {
      throw new Error('Failed to update question');
    }

    return updatedQuestion;
  }

  async getQuestionsByExamId({examId}: {examId: ObjectId}) {
    const questions = await this.repository.findQuestionsByExamId({
      examId: examId,
    });

    return questions;
  }
}

const questionService = new QuestionService();
export default questionService;
