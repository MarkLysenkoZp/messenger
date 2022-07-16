import express, { Express, Request, Response, Router } from 'express';
const app: Express = express();
const signupRouter: Router = express.Router();

signupRouter.get('/signup', async  (req: Request, res: Response) => {
  res.render('signup');
});

export default signupRouter;