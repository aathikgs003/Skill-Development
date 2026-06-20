import express from 'express';
import {
  createTrainerPoolCertification,
  getAllTrainerPoolCertifications,
  getTrainerPoolCertificationById,
  updateTrainerPoolCertification,
  deleteTrainerPoolCertification
} from '../../controllers/pool/trainerPoolCertification.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerPoolCertification)
  .get(protect, getAllTrainerPoolCertifications);

router.route('/:id')
  .get(protect, getTrainerPoolCertificationById)
  .put(protect, updateTrainerPoolCertification)
  .delete(protect, deleteTrainerPoolCertification);

export default router;
