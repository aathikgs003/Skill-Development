import express from 'express';
import {
  createTrainerPool,
  getAllTrainerPools,
  getTrainerPoolById,
  updateTrainerPool,
  deleteTrainerPool
} from '../../controllers/pool/trainerPool.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerPool)
  .get(protect, getAllTrainerPools);

router.route('/:id')
  .get(protect, getTrainerPoolById)
  .put(protect, updateTrainerPool)
  .delete(protect, deleteTrainerPool);

export default router;
