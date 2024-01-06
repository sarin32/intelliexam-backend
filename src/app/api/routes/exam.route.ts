import * as KoaRouter from '@koa/router';
import {tokenMiddleware} from '../middlewares/token-middleware';
import {createExam, getExamDetails} from '../controllers/exam-controller';

const router = new KoaRouter({
  prefix: '/exam',
});

router.post('/create', tokenMiddleware, createExam);
router.post('/getExam', tokenMiddleware, getExamDetails);

export default router;
