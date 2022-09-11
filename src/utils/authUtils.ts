import { hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { loadEnv, env } from '../env';

loadEnv();

export const hashPassword = (password: string) => {
  return hashSync(password, 8);
}

export const generateToken = (userId: number) => {
  return sign({ id: userId }, env.JWT_PRIVATE_KEY, { expiresIn: 60*60*24 });
}