import { Router } from 'express';
import multer from 'multer';
import { uploadMedia, deleteMedia } from '../controllers/mediaController';
import { authenticate } from '../middlewares/auth';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticate, upload.single('file'), uploadMedia);
router.post('/delete', authenticate, deleteMedia);

export default router;
