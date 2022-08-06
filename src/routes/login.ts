import express, { Express, Request, Response, Router } from 'express';
import { compareSync } from 'bcrypt';
const loginRouter: Router = express.Router();
import User from '../models/User';
import { generateToken } from '../utils/authUtils';

loginRouter.get('/login', async  (req: Request, res: Response) => {
  let success = "";
  if (req.query.success) {
    success = 'You have been registered successfully. Please, login to continue';
  }
  
  res.render('login', { errorMessage: '', success });
});

loginRouter.post('/login', async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if(user === null) {
    return res.render('login',  { errorMessage: 'User not Found', success: '' });
  }

  // comparing passwords
  const passwordIsValid = compareSync(
    req.body.password,
    user.password
  );

  // checking if password was valid and send response accordingly
  if (!passwordIsValid) {
    return res.render('login', { errorMessage: 'Invalid Password', success: '' });
  }

  const token = generateToken(user.id);
  res.cookie('Authorization', token, { expires: new Date(Date.now() + 60*60*24 * 1000) });
  res.redirect('/');

});

export default loginRouter;