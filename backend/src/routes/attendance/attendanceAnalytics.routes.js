import express from 'express';
import {
  createAttendanceAnalytics,
  getAllAttendanceAnalyticss,
  getAttendanceAnalyticsById,
  updateAttendanceAnalytics,
  deleteAttendanceAnalytics
} from '../../controllers/attendance/attendanceAnalytics.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createAttendanceAnalytics)
  .get(protect, getAllAttendanceAnalyticss);

router.route('/:id')
  .get(protect, getAttendanceAnalyticsById)
  .put(protect, updateAttendanceAnalytics)
  .delete(protect, deleteAttendanceAnalytics);

export default router;
