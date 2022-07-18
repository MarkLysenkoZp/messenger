import express, { Express, Request, Response, Router } from 'express';
const app: Express = express();
const signupRouter: Router = express.Router();

import User from '../models/User';
import { hashPassword } from '../utils/authUtils';

signupRouter.get('/signup', async  (req: Request, res: Response) => {
  res.render('signup', { errorMessage: '' });
});

signupRouter.post('/signup', async  (req: Request, res: Response) => {
  try {
    const user = User.build({
      email: req.body.email,
      nickname: req.body.nickname,
      phone: req.body.phone,
      password: req.body.password
    });

    const isValid = await user.validate();
    user.password = hashPassword(req.body.password);
    await user.save();
    res.redirect('/')
  } catch(e:any) {
    res.render('signup', { errorMessage: e.message });
  }
});

export default signupRouter;