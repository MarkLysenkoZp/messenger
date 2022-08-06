import express, { Request, Response, Router } from 'express';
const deleteUserRouter: Router = express.Router();
import { auth } from '../middleware/auth';

deleteUserRouter.post('/deleteCurrentUser', auth, async  (req: Request, res: Response) => {
  try {
    await req.currentUser.destroy();
    res.redirect('/signup');
  }
  catch (ex: any) {
    console.log('Failed to Destroy current User');
    res.redirect('/profile');
  }
});

export default deleteUserRouter;