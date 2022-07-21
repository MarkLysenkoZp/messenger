import express, { Express, Request, Response, Router } from 'express';
import { compareSync } from 'bcrypt';

const loginRouter: Router = express.Router();

import User from '../models/User';
import { generateToken } from '../utils/authUtils';


loginRouter.get('/login', async  (req: Request, res: Response) => {
  res.render('login', { errorMessage: '' });
});

loginRouter.post('/login', async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if(user === null) {
    return res.render('login',  { errorMessage: 'User not Found'});
  }

  // comparing passwords
  const passwordIsValid = compareSync(
    req.body.password,
    user.password
  );

  // checking if password was valid and send response accordingly
  if (!passwordIsValid) {
    return res.render('login', { errorMessage: 'Invalid Password'});
  }

  const token = generateToken(user.id);

  res.header('Authorization', token);
  res.redirect('/');

});
export default loginRouter;