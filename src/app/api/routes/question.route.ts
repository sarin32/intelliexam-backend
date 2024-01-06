import * as KoaRouter from '@koa/router';
import {tokenMiddleware} from '../middlewares/token-middleware';
import {createQuestion} from '../controllers/question-controller';

const router = new KoaRouter({
  prefix: '/question',
});

router.post('/create', tokenMiddleware, createQuestion);

export default router;
