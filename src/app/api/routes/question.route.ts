import * as KoaRouter from '@koa/router';
import {tokenMiddleware} from '../middlewares';
import {
  createQuestion,
  getQuestionDetails,
  updateQuestion,
} from '../controllers/question-controller';

const router = new KoaRouter({
  prefix: '/question',
});

router.use(tokenMiddleware);

router.post('/create', createQuestion);
router.post('/getDetails', getQuestionDetails);
router.post('/updateDetails', updateQuestion);

export default router;
