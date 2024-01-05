import * as KoaRouter from '@koa/router';
import {getUserInfo, signIn, signUp} from '../controllers/user.controller';
import {tokenMiddleware} from '../middlewares/token-middleware';

const userRoute = new KoaRouter({
  prefix: '/user',
});

userRoute.post('/signup', signUp);
userRoute.post('/signin', signIn);
userRoute.get('/', tokenMiddleware, getUserInfo);

export default userRoute;
