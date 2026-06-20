import express from 'express';
import {
  createOrganizationRecommendation,
  getAllOrganizationRecommendations,
  getOrganizationRecommendationById,
  updateOrganizationRecommendation,
  deleteOrganizationRecommendation
} from '../../controllers/partner/organizationRecommendation.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrganizationRecommendation)
  .get(protect, getAllOrganizationRecommendations);

router.route('/:id')
  .get(protect, getOrganizationRecommendationById)
  .put(protect, updateOrganizationRecommendation)
  .delete(protect, deleteOrganizationRecommendation);

export default router;
