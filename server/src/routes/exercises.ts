import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createExerciseSchema } from '@codeforge/shared/validation';
import { getExercisesData, getExerciseById, createExercise, updateExercise } from '../services/exerciseService.js';

const router = Router();

// Returns full exercises+collections+categories payload for the client-side Redux store
router.get('/', authenticate, async (_req, res, next) => {
  try {
    const data = await getExercisesData();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// Single exercise fetch used for deep-link navigation
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const exercise = await getExerciseById(req.params.id as string);
    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found' });
    }
    res.json({ success: true, data: exercise.toJSON() });
  } catch (err) {
    next(err);
  }
});

// Only instructors/TAs can author new exercises; Zod validates the payload shape
router.post(
  '/',
  authenticate,
  authorize('instructor', 'ta'),
  validate(createExerciseSchema),
  async (req, res, next) => {
    try {
      const exercise = await createExercise(req.body, req.user!.userId);
      res.status(201).json({ success: true, data: exercise.toJSON() });
    } catch (err) {
      next(err);
    }
  },
);

// Partial update — tracks who last modified for audit purposes
router.patch(
  '/:id',
  authenticate,
  authorize('instructor', 'ta'),
  async (req, res, next) => {
    try {
      const exercise = await updateExercise(req.params.id as string, req.body, req.user!.userId);
      if (!exercise) {
        return res.status(404).json({ success: false, error: 'Exercise not found' });
      }
      res.json({ success: true, data: exercise.toJSON() });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
