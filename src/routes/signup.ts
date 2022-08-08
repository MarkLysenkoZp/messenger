import express, { Request, Response, Router } from 'express';
const signupRouter: Router = express.Router();
import User from '../models/User';
import { hashPassword } from '../utils/authUtils';

signupRouter.get('/signup', async  (req: Request, res: Response) => {
  let success = "";
  if (req.query.success) {
    success = 'Account was deleted';
  }

  res.render('signup', { errorMessage: '', success });
});

signupRouter.post('/signup', async  (req: Request, res: Response) => {
  try {
    const user = User.build({
      email: req.body.email,
      nickname: req.body.nickname,
      avatar: req.body.avatar,
      password: req.body.password
    });

    await user.validate();
    user.password = hashPassword(req.body.password); 
    await user.save();
    res.redirect('/login?success=ok');
  } catch(e:any) {
    res.render('signup', { errorMessage: e.message });
  }
});

export default signupRouter;