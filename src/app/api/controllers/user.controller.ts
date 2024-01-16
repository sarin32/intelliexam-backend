import {Context} from 'koa';
import {
  emailSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import {userService} from '../../services';
import {BadRequestError} from '../../errors';

const signUpSchema = objectSchema({
  object: {
    name: stringSchema({min: 3, max: 20}),
    email: emailSchema(),
    password: stringSchema({min: 6, max: 30}),
  },
});

const signInSchema = objectSchema({
  object: {
    email: emailSchema(),
    password: stringSchema({min: 6, max: 30}),
  },
});

export async function signUp(ctx: Context) {
  const {error, value} = validateObject(signUpSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const {name, email, password} = value;
  ctx.body = await userService.signup({name, email, password});
}

export async function signIn(ctx: Context) {
  const {error, value} = validateObject(signInSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const {email, password} = value;
  ctx.body = await userService.signIn({email, password});
}

export async function sendEmailForVerification(ctx: Context) {
  const {userId} = ctx.state.user;
  ctx.body = await userService.sendEmailForVerification({userId});
}

export async function getSelfInfo(ctx: Context) {
  const {userId} = ctx.state.user;

  ctx.body = await userService.getUserInfo({userId});
}
