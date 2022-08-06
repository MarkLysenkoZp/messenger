import express, { Request, Response, Router } from 'express';
const userInfoRouter: Router = express.Router();
import { auth } from '../../middleware/auth';

userInfoRouter.get('/api/userinfo', auth, async  (req: Request, res: Response) => {
  res.json(req.currentUser);
});

export default userInfoRouter;