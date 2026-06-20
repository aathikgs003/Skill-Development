import express from 'express';
import authRoutes from './auth.routes.js';
import studentRoutes from './student.routes.js';
import courseRoutes from './course.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import masterModuleRoutes from './master/index.js';
import authModuleRoutes from './auth/index.js';
import studentModuleRoutes from './student/index.js';
import trainerModuleRoutes from './trainer/index.js';
import coordinatorModuleRoutes from './coordinator/index.js';
import organizationModuleRoutes from './organization/index.js';
import partnerModuleRoutes from './partner/index.js';
import fundingModuleRoutes from './funding/index.js';
import poolModuleRoutes from './pool/index.js';
import courseModuleRoutes from './course/index.js';
import batchModuleRoutes from './batch/index.js';
import enrollmentModuleRoutes from './enrollment/index.js';
import attendanceModuleRoutes from './attendance/index.js';
import assessmentModuleRoutes from './assessment/index.js';
import certificateModuleRoutes from './certificate/index.js';
import feedbackModuleRoutes from './feedback/index.js';
import ticketModuleRoutes from './ticket/index.js';
import notificationModuleRoutes from './notification/index.js';
import analyticsModuleRoutes from './analytics/index.js';
import schedulingModuleRoutes from './scheduling/index.js';
import communicationModuleRoutes from './communication/index.js';
import reportModuleRoutes from './report/index.js';
import systemModuleRoutes from './system/index.js';

const router = express.Router();

// Existing legacy routes
router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);
router.use('/dashboard', dashboardRoutes);

// New module routes
router.use('/master', masterModuleRoutes);
router.use('/auth', authModuleRoutes);
router.use('/student', studentModuleRoutes);
router.use('/trainer', trainerModuleRoutes);
router.use('/coordinator', coordinatorModuleRoutes);
router.use('/organization', organizationModuleRoutes);
router.use('/partner', partnerModuleRoutes);
router.use('/funding', fundingModuleRoutes);
router.use('/pool', poolModuleRoutes);
router.use('/course', courseModuleRoutes);
router.use('/batch', batchModuleRoutes);
router.use('/enrollment', enrollmentModuleRoutes);
router.use('/attendance', attendanceModuleRoutes);
router.use('/assessment', assessmentModuleRoutes);
router.use('/certificate', certificateModuleRoutes);
router.use('/feedback', feedbackModuleRoutes);
router.use('/ticket', ticketModuleRoutes);
router.use('/notification', notificationModuleRoutes);
router.use('/analytics', analyticsModuleRoutes);
router.use('/scheduling', schedulingModuleRoutes);
router.use('/communication', communicationModuleRoutes);
router.use('/report', reportModuleRoutes);
router.use('/system', systemModuleRoutes);

export default router;
