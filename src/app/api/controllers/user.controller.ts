import * as Joi from 'joi';
import {Context} from 'koa';
import {validateObject} from '../../utils/schema-validator';
import {userService} from '../../services';

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
  const {name, email, password} = validateObject(
    signUpSchema,
    ctx.request.body
  );
  ctx.body = await userService.signup({name, email, password});
}

export async function signIn(ctx: Context) {
  const {email, password} = validateObject(signInSchema, ctx.request.body);
  ctx.body = await userService.signIn({email, password});
}
