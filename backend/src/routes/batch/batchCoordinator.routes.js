import express from 'express';
import {
  createBatchCoordinator,
  getAllBatchCoordinators,
  getBatchCoordinatorById,
  updateBatchCoordinator,
  deleteBatchCoordinator
} from '../../controllers/batch/batchCoordinator.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createBatchCoordinator)
  .get(protect, getAllBatchCoordinators);

router.route('/:id')
  .get(protect, getBatchCoordinatorById)
  .put(protect, updateBatchCoordinator)
  .delete(protect, deleteBatchCoordinator);

export default router;
