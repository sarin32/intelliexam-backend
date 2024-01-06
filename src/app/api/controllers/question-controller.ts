import {Context} from 'koa';
import {
  arraySchema,
  numberSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import {BadRequestError} from '../../errors';
import {ObjectId} from 'mongodb';
import questionService from '../../services/question.service';

const getQuestionSchema = objectSchema({
  object: {
    questionId: stringSchema({}),
  },
});

const createExamSchema = objectSchema({
  object: {
    answer: numberSchema(),
    examId: stringSchema({}),
    options: arraySchema({object: stringSchema({})}),
    question: stringSchema({}),
  },
});

export async function getQuestionetails(ctx: Context) {
  const {userId} = ctx.state.user;

  const {error, value} = validateObject(getQuestionSchema, ctx.request.body);
  if (error) throw new BadRequestError(error.message);

  const {questionId} = value;
  if (!ObjectId.isValid(questionId))
    throw new BadRequestError('Invalid questionId');

  ctx.body = await questionService.getQuestion({userId, questionId});
}

export async function createQuestion(ctx: Context) {
  const {userId} = ctx.state.user;

  const {error, value} = validateObject(createExamSchema, ctx.request.body);
  if (error) throw new BadRequestError(error.message);

  const {answer, examId, options, question} = value;

  ctx.body = await questionService.createQuestion({
    answer,
    examId: new ObjectId(examId),
    options,
    question,
    userId,
  });
}
