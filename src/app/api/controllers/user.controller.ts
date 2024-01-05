import * as Joi from 'joi';
import {Context} from 'koa';
import {validateObject} from '../../utils/schema-validator';
import {userService} from '../../services';
import {BadRequestError} from '../../errors';

const signUpSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).max(30).required(),
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

export async function getUserInfo(ctx: Context) {
  const {userId} = ctx.state.user;

  ctx.body = await userService.getUserInfo({userId});
}
