import express from 'express';
import {
  createTrainerRanking,
  getAllTrainerRankings,
  getTrainerRankingById,
  updateTrainerRanking,
  deleteTrainerRanking
} from '../../controllers/analytics/trainerRanking.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerRanking)
  .get(protect, getAllTrainerRankings);

router.route('/:id')
  .get(protect, getTrainerRankingById)
  .put(protect, updateTrainerRanking)
  .delete(protect, deleteTrainerRanking);

export default router;
