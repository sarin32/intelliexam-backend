import * as bcrypt from 'bcrypt';

export async function generateSalt() {
  return await bcrypt.genSalt();
}

export async function generatePassword(password: string, salt: string) {
  return await bcrypt.hash(password, salt);
}

export async function validatePassword(
  enteredPassword: string,
  savedPassword: string,
  salt: string
): Promise<boolean> {
  console.log('🚀 ~ file: password-util.ts:16 ~ salt:', salt);
  console.log('🚀 ~ file: password-util.ts:16 ~ savedPassword:', savedPassword);
  console.log(
    '🚀 ~ file: password-util.ts:16 ~ enteredPassword:',
    enteredPassword
  );
  const hashedEnteredPassword = await generatePassword(enteredPassword, salt);
  console.log(
    '🚀 ~ file: password-util.ts:20 ~ hashedEnteredPassword:',
    hashedEnteredPassword
  );
  return hashedEnteredPassword === savedPassword;
}
