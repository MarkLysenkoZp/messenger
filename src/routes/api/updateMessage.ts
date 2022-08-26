import express, { Request, Response, Router } from 'express';
const updateMessageRouter: Router = express.Router();
import Message from '../../models/Message';
import { auth } from '../../middleware/auth';

updateMessageRouter.post('/api/update_message', auth, async  (req: Request, res: Response) => {
  try {
    const result = await Message.update(
      {
        message: req.body.messageObj.message,
      },
      {
        where: { id: req.body.messageObj.messageId },
      }
    );
    res.json(result);
  }
  catch(ex: any) {
    return res.status(500).end();
  }
});

export default updateMessageRouter;