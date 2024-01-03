import * as KoaRouter from '@koa/router';
import userRoute from './user.route';

const router = new KoaRouter();

router.use(userRoute.routes());

export default router;
