import express, { Request, Response, Router } from 'express';
const addFriendRouter: Router = express.Router();
import Friend from '../../models/Friend';
import { auth } from '../../middleware/auth';

addFriendRouter.post('/api/add_friend', auth, async  (req: Request, res: Response) => {
  try {
    await Friend.create({ userId: req.currentUser.id, friendId: req.body.userId });
    await Friend.create({ userId: req.body.userId, friendId: req.currentUser.id });
    res.status(200).end();
  }
  catch (ex: any) {
    res.status(500).end();
    console.log("Faild to create friend ")
  }
});

export default addFriendRouter;