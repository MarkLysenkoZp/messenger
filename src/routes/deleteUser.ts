import express, { Request, Response, Router } from 'express';
const deleteUserRouter: Router = express.Router();
import { auth } from '../middleware/auth';

deleteUserRouter.post('/deleteCurrentUser', auth, async  (req: Request, res: Response) => {
  await req.currentUser.destroy();
  res.redirect('/signup');
});

export default deleteUserRouter;