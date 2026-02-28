import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { submitRatingSchema } from '@codeforge/shared/validation';
import {
  submitRating,
  getExerciseRating,
  getExerciseRatings,
  getUserRating,
  getRatingOverview,
} from '../services/ratingService.js';

const router = Router();

router.post('/', authenticate, validate(submitRatingSchema), async (req, res, next) => {
  try {
    const { exerciseId, stars } = req.body;
    const rating = await submitRating(
      req.user!.userId,
      exerciseId,
      req.user!.cohortId ?? null,
      stars,
    );
    res.json({ success: true, data: rating });
  } catch (err) {
    next(err);
  }
});

router.get('/exercise/:exerciseId', authenticate, async (req, res, next) => {
  try {
    const data = await getExerciseRating(req.params.exerciseId as string);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

router.get('/mine/:exerciseId', authenticate, async (req, res, next) => {
  try {
    const rating = await getUserRating(req.user!.userId, req.params.exerciseId as string);
    res.json({ success: true, data: rating });
  } catch (err) {
    next(err);
  }
});

router.get('/bulk', authenticate, async (req, res, next) => {
  try {
    const ids = typeof req.query.ids === 'string' ? req.query.ids.split(',').filter(Boolean) : [];
    const data = await getExerciseRatings(ids);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

router.get('/overview', authenticate, authorize('instructor', 'ta'), async (req, res, next) => {
  try {
    const cohortId = typeof req.query.cohortId === 'string' ? req.query.cohortId : undefined;
    const data = await getRatingOverview(cohortId);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

export default router;
