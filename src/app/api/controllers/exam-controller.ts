import {Context} from 'koa';
import {
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import {BadRequestError} from '../../errors';
import {ObjectId} from 'mongodb';
import examService from '../../services/exam.service';

const getExamSchema = objectSchema({
  object: {
    examId: stringSchema({}),
  },
});

const createExamSchema = objectSchema({
  object: {
    name: stringSchema({}),
    description: stringSchema({required: false}),
  },
});

export async function getExamDetails(ctx: Context) {
  const {userId} = ctx.state.user;

  const {error, value} = validateObject(getExamSchema, ctx.request.body);
  if (error) throw new BadRequestError(error.message);

  const {examId} = value;
  if (!ObjectId.isValid(examId)) throw new BadRequestError('Invalid examId');

  ctx.body = await examService.getExam({userId, examId});
}

export async function createExam(ctx: Context) {
  const {userId} = ctx.state.user;

  const {error, value} = validateObject(createExamSchema, ctx.request.body);
  if (error) throw new BadRequestError(error.message);

  const {name, description} = value;

  ctx.body = await examService.createExam({name, userId, description});
}
