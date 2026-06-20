import express from 'express';
import enrollmentRoutes from './enrollment.routes.js';
import enrollmentStatusHistoryRoutes from './enrollmentStatusHistory.routes.js';

const router = express.Router();

router.use('/enrollments', enrollmentRoutes);
router.use('/enrollmentStatusHistorys', enrollmentStatusHistoryRoutes);

export default router;
