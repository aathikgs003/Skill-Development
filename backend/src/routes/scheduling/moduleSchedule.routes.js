import express from 'express';
import {
  createModuleSchedule,
  getAllModuleSchedules,
  getModuleScheduleById,
  updateModuleSchedule,
  deleteModuleSchedule,
} from '../../controllers/scheduling/moduleSchedule.controller.js';
import {
  autoAllocateTrainer,
  getTrainerRecommendations,
} from '../../controllers/scheduling/autoAllocation.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/rbac.middleware.js';

const router = express.Router();

router.use(authMiddleware);

// Auto-allocation endpoints
router.post(
  '/allocate/trainer/:moduleScheduleId',
  authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'),
  autoAllocateTrainer
);

router.get(
  '/recommend/trainer/:moduleScheduleId',
  authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'),
  getTrainerRecommendations
);

// Standard CRUD endpoints
router.route('/')
  .post(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), createModuleSchedule)
  .get(getAllModuleSchedules);

router.route('/:id')
  .get(getModuleScheduleById)
  .put(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'), updateModuleSchedule)
  .delete(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), deleteModuleSchedule);

export default router;
