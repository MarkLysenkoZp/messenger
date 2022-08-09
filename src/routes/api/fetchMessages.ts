import express, { Request, Response, Router } from 'express';
const fetchMessagesRouter: Router = express.Router();
import { auth } from '../../middleware/auth';
import { sort } from '../../utils/arrayUtils';

fetchMessagesRouter.get('/api/fetch_messages', auth, async  (req: Request, res: Response) => {
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