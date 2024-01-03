"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("@koa/router");
const user_route_1 = require("./user.route");
const router = new KoaRouter();
router.use(user_route_1.default.routes());
exports.default = router;
//# sourceMappingURL=index.js.map