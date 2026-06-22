import express from 'express';
import {
  createAllocationRule,
  getAllAllocationRules,
  getAllocationRuleById,
  updateAllocationRule,
  deleteAllocationRule,
} from '../../controllers/scheduling/allocationRule.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/rbac.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.route('/')
  .post(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), createAllocationRule)
  .get(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'), getAllAllocationRules);

router.route('/:id')
  .get(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'), getAllocationRuleById)
  .put(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), updateAllocationRule)
  .delete(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), deleteAllocationRule);

export default router;
