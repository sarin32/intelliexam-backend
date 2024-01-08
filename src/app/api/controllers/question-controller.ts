import {Context} from 'koa';
import {
  arraySchema,
  requiredNumberSchema,
  objectSchema,
  stringSchema,
  validateObject,
  numberSchema,
  objectIdSchema,
} from '../../utils/schema-validator';
import {BadRequestError, ForbiddenError} from '../../errors';
import questionService from '../../services/question.service';
import examService from '../../services/exam.service';

const getQuestionSchema = objectSchema({
  object: {
    questionId: objectIdSchema(true),
    examId: objectIdSchema(true),
  },
});

const createQuestionSchema = objectSchema({
  object: {
    answer: requiredNumberSchema(),
    examId: objectIdSchema(true),
    options: arraySchema({object: stringSchema({})}),
    question: stringSchema({}),
  },
});

const updateExamSchema = objectSchema({
  object: {
    questionId: objectIdSchema(true),
    examId: objectIdSchema(true),

    answer: numberSchema(),
    options: arraySchema({
      object: stringSchema({required: false}),
      required: false,
    }),
    question: stringSchema({required: false}),
  },
});

export async function getQuestionDetails(ctx: Context) {
  const {userId} = ctx.state.user;

  const {error, value} = validateObject(getQuestionSchema, ctx.request.body);
  if (error) throw new BadRequestError(error.message);

  const {questionId, examId} = value;

  if (
    !(await questionService.hasAccessToQuestion({
      examId,
      userId,
      questionId,
    }))
  )
    throw new ForbiddenError('You dont have access to this question');

  ctx.body = await questionService.getQuestion({
    questionId: questionId,
  });
}

export async function createQuestion(ctx: Context) {
  const {userId} = ctx.state.user;

  const {error, value} = validateObject(createQuestionSchema, ctx.request.body);
  if (error) throw new BadRequestError(error.message);

  const {answer, examId, options, question} = value;

  if (!(await examService.hasAccessToExam({examId, userId})))
    throw new ForbiddenError('You dont have access to this exam');

  ctx.body = await questionService.createQuestion({
    answer,
    examId,
    options,
    question,
    userId,
  });
}

export async function updateQuestion(ctx: Context) {
  const {userId} = ctx.state.user;

  const {error, value} = validateObject(updateExamSchema, ctx.request.body);
  if (error) throw new BadRequestError(error.message);

  const {questionId, examId, answer, options, question} = value;

  if (
    !(await questionService.hasAccessToQuestion({
      examId,
      userId,
      questionId,
    }))
  )
    throw new ForbiddenError('You dont have access to this question');

  ctx.body = await questionService.updateQuestion({
    questionId,
    answer,
    options,
    question,
  });
}
