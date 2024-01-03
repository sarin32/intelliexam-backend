import * as KoaRouter from '@koa/router';
import userRoute from './user.route';

const router = new KoaRouter();

// extend routes here
router.use(userRoute.routes());

export default router;
