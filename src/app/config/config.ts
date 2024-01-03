// environment level constants
import * as dotEnv from 'dotenv';
if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./src/environments/${process.env.NODE_ENV}.env`;
  dotEnv.config({path: configFile});
} else {
  dotEnv.config();
}

const env = process.env;

export const PORT = env.PORT;
