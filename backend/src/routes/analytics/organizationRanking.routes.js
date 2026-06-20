import express from 'express';
import {
  createOrganizationRanking,
  getAllOrganizationRankings,
  getOrganizationRankingById,
  updateOrganizationRanking,
  deleteOrganizationRanking
} from '../../controllers/analytics/organizationRanking.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrganizationRanking)
  .get(protect, getAllOrganizationRankings);

router.route('/:id')
  .get(protect, getOrganizationRankingById)
  .put(protect, updateOrganizationRanking)
  .delete(protect, deleteOrganizationRanking);

export default router;
