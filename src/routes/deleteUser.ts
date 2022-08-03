import express, { Request, Response, Router } from 'express';
const deleteUserRouter: Router = express.Router();
import User from '../models/User';
import { verify} from 'jsonwebtoken';
import 'dotenv/config';
import { loadEnv, env } from '../env';

loadEnv();

import { auth } from '../middleware/auth';

deleteUserRouter.post('/deleteCurrentUser', auth, async  (req: Request, res: Response) => {
  const token = req.cookies.Authorization;
  const decoded: any  = verify(token, env.JWT_PRIVATE_KEY);
  const user: any = await User.findOne({ where: { id: decoded.id } });
  await  user.destroy()
  res.redirect('/signup');
});

export default deleteUserRouter;