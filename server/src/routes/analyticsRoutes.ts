import { Router } from 'express';
import { trackPageView, getDashboardStats } from '../controllers/analyticsController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/track', trackPageView);
router.get('/stats', authenticate, getDashboardStats);

export default router;
