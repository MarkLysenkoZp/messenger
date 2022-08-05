import express, { Request, Response, Router } from 'express';
const fetchFriendsRouter: Router = express.Router();

import { auth } from '../../middleware/auth';

fetchFriendsRouter.get('/api/fetch_friends', auth, async  (req: Request, res: Response) => {
  const friends = await req.currentUser.getFriends();
  res.json(friends);
});

export default fetchFriendsRouter;