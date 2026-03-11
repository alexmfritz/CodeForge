import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getPendingReview,
  completeReview,
  skipReview,
} from '../services/reviewService.js';

const router = Router();

router.get('/pending', authenticate, async (req, res, next) => {
  try {
    const review = await getPendingReview(req.user!.userId);
    res.json({ success: true, data: review?.toJSON() ?? null });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/complete', authenticate, async (req, res, next) => {
  try {
    const review = await completeReview(req.params.id as string, req.user!.userId);
    res.json({ success: true, data: review.toJSON() });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/skip', authenticate, async (req, res, next) => {
  try {
    const review = await skipReview(req.params.id as string, req.user!.userId);
    res.json({ success: true, data: review.toJSON() });
  } catch (err) {
    next(err);
  }
});

export default router;
