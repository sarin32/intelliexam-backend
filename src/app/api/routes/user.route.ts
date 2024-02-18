import * as KoaRouter from '@koa/router';
import {
  getSelfInfo,
  sendEmailForVerification,
  signIn,
  signUp,
  verifyEmailVerificationOTP,
} from '../controllers/user.controller';
import {tokenMiddleware} from '../middlewares';

const router = new KoaRouter({
  prefix: '/user',
});

router.post('/signup', signUp);

router.post(
  '/sendEmailForVerification',
  tokenMiddleware,
  sendEmailForVerification
);

router.post(
  '/verifyEmailVerificationOTP',
  tokenMiddleware,
  verifyEmailVerificationOTP
);

router.post('/signin', signIn);

router.post('/getSelfInfo', tokenMiddleware, getSelfInfo);

export default router;
