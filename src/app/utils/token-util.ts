import * as jwt from 'jsonwebtoken';
import {SECRET_TOKEN} from '../config/config';

export async function generateSignature(
  payload: object,
  expiresIn: number
): Promise<string> {
  return await jwt.sign(payload as object, SECRET_TOKEN, {expiresIn});
}

export async function validateSignature(token: string) {
  const payload = await jwt.verify(token, SECRET_TOKEN);
  return payload;
}
