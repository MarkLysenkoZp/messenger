import express, { Express, Request, Response, Router } from 'express';
const app: Express = express();
const router: Router = express.Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

export default router;
