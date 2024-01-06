import * as KoaRouter from '@koa/router';
import userRouter from './user.route';
import examRouter from './exam.route';

const router = new KoaRouter();

// extend routes here
router.use(userRouter.routes());
router.use(examRouter.routes());

export default router;
