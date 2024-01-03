"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
// environment level constants
const dotEnv = require("dotenv");
if (process.env.NODE_ENV !== 'prod') {
    const configFile = `./src/environments/${process.env.NODE_ENV}.env`;
    dotEnv.config({ path: configFile });
}
else {
    dotEnv.config();
}
const env = process.env;
exports.PORT = env.PORT;
//# sourceMappingURL=config.js.map