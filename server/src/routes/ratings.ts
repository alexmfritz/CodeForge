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

// POST / - Submit or update a star rating for an exercise
router.post('/', authenticate, validate(submitRatingSchema), async (req, res, next) => {
  try {
    const { exerciseId, stars } = req.body;
    const rating = await submitRating(
      req.user!.userId,
      exerciseId,
      req.user!.cohortId!,
      stars,
    );
    res.json({ success: true, data: rating });
  } catch (err) {
    next(err);
  }
});

// GET /exercise/:id - Aggregate rating stats for one exercise
router.get('/exercise/:exerciseId', authenticate, async (req, res, next) => {
  try {
    const data = await getExerciseRating(req.params.exerciseId as string);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// GET /mine/:id - Fetch the authenticated user's own rating
router.get('/mine/:exerciseId', authenticate, async (req, res, next) => {
  try {
    const rating = await getUserRating(req.user!.userId, req.params.exerciseId as string);
    res.json({ success: true, data: rating });
  } catch (err) {
    next(err);
  }
});

// GET /bulk?ids=a,b,c - Batch-fetch averages for multiple exercises
router.get('/bulk', authenticate, async (req, res, next) => {
  try {
    const ids = typeof req.query.ids === 'string' ? req.query.ids.split(',').filter(Boolean) : [];
    const data = await getExerciseRatings(ids);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// GET /overview - Instructor/TA-only dashboard with top and lowest rated exercises
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
