import express from 'express';
import {
  createTrainerAvailability,
  getAllTrainerAvailabilitys,
  getTrainerAvailabilityById,
  updateTrainerAvailability,
  deleteTrainerAvailability
} from '../../controllers/trainer/trainerAvailability.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerAvailability)
  .get(protect, getAllTrainerAvailabilitys);

router.route('/:id')
  .get(protect, getTrainerAvailabilityById)
  .put(protect, updateTrainerAvailability)
  .delete(protect, deleteTrainerAvailability);

export default router;
