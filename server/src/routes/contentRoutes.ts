import { Router } from 'express';
import {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} from '../controllers/contentController';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Public routes for fetching portfolio content
router.get('/:type', getAllContent);
router.get('/:type/:id', getContentById);

// Protected CMS admin routes
router.post('/:type', authenticate, createContent);
router.put('/:type/:id', authenticate, updateContent);
router.delete('/:type/:id', authenticate, deleteContent);

export default router;
