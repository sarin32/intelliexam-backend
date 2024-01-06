import {Context, Next} from 'koa';
import {AuthorizationError, BadRequestError} from '../../errors';
import {validateSignature} from '../../utils/token-util';

export async function tokenMiddleware(ctx: Context, next: Next) {
  const authToken = ctx.get('Authorization');
  if (!authToken)
    throw new BadRequestError('Authorization header is not found');

  const token = authToken.split(' ').at(1);
  if (!token) throw new BadRequestError('Authorization header is invalid');

  const response = await validateSignature(token);

  if (response.invalidToken || !response.payload) {
    throw new AuthorizationError('Invalid Authorization token');
  }
  if (response.tokenExpired) {
    throw new AuthorizationError('Authorization token expired');
  }

  ctx.state.user = response.payload;

  return await next();
}
