import * as KoaRouter from '@koa/router';

const userRoute = new KoaRouter({
  prefix: '/user',
});

userRoute.post('/signup', ctx => {});

export default userRoute;
