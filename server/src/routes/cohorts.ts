import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createCohortSchema, updateCohortSchema } from '@codeforge/shared/validation';
import { createCohort, addStudentToCohort, removeStudentFromCohort, getCohortWithStudentCount } from '../services/cohortService.js';
import { Cohort } from '../models/Cohort.js';
import { User } from '../models/User.js';

const router = Router();

router.use(authenticate);
router.use(authorize('instructor', 'ta'));

router.get('/', async (_req, res) => {
  try {
    const cohorts = await Cohort.find().sort({ startDate: -1 });
    const cohortsWithCounts = await Promise.all(
      cohorts.map(async (cohort) => {
        const studentCount = await User.countDocuments({
          cohortId: cohort._id,
          role: 'student',
          isActive: true,
        });
        return { ...cohort.toJSON(), studentCount };
      }),
    );
    res.json({ success: true, data: cohortsWithCounts });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch cohorts' });
  }
});

router.post('/', authorize('instructor'), validate(createCohortSchema), async (req, res) => {
  try {
    const cohort = await createCohort(req.body);
    res.status(201).json({ success: true, data: cohort });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create cohort';
    res.status(400).json({ success: false, error: message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cohort = await getCohortWithStudentCount(req.params.id);
    if (!cohort) {
      res.status(404).json({ success: false, error: 'Cohort not found' });
      return;
    }
    res.json({ success: true, data: cohort });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch cohort' });
  }
});

router.patch('/:id', authorize('instructor'), validate(updateCohortSchema), async (req, res) => {
  try {
    const update: Record<string, unknown> = {};
    if (req.body.name !== undefined) update.name = req.body.name;
    if (req.body.startDate !== undefined) update.startDate = new Date(req.body.startDate);
    if (req.body.endDate !== undefined) update.endDate = new Date(req.body.endDate);
    if (req.body.isActive !== undefined) update.isActive = req.body.isActive;

    const cohort = await Cohort.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!cohort) {
      res.status(404).json({ success: false, error: 'Cohort not found' });
      return;
    }
    res.json({ success: true, data: cohort });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to update cohort' });
  }
});

router.post('/:id/students', authorize('instructor'), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({ success: false, error: 'userId is required' });
      return;
    }
    const user = await addStudentToCohort(req.params.id, userId);
    res.json({ success: true, data: user });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to add student';
    res.status(400).json({ success: false, error: message });
  }
});

router.delete('/:id/students/:userId', authorize('instructor'), async (req, res) => {
  try {
    const user = await removeStudentFromCohort(req.params.userId);
    res.json({ success: true, data: user });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to remove student';
    res.status(400).json({ success: false, error: message });
  }
});

export default router;
