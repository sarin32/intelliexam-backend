import * as KoaRouter from '@koa/router';
import {tokenMiddleware} from '../middlewares/token-middleware';

const router = new KoaRouter({
  prefix: '/exam',
});

router.post('/create', tokenMiddleware);

export default router;
