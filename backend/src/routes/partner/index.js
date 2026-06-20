import express from 'express';
import implementationPartnerRoutes from './implementationPartner.routes.js';
import organizationRecommendationRoutes from './organizationRecommendation.routes.js';
import trainerRecommendationRoutes from './trainerRecommendation.routes.js';
import studentRecommendationRoutes from './studentRecommendation.routes.js';

const router = express.Router();

router.use('/implementationPartners', implementationPartnerRoutes);
router.use('/organizationRecommendations', organizationRecommendationRoutes);
router.use('/trainerRecommendations', trainerRecommendationRoutes);
router.use('/studentRecommendations', studentRecommendationRoutes);

export default router;
