import crypto from 'crypto';
import { promisify } from 'util';
import { SECRET_KEY } from './env';

const pbkdf2Async = promisify(crypto.pbkdf2);

export const encrypt = async (password: string): Promise<string> => {
  const encrypted = await pbkdf2Async(password, SECRET_KEY, 1000, 64, 'sha512');

  return encrypted.toString('hex');
};
