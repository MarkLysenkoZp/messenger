import express, { Request, Response, Router } from 'express';
const addFriendRouter: Router = express.Router();
import User from '../../models/User';
import Friend from '../../models/Friend';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { loadEnv, env } from '../../env';

loadEnv();

import { auth } from '../../middleware/auth';

addFriendRouter.post('/api/add_friend', auth, async  (req: Request, res: Response) => {
  const token = req.cookies.Authorization;
  const decoded: any  = verify(token, env.JWT_PRIVATE_KEY);
  const user: any = await User.findOne({ where: { id: decoded.id } });

  await Friend.create({ userId: user.id, friendId: req.body.userId });
  await Friend.create({ userId: req.body.userId, friendId: user.id });

  res.status(200).end();
});

export default addFriendRouter;