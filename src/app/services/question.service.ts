import {ObjectId} from 'mongodb';
import {questionRepository} from '../database';
import {BadRequestError} from '../errors';
import examService from './exam.service';

type CreateQuestionParams = {
  question: string;
  examId: string | ObjectId;
  answer: number;
  options: Array<string>;
  userId: string | ObjectId;
};

type GetQuestionParams = {
  questionId: string | ObjectId;
};

type UpdateQuestionParams = {
  questionId: string | ObjectId;
  question?: string;
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
    if (!this.isValidAnswerAndOption(options, answer))
      throw new BadRequestError('Invalid answer value');
    const {id} = await this.repository.createQuestion({
      question,
      examId: new ObjectId(examId),
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
      id: new ObjectId(questionId),
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
    answer,
    options,
  }: UpdateQuestionParams) {
    const currentQuestion = await this.repository.findQuestionById({
      id: new ObjectId(questionId),
    });
    if (!currentQuestion) throw new Error('Question not found');

    if (
      !this.isValidAnswerAndOption(
        options || currentQuestion.options,
        answer || currentQuestion.answer
      )
    )
      throw new BadRequestError(
        'The answer and options does not match each other'
      );

    const updatedQuestion = await this.repository.updateQuestionById({
      id: new ObjectId(questionId),
      question,
      answer,
      options,
    });

    return updatedQuestion;
  }

  async getQuestionsByExamId({examId}: {examId: ObjectId}) {
    const questions = await this.repository.findQuestionsByExamId({
      examId: examId,
    });

    return questions;
  }

  isValidAnswerAndOption(options: Array<string>, answer: number) {
    return answer >= 0 && answer < options.length;
  }

  async hasAccessToQuestion({
    examId,
    questionId,
    userId,
  }: {
    examId: string | ObjectId;
    questionId: string | ObjectId;
    userId: string | ObjectId;
  }) {
    if (await examService.hasAccessToExam({examId, userId})) {
      if (
        await this.repository.findQuestion({
          examId: new ObjectId(examId),
          id: new ObjectId(questionId),
        })
      ) {
        return true;
      }
    }
    return false;
  }
}

const questionService = new QuestionService();
export default questionService;
