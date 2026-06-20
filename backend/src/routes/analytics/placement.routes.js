import express from 'express';
import {
  createPlacement,
  getAllPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement
} from '../../controllers/analytics/placement.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createPlacement)
  .get(protect, getAllPlacements);

router.route('/:id')
  .get(protect, getPlacementById)
  .put(protect, updatePlacement)
  .delete(protect, deletePlacement);

export default router;
