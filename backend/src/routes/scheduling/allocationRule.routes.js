import express from 'express';
import {
  createAllocationRule,
  getAllAllocationRules,
  getAllocationRuleById,
  updateAllocationRule,
  deleteAllocationRule
} from '../../controllers/scheduling/allocationRule.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createAllocationRule)
  .get(protect, getAllAllocationRules);

router.route('/:id')
  .get(protect, getAllocationRuleById)
  .put(protect, updateAllocationRule)
  .delete(protect, deleteAllocationRule);

export default router;
