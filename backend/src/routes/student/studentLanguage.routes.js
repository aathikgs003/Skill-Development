import express from 'express';
import {
  createStudentLanguage,
  getAllStudentLanguages,
  getStudentLanguageById,
  updateStudentLanguage,
  deleteStudentLanguage
} from '../../controllers/student/studentLanguage.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentLanguage)
  .get(protect, getAllStudentLanguages);

router.route('/:id')
  .get(protect, getStudentLanguageById)
  .put(protect, updateStudentLanguage)
  .delete(protect, deleteStudentLanguage);

export default router;
