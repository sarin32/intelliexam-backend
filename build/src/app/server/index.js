"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const Koa = require("koa");
const bodyparser_1 = require("@koa/bodyparser");
const cors = require("@koa/cors");
const config_1 = require("../config/config");
const api_1 = require("../api");
class Server {
    constructor() {
        this.app = new Koa();
        // cors middleware
        this.app.use(cors({
            allowMethods: ['GET', 'POST'],
        }));
        // bodyparser middleware
        this.app.use((0, bodyparser_1.bodyParser)());
        // attach router
        this.app.use(api_1.router.routes());
        this.listen();
    }
    listen() {
        this.app.listen(config_1.PORT, () => {
            console.log('APP IS RUNNING ON PORT ', config_1.PORT);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=index.js.map