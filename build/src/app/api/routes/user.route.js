"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("@koa/router");
const userRoute = new KoaRouter({
    prefix: '/user',
});
userRoute.post('/signup', ctx => { });
exports.default = userRoute;
//# sourceMappingURL=user.route.js.map