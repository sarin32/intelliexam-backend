import * as KoaRouter from '@koa/router';
import {signup} from '../controllers/user.controller';

const userRoute = new KoaRouter({
  prefix: '/user',
});

userRoute.post('/signup', signup);

export default userRoute;
