import { Router } from 'express';
import {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/messageController';
import { authenticate } from '../middlewares/auth';
import { contactLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/', contactLimiter, createMessage);
router.get('/', authenticate, getMessages);
router.patch('/:id', authenticate, updateMessageStatus);
router.delete('/:id', authenticate, deleteMessage);

export default router;
