import * as KoaRouter from '@koa/router';
import {getUserInfo, signIn, signUp} from '../controllers/user.controller';
import {tokenMiddleware} from '../middlewares/token-middleware';

const router = new KoaRouter({
  prefix: '/user',
});

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/', tokenMiddleware, getUserInfo);

export default router;
