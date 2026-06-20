import express from 'express';
import {
  createTrainerRecommendation,
  getAllTrainerRecommendations,
  getTrainerRecommendationById,
  updateTrainerRecommendation,
  deleteTrainerRecommendation
} from '../../controllers/partner/trainerRecommendation.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerRecommendation)
  .get(protect, getAllTrainerRecommendations);

router.route('/:id')
  .get(protect, getTrainerRecommendationById)
  .put(protect, updateTrainerRecommendation)
  .delete(protect, deleteTrainerRecommendation);

export default router;
