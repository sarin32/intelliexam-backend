import {Context, Next} from 'koa';
import {AuthorizationError, BadRequestError} from '../../errors';
import {validateSignature} from '../../utils/token-util';
import {TokenExpiredError} from 'jsonwebtoken';

export async function tokenMiddleware(ctx: Context, next: Next) {
  const authToken = ctx.get('Authorization');
  if (!authToken)
    throw new BadRequestError('Authorization header is not found');

  const token = authToken.split(' ').at(1);
  if (!token) throw new BadRequestError('Authorization header is invalid');

  try {
    const payload = await validateSignature(token);
    ctx.state.user = payload;
  } catch (error) {
    if (error instanceof TokenExpiredError)
      throw new AuthorizationError('Authorization token expired');

    throw new AuthorizationError('Invalid Authorization token');
  }

  return await next();
}
