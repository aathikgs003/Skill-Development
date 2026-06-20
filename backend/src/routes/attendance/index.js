import express from 'express';
import studentAttendanceRoutes from './studentAttendance.routes.js';
import trainerAttendanceRoutes from './trainerAttendance.routes.js';
import qRAttendanceCodeRoutes from './qRAttendanceCode.routes.js';
import attendanceAnalyticsRoutes from './attendanceAnalytics.routes.js';

const router = express.Router();

router.use('/studentAttendances', studentAttendanceRoutes);
router.use('/trainerAttendances', trainerAttendanceRoutes);
router.use('/qRAttendanceCodes', qRAttendanceCodeRoutes);
router.use('/attendanceAnalyticss', attendanceAnalyticsRoutes);

export default router;
