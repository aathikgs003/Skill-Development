import express from 'express';
import organizationRankingRoutes from './organizationRanking.routes.js';
import trainerRankingRoutes from './trainerRanking.routes.js';
import studentSkillGrowthRoutes from './studentSkillGrowth.routes.js';
import coursePerformanceRoutes from './coursePerformance.routes.js';
import fundingUtilizationAnalyticsRoutes from './fundingUtilizationAnalytics.routes.js';
import placementRoutes from './placement.routes.js';

const router = express.Router();

router.use('/organizationRankings', organizationRankingRoutes);
router.use('/trainerRankings', trainerRankingRoutes);
router.use('/studentSkillGrowths', studentSkillGrowthRoutes);
router.use('/coursePerformances', coursePerformanceRoutes);
router.use('/fundingUtilizationAnalyticss', fundingUtilizationAnalyticsRoutes);
router.use('/placements', placementRoutes);

export default router;
