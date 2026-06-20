import express from 'express';
import {
  createCoordinatorLanguage,
  getAllCoordinatorLanguages,
  getCoordinatorLanguageById,
  updateCoordinatorLanguage,
  deleteCoordinatorLanguage
} from '../../controllers/coordinator/coordinatorLanguage.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCoordinatorLanguage)
  .get(protect, getAllCoordinatorLanguages);

router.route('/:id')
  .get(protect, getCoordinatorLanguageById)
  .put(protect, updateCoordinatorLanguage)
  .delete(protect, deleteCoordinatorLanguage);

export default router;
