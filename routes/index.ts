import express, { Express, Request, Response, Router } from 'express';
const app: Express = express();
const indexRouter: Router = express.Router();
import testConnection from '../dbConnection';

/* GET users listing. */
indexRouter.get('/', async  (req: Request, res: Response) => {
  // Test DB connection
  await testConnection();
  res.render('index');
});

export default indexRouter;