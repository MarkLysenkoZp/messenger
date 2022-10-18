import express, { Request, Response, Router } from 'express';
const deleteMessageRouter: Router = express.Router();
import Message from '../../models/Message';
import { auth } from '../../middleware/auth';

deleteMessageRouter.delete('/api/delete_message/:id', auth, async  (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Message.destroy(
      {
        where: { id },
      }
    );
    res.json(result);
  }
  catch(ex: any) {
    return res.status(500).end();
  }
});

export default deleteMessageRouter;
