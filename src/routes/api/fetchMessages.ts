import express, { Request, Response, Router } from 'express';
const fetchMessagesRouter: Router = express.Router();
import { auth } from '../../middleware/auth';

fetchMessagesRouter.get('/api/fetch_messages', auth, async  (req: Request, res: Response) => {
  const sort = (a:any, b:any) => {
    if (a.createdAt > b.createdAt) return 1;
    if (a.createdAt < b.createdAt) return -1;
    return 0;
  }

  try {
    const sent = await req.currentUser.messagesTo(Number(req.query.friendId));
    const received = await req.currentUser.messagesFrom(Number(req.query.friendId));
    const all = sent.concat(received);
    
    res.json(all.sort(sort));
  }
  catch(ex: any) {
    return res.status(500).end();
  }
});

export default fetchMessagesRouter;