import express from 'express';
import {
  createCoordinator,
  getAllCoordinators,
  getCoordinatorById,
  updateCoordinator,
  deleteCoordinator
} from '../../controllers/coordinator/coordinator.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCoordinator)
  .get(protect, getAllCoordinators);

router.route('/:id')
  .get(protect, getCoordinatorById)
  .put(protect, updateCoordinator)
  .delete(protect, deleteCoordinator);

export default router;
