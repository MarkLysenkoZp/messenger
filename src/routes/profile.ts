import express, { Request, Response, Router } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User';
import { auth } from '../middleware/auth';
import { loadEnv, env } from '../env';
import { hashPassword } from '../utils/authUtils';
import { initS3Instance } from '../utils/awsUtils';
const profileRouter: Router = express.Router();

loadEnv();

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
    const avatar: any = req.files?.avatar;
    if (req.body.password) {
      user.password = hashPassword(req.body.password);
    }

    if(avatar){
      const s3 = initS3Instance();
      const params = { Bucket: env.AWS_BUCKET, Key: avatar.name, Body: avatar.data };
      const store: any = await s3.upload(params).promise();
      user.avatar = store.Location;
    }
    await user.validate();
    await user.save();
    res.redirect('/?success=ok')
  } catch(e: any) {
    res.render('profile', { errorMessage: e.message, user});
  }
});
export default profileRouter;