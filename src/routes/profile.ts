import express, { Request, Response, Router } from 'express';
const profileRouter: Router = express.Router();
import User from '../models/User';
import { verify} from 'jsonwebtoken';
import 'dotenv/config';
import { loadEnv, env } from '../env';
import { hashPassword } from '../utils/authUtils';

loadEnv();

import { auth } from '../middleware/auth';

/* GET users listing. */

profileRouter.get('/profile', auth, async  (req: Request, res: Response) => {
  const token = req.cookies.Authorization;
  const decoded: any  = verify(token, env.JWT_PRIVATE_KEY);
  const user = await User.findOne({ where: { id: decoded.id } });
  res.render('profile', { errorMessage: '', user });
});

profileRouter.post('/profile', auth, async  (req: Request, res: Response) => {
  const token = req.cookies.Authorization;
  const decoded: any  = verify(token, env.JWT_PRIVATE_KEY);
  const user: any = await User.findOne({ where: { id: decoded.id } });

  try {

    user.email = req.body.email;
    user.password = req.body.password;
    if (req.body.password ) {
      user.password = req.body.password;
    }
    const isValid = await user.validate();
    
    if(req.body.password){
      user.password = hashPassword(req.body.password);
    }
    await user.save();
    res.redirect('/')
  } catch(e: any) {

    res.render('profile', { errorMessage: e.message, user});
  }
});
export default profileRouter;