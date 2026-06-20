import express from 'express';
import {
  createCoordinatorPoolLanguage,
  getAllCoordinatorPoolLanguages,
  getCoordinatorPoolLanguageById,
  updateCoordinatorPoolLanguage,
  deleteCoordinatorPoolLanguage
} from '../../controllers/pool/coordinatorPoolLanguage.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCoordinatorPoolLanguage)
  .get(protect, getAllCoordinatorPoolLanguages);

router.route('/:id')
  .get(protect, getCoordinatorPoolLanguageById)
  .put(protect, updateCoordinatorPoolLanguage)
  .delete(protect, deleteCoordinatorPoolLanguage);

export default router;
