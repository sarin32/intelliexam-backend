import * as KoaRouter from '@koa/router';
import userRouter from './user.route';
import examRouter from './exam.route';
import questionRouter from './question.route';

const router = new KoaRouter();

// extend routes here
router.use(userRouter.routes());
router.use(examRouter.routes());
router.use(questionRouter.routes());

export default router;
