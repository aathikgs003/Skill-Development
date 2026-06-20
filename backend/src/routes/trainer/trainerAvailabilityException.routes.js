import express from 'express';
import {
  createTrainerAvailabilityException,
  getAllTrainerAvailabilityExceptions,
  getTrainerAvailabilityExceptionById,
  updateTrainerAvailabilityException,
  deleteTrainerAvailabilityException
} from '../../controllers/trainer/trainerAvailabilityException.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerAvailabilityException)
  .get(protect, getAllTrainerAvailabilityExceptions);

router.route('/:id')
  .get(protect, getTrainerAvailabilityExceptionById)
  .put(protect, updateTrainerAvailabilityException)
  .delete(protect, deleteTrainerAvailabilityException);

export default router;
