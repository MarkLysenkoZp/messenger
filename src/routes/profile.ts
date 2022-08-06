import express, { Request, Response, Router } from 'express';
import 'dotenv/config';
import { auth } from '../middleware/auth';
import { loadEnv, env } from '../env';
import { hashPassword } from '../utils/authUtils';
import { initS3Instance } from '../utils/awsUtils';
const profileRouter: Router = express.Router();

loadEnv();

profileRouter.get('/profile', auth, async  (req: Request, res: Response) => {
  res.render('profile', { errorMessage: '', user: req.currentUser });
});

profileRouter.post('/profile', auth, async  (req: Request, res: Response) => {
  try {
    req.currentUser.email = req.body.email;
    const avatar: any = req.files?.avatar;
    if (req.body.password) {
      req.currentUser.password = hashPassword(req.body.password);
    }

    if(avatar){
      const s3 = initS3Instance();
      const params = { Bucket: env.AWS_BUCKET, Key: avatar.name, Body: avatar.data };
      const store: any = await s3.upload(params).promise();
      req.currentUser.avatar = store.Location;
    }

    await req.currentUser.validate();
    await req.currentUser.save();
    res.redirect('/')
  } catch(e: any) {
    res.render('profile', { errorMessage: e.message, user: req.currentUser});
  }
});

export default profileRouter;