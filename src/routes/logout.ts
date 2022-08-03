import express, { Request, Response, Router } from 'express';
const logoutRouter: Router = express.Router();
import { auth } from '../middleware/auth';

logoutRouter.get('/logout', auth, async  (req: Request, res: Response) => {
  res.clearCookie('Authorization');
  res.redirect('/login');
});
export default logoutRouter;