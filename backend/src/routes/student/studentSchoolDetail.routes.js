import express from 'express';
import {
  createStudentSchoolDetail,
  getAllStudentSchoolDetails,
  getStudentSchoolDetailById,
  updateStudentSchoolDetail,
  deleteStudentSchoolDetail
} from '../../controllers/student/studentSchoolDetail.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentSchoolDetail)
  .get(protect, getAllStudentSchoolDetails);

router.route('/:id')
  .get(protect, getStudentSchoolDetailById)
  .put(protect, updateStudentSchoolDetail)
  .delete(protect, deleteStudentSchoolDetail);

export default router;
