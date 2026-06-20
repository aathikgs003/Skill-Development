import express from 'express';
import {
  createFundingAllocation,
  getAllFundingAllocations,
  getFundingAllocationById,
  updateFundingAllocation,
  deleteFundingAllocation
} from '../../controllers/funding/fundingAllocation.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFundingAllocation)
  .get(protect, getAllFundingAllocations);

router.route('/:id')
  .get(protect, getFundingAllocationById)
  .put(protect, updateFundingAllocation)
  .delete(protect, deleteFundingAllocation);

export default router;
