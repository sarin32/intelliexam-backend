import * as jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../config/config';

export async function GenerateSignature<T>(payload: T, expiresIn = 600 ): Promise<string> {
  try {
    return await jwt.sign(payload as object, SECRET_TOKEN, { expiresIn });
  } catch (error) {
    throw error;
  }
}

export async function ValidateSignature(token: any) {
	const payload = await jwt.verify(token, SECRET_TOKEN);
	return payload;
}
