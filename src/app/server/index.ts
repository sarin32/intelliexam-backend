import * as Koa from 'koa';
import {bodyParser} from '@koa/bodyparser';
import * as cors from '@koa/cors';
import {PORT} from '../config/config';
import {errorMiddleware, router} from '../api';
import {connection} from '../database';

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

    this.app.use(errorMiddleware);
    // attach router
    this.app.use(router.routes());
  }

  public async listen() {
    await connection.startConnecion();
    console.log('ESTABLISHED DATABASE CONNECTION');

    this.app.listen(PORT, () => {
      console.log('APP IS RUNNING ON PORT ', PORT);
    });
  }
}
