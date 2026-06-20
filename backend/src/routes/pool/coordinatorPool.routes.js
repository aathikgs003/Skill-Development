import express from 'express';
import {
  createCoordinatorPool,
  getAllCoordinatorPools,
  getCoordinatorPoolById,
  updateCoordinatorPool,
  deleteCoordinatorPool
} from '../../controllers/pool/coordinatorPool.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCoordinatorPool)
  .get(protect, getAllCoordinatorPools);

router.route('/:id')
  .get(protect, getCoordinatorPoolById)
  .put(protect, updateCoordinatorPool)
  .delete(protect, deleteCoordinatorPool);

export default router;
