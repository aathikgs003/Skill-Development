import express from 'express';
import {
  createStudentCertification,
  getAllStudentCertifications,
  getStudentCertificationById,
  updateStudentCertification,
  deleteStudentCertification
} from '../../controllers/student/studentCertification.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentCertification)
  .get(protect, getAllStudentCertifications);

router.route('/:id')
  .get(protect, getStudentCertificationById)
  .put(protect, updateStudentCertification)
  .delete(protect, deleteStudentCertification);

export default router;
