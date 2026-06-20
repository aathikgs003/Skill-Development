import express from 'express';
import {
  createDailyReport,
  getAllDailyReports,
  getDailyReportById,
  updateDailyReport,
  deleteDailyReport
} from '../../controllers/report/dailyReport.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createDailyReport)
  .get(protect, getAllDailyReports);

router.route('/:id')
  .get(protect, getDailyReportById)
  .put(protect, updateDailyReport)
  .delete(protect, deleteDailyReport);

export default router;
