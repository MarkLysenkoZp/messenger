import express, { Request, Response, Router } from 'express';
const userInfoRouter: Router = express.Router();
import User from '../../models/User';
import { verify} from 'jsonwebtoken';
import 'dotenv/config';
import { loadEnv, env } from '../../env';

loadEnv();

import { auth } from '../../middleware/auth';

userInfoRouter.get('/api/userinfo', auth, async  (req: Request, res: Response) => {
  const token = req.cookies.Authorization;
  const decoded: any  = verify(token, env.JWT_PRIVATE_KEY);
  const user = await User.findOne({ where: { id: decoded.id } });
  res.json(user);
});

export default userInfoRouter;