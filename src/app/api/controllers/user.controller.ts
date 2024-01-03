import * as Joi from 'joi';
import {Context} from 'koa';
import {validateObject} from '../../utils/schema-validator';

const signUpSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

export async function signup(ctx: Context) {
  validateObject(signUpSchema, ctx.request.body);
  const {username, email, password} = ctx.request.body;
}
