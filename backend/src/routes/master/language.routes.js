import express from 'express';
import {
  createLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage
} from '../../controllers/master/language.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createLanguage)
  .get(protect, getAllLanguages);

router.route('/:id')
  .get(protect, getLanguageById)
  .put(protect, updateLanguage)
  .delete(protect, deleteLanguage);

export default router;
