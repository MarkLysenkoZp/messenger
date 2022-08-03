import express, { Express, Request, Response, Router } from 'express';
const app: Express = express();
const indexRouter: Router = express.Router();
import { testConnection } from '../dbConnection';
import { auth } from '../middleware/auth';

indexRouter.get('/', auth, async  (req: Request, res: Response) => {
  await testConnection();
  res.render('index');
});
export default indexRouter;