import { hashSync } from 'bcrypt';

export const hashPassword = (password: string) => {
  return hashSync(password, 8);
}