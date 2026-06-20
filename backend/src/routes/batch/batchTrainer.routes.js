import express from 'express';
import {
  createBatchTrainer,
  getAllBatchTrainers,
  getBatchTrainerById,
  updateBatchTrainer,
  deleteBatchTrainer
} from '../../controllers/batch/batchTrainer.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createBatchTrainer)
  .get(protect, getAllBatchTrainers);

router.route('/:id')
  .get(protect, getBatchTrainerById)
  .put(protect, updateBatchTrainer)
  .delete(protect, deleteBatchTrainer);

export default router;
