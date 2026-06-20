import express from 'express';
import {
  createStudentDocument,
  getAllStudentDocuments,
  getStudentDocumentById,
  updateStudentDocument,
  deleteStudentDocument
} from '../../controllers/student/studentDocument.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentDocument)
  .get(protect, getAllStudentDocuments);

router.route('/:id')
  .get(protect, getStudentDocumentById)
  .put(protect, updateStudentDocument)
  .delete(protect, deleteStudentDocument);

export default router;
