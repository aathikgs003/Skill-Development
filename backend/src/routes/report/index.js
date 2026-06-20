import express from 'express';
import dailyReportRoutes from './dailyReport.routes.js';

const router = express.Router();

router.use('/dailyReports', dailyReportRoutes);

export default router;
