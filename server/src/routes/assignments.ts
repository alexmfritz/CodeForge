import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createAssignmentSchema } from '@codeforge/shared/validation';
import {
  listAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deactivateAssignment,
  getAssignmentProgress,
} from '../services/assignmentService.js';

const router = Router();

// List assignments with client-side filtering for targeted students
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { role, cohortId } = req.user!;
    const filterCohort = (req.query.cohortId as string) || cohortId;
    const assignments = await listAssignments(role, filterCohort);

    // Further filter targeted assignments at route level for students
    if (role === 'student' && cohortId) {
      const userId = req.user!.userId;
      const filtered = assignments.filter((a: Record<string, unknown>) => {
        const targets = a.targetStudentIds as string[] | undefined;
        if (!targets || targets.length === 0) return true; // Empty targets = for all cohort students
        return targets.includes(userId);
      });
      return res.json({ success: true, data: filtered });
    }

    res.json({ success: true, data: assignments });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const data = await getAssignmentById(req.params.id as string);
    if (!data) {
      return res.status(404).json({ success: false, error: 'Assignment not found' });
    }
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// Only instructors and TAs can create assignments with validated schema
router.post(
  '/',
  authenticate,
  authorize('instructor', 'ta'),
  validate(createAssignmentSchema),
  async (req, res, next) => {
    try {
      const assignment = await createAssignment(req.body, req.user!.userId);
      res.status(201).json({ success: true, data: assignment });
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/:id',
  authenticate,
  authorize('instructor', 'ta'),
  async (req, res, next) => {
    try {
      const assignment = await updateAssignment(req.params.id as string, req.body);
      if (!assignment) {
        return res.status(404).json({ success: false, error: 'Assignment not found' });
      }
      res.json({ success: true, data: assignment });
    } catch (err) {
      next(err);
    }
  },
);

// Soft delete via deactivation preserves assignment and student progress history
router.delete(
  '/:id',
  authenticate,
  authorize('instructor', 'ta'),
  async (req, res, next) => {
    try {
      const assignment = await deactivateAssignment(req.params.id as string);
      if (!assignment) {
        return res.status(404).json({ success: false, error: 'Assignment not found' });
      }
      res.json({ success: true, data: assignment });
    } catch (err) {
      next(err);
    }
  },
);

// Only instructors and TAs can view detailed student progress
router.get('/:id/progress', authenticate, authorize('instructor', 'ta'), async (req, res, next) => {
  try {
    const data = await getAssignmentProgress(req.params.id as string);
    if (!data) {
      return res.status(404).json({ success: false, error: 'Assignment not found' });
    }
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

export default router;
