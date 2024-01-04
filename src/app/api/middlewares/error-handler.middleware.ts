import {Context, Next} from 'koa';

// TODO: update
export async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    const body = {
      message: '',
    };
    if (error instanceof Error) {
      body.message = error.message;
    }
    ctx.body = body;
    ctx.status = 500;
  }
}
