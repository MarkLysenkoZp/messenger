import express, { Request, Response, Router } from 'express';
const saveMessageRouter: Router = express.Router();
import Message from '../../models/Message';
import { auth } from '../../middleware/auth';

saveMessageRouter.post('/api/save_message', auth, async  (req: Request, res: Response) => {
  try {
    const result = await Message.create({
      userId: req.currentUser.id,
      recipientId: req.body.recipientId,
      message: req.body.message,
      status: 'sent'
    });

    res.json(result);
  }
  catch(ex: any) {
    return res.status(500).end();
  }
});

export default saveMessageRouter;