import * as jwt from 'jsonwebtoken';
import {SECRET_TOKEN} from '../config/config';

export async function generateSignature(
  payload: object,
  expiresIn = 600
): Promise<string> {
  try {
    return await jwt.sign(payload as object, SECRET_TOKEN, {expiresIn});
  } catch (error) {
    throw error;
  }
}

export async function galidateSignature(token: string) {
  const payload = await jwt.verify(token, SECRET_TOKEN);
  return payload;
}
