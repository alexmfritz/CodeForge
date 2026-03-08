import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema, bulkCreateUsersSchema, updateUserSchema } from '@codeforge/shared/validation';
import { createUser, bulkCreateUsers, resetPassword } from '../services/userService.js';
import { User } from '../models/User.js';

const router = Router();

router.use(authenticate);

router.get('/', authorize('instructor', 'ta'), async (req, res) => {
  try {
    const filter: Record<string, unknown> = {};
    if (req.query.cohortId) filter.cohortId = req.query.cohortId;
    if (req.query.role) filter.role = req.query.role;
    if (req.query.active !== undefined) filter.isActive = req.query.active === 'true';

    // Support optional pagination — if page param is present, paginate
    if (req.query.page) {
      const { parsePagination, paginate } = await import('../utils/pagination.js');
      const params = parsePagination(req.query as Record<string, unknown>);
      const result = await paginate(User.find(filter).sort({ displayName: 1 }), params);
      res.json({ success: true, data: result.items, pagination: { page: result.page, pageSize: result.pageSize, totalItems: result.totalItems, totalPages: result.totalPages } });
    } else {
      const users = await User.find(filter).sort({ displayName: 1 });
      res.json({ success: true, data: users });
    }
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

router.post('/', authorize('instructor'), validate(createUserSchema), async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create user';
    res.status(400).json({ success: false, error: message });
  }
});

router.post('/bulk', authorize('instructor'), validate(bulkCreateUsersSchema), async (req, res) => {
  try {
    const users = await bulkCreateUsers(req.body.users, req.body.cohortId);
    res.status(201).json({ success: true, data: users });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create users';
    res.status(400).json({ success: false, error: message });
  }
});

router.get('/:id', authorize('instructor', 'ta'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, data: user });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
});

router.patch('/:id', authenticate, validate(updateUserSchema), async (req, res) => {
  try {
    const isAdmin = req.user!.role === 'instructor' || req.user!.role === 'ta';
    const isSelf = req.user!.userId === req.params.id;

    if (!isAdmin && !isSelf) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }

    if (!isAdmin && isSelf) {
      const allowed = { preferences: req.body.preferences };
      const user = await User.findByIdAndUpdate(req.params.id, allowed, { new: true });
      res.json({ success: true, data: user });
      return;
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, data: user });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
});

router.post('/:id/reset-password', authorize('instructor'), async (req, res) => {
  try {
    const user = await resetPassword(req.params.id as string);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, data: user });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to reset password' });
  }
});

export default router;
