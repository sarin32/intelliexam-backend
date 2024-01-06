import {ObjectId} from 'mongodb';
import {questionRepository} from '../database';
import {BadRequestError} from '../errors';

type CreateQuestionParams = {
  question: string;
  examId: ObjectId;
  answer: number;
  options: Array<string>;
};

type GetQuestionParams = {
  questionId: ObjectId;
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

  async createQuestion({
    question,
    examId,
    answer,
    options,
  }: CreateQuestionParams) {
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

  async getQuestion({questionId}: GetQuestionParams) {
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

  async getQuestionsByExamId({examId}:{ examId: ObjectId}) {
    const questions = await this.repository.findQuestionsByExamId({
      examId: examId,
    });
    
    return questions;
  }
}

const questionService = new QuestionService();
export default questionService;
