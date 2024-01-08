import {ObjectId} from 'mongodb';
import {questionsModal} from '../models';
import {QuestionSchema} from '../models/question.schema';

type CreateQuestionParams = {
  question: string;
  examId: ObjectId;
  answer: number;
  options: Array<string>;
};

type findQuestionByIdParams = {
  id: ObjectId;
};

type findQuestionParams = {
  id: ObjectId;
  examId: ObjectId;
};

type UpdateQuestionParams = {
  id: ObjectId;
  question?: string;
  examId?: ObjectId;
  answer?: number;
  options?: Array<string>;
};

class QuestionRepository {
  private readonly modal = questionsModal;

  async createQuestion({
    answer,
    examId,
    options,
    question,
  }: CreateQuestionParams) {
    const result = await this.modal.insertOne({
      question,
      exam_id: examId,
      answer,
      options: options,
    });
    if (!result.acknowledged) {
      throw new Error('Failed to create question');
    }
    return {
      id: result.insertedId,
    };
  }

  async createQuestions(questions: Array<QuestionSchema>) {
    const result = await this.modal.insertMany(questions);
    if (!result.acknowledged) {
      throw new Error('Failed to create question');
    }
    return {
      ids: result.insertedIds,
      count: result.insertedCount,
    };
  }

  async findQuestionById({id}: findQuestionByIdParams) {
    const result = await this.modal.findOne({
      _id: id,
    });
    return result;
  }

  async findQuestion({id, examId}: findQuestionParams) {
    const result = await this.modal.findOne({
      _id: id,
      exam_id: examId,
    });
    return result;
  }

  async updateQuestionById({
    id,
    question,
    examId,
    answer,
    options,
  }: UpdateQuestionParams) {
    const updateQuery: {
      question?: string;
      exam_id?: ObjectId;
      answer?: number;
      options?: Array<string>;
    } = {};

    if (question !== undefined) {
      updateQuery.question = question;
    }
    if (examId !== undefined) {
      updateQuery.exam_id = examId;
    }
    if (answer !== undefined) {
      updateQuery.answer = answer;
    }
    if (options !== undefined) {
      updateQuery.options = options;
    }

    const result = await this.modal.findOneAndUpdate(
      {_id: id},
      {$set: updateQuery},
      {returnDocument: 'after'}
    );

    if (!result) {
      throw new Error('Failed to update question');
    }

    return result;
  }

  async findQuestionsByExamId({examId}: {examId: ObjectId}) {
    const questions = await this.modal
      .find({
        exam_id: examId,
      })
      .toArray();

    return questions;
  }
}

const questionRepository = new QuestionRepository();
export default questionRepository;
