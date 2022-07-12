import express, { Express, Request, Response, Router } from 'express';
const app: Express = express();
const router: Router = express.Router();
import testConnection from '../dbConnection';

/* GET users listing. */
router.get('/', async  (req: Request, res: Response) => {
  // Test DB connection
  await testConnection();
  res.render('index');
});

export default router;
