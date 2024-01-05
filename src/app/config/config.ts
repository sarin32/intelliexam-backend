// environment level constants
import * as dotEnv from 'dotenv';
if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./src/environments/${process.env.NODE_ENV}.env`;
  dotEnv.config({path: configFile});
} else {
  dotEnv.config();
}

const env = process.env;

export const PORT = Number(env.PORT!);

export const DATABASE = {
  URL: env.DATABASE_URL!,
  DATABASE_NAME: env.DATABASE_NAME!,
  MASTER_KEY: env.DATABASE_MASTER_KEY!,
  KEY_BASE64: env.DATABASE_KEY_BASE64!,
};

export const SECRET_TOKEN = env.JWT_SECRET_TOKEN!;
export const LOGIN_TOKEN_LIFETIME = 6000;
