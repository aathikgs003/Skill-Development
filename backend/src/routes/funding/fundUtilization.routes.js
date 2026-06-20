import express from 'express';
import {
  createFundUtilization,
  getAllFundUtilizations,
  getFundUtilizationById,
  updateFundUtilization,
  deleteFundUtilization
} from '../../controllers/funding/fundUtilization.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFundUtilization)
  .get(protect, getAllFundUtilizations);

router.route('/:id')
  .get(protect, getFundUtilizationById)
  .put(protect, updateFundUtilization)
  .delete(protect, deleteFundUtilization);

export default router;
