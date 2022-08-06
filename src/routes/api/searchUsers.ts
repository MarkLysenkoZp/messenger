import express, { Request, Response, Router } from 'express';
const searchUsersRouter: Router = express.Router();
import User from '../../models/User';
import { auth } from '../../middleware/auth';
import { Op } from 'sequelize';

searchUsersRouter.get('/api/search_users', auth, async  (req: Request, res: Response) => {
  const term = req.query.term;

  const friends = await req.currentUser.getFriends();
  const friendIds = friends.map((friend: any) => { return friend.id });
  friendIds.push(req.currentUser.id);

  const users = await User.findAll({ where:
    {
      nickname: { [Op.iLike]: `%${term}%` },
      id: { [Op.notIn]: friendIds }
    }});
  res.json(users);
});

export default searchUsersRouter;