import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createAssignmentSchema, updateAssignmentSchema } from '@codeforge/shared/validation';
import {
  listAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deactivateAssignment,
  getAssignmentProgress,
  getAssignmentProgressSummaries,
} from '../services/assignmentService.js';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { role, cohortId } = req.user!;
    const filterCohort = (req.query.cohortId as string) || cohortId;
    const includeArchived = req.query.includeArchived === 'true' && role !== 'student';
    const assignments = await listAssignments(role, filterCohort, includeArchived);

    if (role === 'student' && cohortId) {
      const userId = req.user!.userId;
      const filtered = assignments.filter((a: Record<string, unknown>) => {
        const targets = a.targetStudentIds as string[] | undefined;
        if (!targets || targets.length === 0) return true;
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
  validate(updateAssignmentSchema),
  async (req, res, next) => {
    try {
      const existing = await getAssignmentById(req.params.id as string);
      if (!existing) {
        return res.status(404).json({ success: false, error: 'Assignment not found' });
      }

      // If due date has passed, restrict editable fields
      const dueDate = existing.dueDate ? new Date(existing.dueDate as string) : null;
      const isPastDue = dueDate && dueDate < new Date();
      if (isPastDue) {
        const allowed = ['description', 'dueDate', 'isActive'];
        const restricted = Object.keys(req.body).filter((k) => !allowed.includes(k));
        if (restricted.length > 0) {
          return res.status(400).json({
            success: false,
            error: `Cannot modify ${restricted.join(', ')} after the due date has passed. Only description and due date can be updated.`,
          });
        }
      }

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

router.post('/progress-summaries', authenticate, authorize('instructor', 'ta'), async (req, res, next) => {
  try {
    const { assignmentIds } = req.body as { assignmentIds: string[] };
    if (!Array.isArray(assignmentIds) || assignmentIds.length === 0) {
      return res.status(400).json({ success: false, error: 'assignmentIds array is required' });
    }
    const data = await getAssignmentProgressSummaries(assignmentIds);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

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
