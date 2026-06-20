import express from 'express';
import {
  createFundingUtilizationAnalytics,
  getAllFundingUtilizationAnalyticss,
  getFundingUtilizationAnalyticsById,
  updateFundingUtilizationAnalytics,
  deleteFundingUtilizationAnalytics
} from '../../controllers/analytics/fundingUtilizationAnalytics.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFundingUtilizationAnalytics)
  .get(protect, getAllFundingUtilizationAnalyticss);

router.route('/:id')
  .get(protect, getFundingUtilizationAnalyticsById)
  .put(protect, updateFundingUtilizationAnalytics)
  .delete(protect, deleteFundingUtilizationAnalytics);

export default router;
