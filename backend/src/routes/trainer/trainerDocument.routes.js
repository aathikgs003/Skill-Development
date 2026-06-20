import express from 'express';
import {
  createTrainerDocument,
  getAllTrainerDocuments,
  getTrainerDocumentById,
  updateTrainerDocument,
  deleteTrainerDocument
} from '../../controllers/trainer/trainerDocument.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerDocument)
  .get(protect, getAllTrainerDocuments);

router.route('/:id')
  .get(protect, getTrainerDocumentById)
  .put(protect, updateTrainerDocument)
  .delete(protect, deleteTrainerDocument);

export default router;
