import express from 'express';
import {
  createScheduleConflict,
  getAllScheduleConflicts,
  getScheduleConflictById,
  resolveScheduleConflict,
  deleteScheduleConflict,
} from '../../controllers/scheduling/scheduleConflict.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/rbac.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.route('/')
  .post(authorizeRoles('SuperAdmin', 'Admin'), createScheduleConflict)
  .get(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'), getAllScheduleConflicts);

router.patch(
  '/:id/resolve',
  authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'),
  resolveScheduleConflict
);

router.route('/:id')
  .get(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'), getScheduleConflictById)
  .delete(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), deleteScheduleConflict);

export default router;
