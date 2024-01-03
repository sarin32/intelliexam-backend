import * as Koa from 'koa';
import {bodyParser} from '@koa/bodyparser';
import * as cors from '@koa/cors';
import {PORT} from './config/config';
import {router} from './api';

export class Server {
  app: Koa<Koa.DefaultState, Koa.DefaultContext>;

  constructor() {
    this.app = new Koa();

    // cors middleware
    this.app.use(
      cors({
        allowMethods: ['GET', 'POST'],
      })
    );

    // bodyparser middleware
    this.app.use(bodyParser());

    // attach router
    this.app.use(router.routes());

    this.listen();
  }

  public listen() {
    this.app.listen(PORT, () => {
      console.log('APP IS RUNNING ON PORT ', PORT);
    });
  }
}
