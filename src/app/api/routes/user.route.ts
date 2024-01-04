import * as KoaRouter from '@koa/router';
import {signIn, signUp} from '../controllers/user.controller';

const userRoute = new KoaRouter({
  prefix: '/user',
});

userRoute.post('/signup', signUp);
userRoute.post('/signin', signIn);

export default userRoute;
