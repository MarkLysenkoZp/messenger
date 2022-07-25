import express, { Request, Response, Router } from 'express';
const profileRouter: Router = express.Router();
import User from '../models/User';
import { verify} from 'jsonwebtoken';
import 'dotenv/config';
import { loadEnv, env } from '../env';

loadEnv();


import { auth } from '../middleware/auth';


/* GET users listing. */

profileRouter.get('/profile', auth, async  (req: Request, res: Response) => {
  const token = req.cookies.Authorization;
  const decoded: any  = verify(token, env.JWT_PRIVATE_KEY);
  const user = await User.findOne({ where: { id: decoded.id } });
  console.log('user', user);
  res.render('profile', {user});
});

export default profileRouter;