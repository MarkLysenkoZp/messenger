import express, { Request, Response, Router } from 'express';
const fetchFriendsRouter: Router = express.Router();
import User from '../../models/User';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { loadEnv, env } from '../../env';

loadEnv();

import { auth } from '../../middleware/auth';
import { Op } from 'sequelize';

fetchFriendsRouter.get('/api/fetch_friends', auth, async  (req: Request, res: Response) => {
  const token = req.cookies.Authorization;
  const decoded: any  = verify(token, env.JWT_PRIVATE_KEY);
  const user: any = await User.findOne({ where: { id: decoded.id } });

  const _friends = await user.getFriends();
  const friendIds = _friends.map((friend: any) => {
    return friend.friendId
  });

  const friends = await User.findAll({ where: { id: { [Op.in]: friendIds }}});
  res.json(friends);
});

export default fetchFriendsRouter;