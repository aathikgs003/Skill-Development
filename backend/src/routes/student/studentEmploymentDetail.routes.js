import express from 'express';
import {
  createStudentEmploymentDetail,
  getAllStudentEmploymentDetails,
  getStudentEmploymentDetailById,
  updateStudentEmploymentDetail,
  deleteStudentEmploymentDetail
} from '../../controllers/student/studentEmploymentDetail.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentEmploymentDetail)
  .get(protect, getAllStudentEmploymentDetails);

router.route('/:id')
  .get(protect, getStudentEmploymentDetailById)
  .put(protect, updateStudentEmploymentDetail)
  .delete(protect, deleteStudentEmploymentDetail);

export default router;
