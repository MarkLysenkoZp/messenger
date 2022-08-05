import express, { Request, Response, Router } from 'express';
const indexRouter: Router = express.Router();
import { auth } from '../middleware/auth';

indexRouter.get('/', auth, async  (_: Request, res: Response) => {
  res.render('index');
});

export default indexRouter;