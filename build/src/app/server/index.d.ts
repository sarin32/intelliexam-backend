import * as Koa from 'koa';
export declare class Server {
    app: Koa<Koa.DefaultState, Koa.DefaultContext>;
    constructor();
    private listen;
}
