import express, { Request, Response, Router } from 'express';
const searchUsersRouter: Router = express.Router();
import User from '../../models/User';
import 'dotenv/config';
import { loadEnv, env } from '../../env';

loadEnv();

import { auth } from '../../middleware/auth';

import { Op } from 'sequelize';

searchUsersRouter.get('/api/search_users', auth, async  (req: Request, res: Response) => {
  const term = req.query.term;

  const users = await User.findAll({ where: { nickname: { [Op.iLike]: `%${term}%` }}});
  res.json(users);
});

export default searchUsersRouter;