import express from 'express';
import {
  createStudentCollegeDetail,
  getAllStudentCollegeDetails,
  getStudentCollegeDetailById,
  updateStudentCollegeDetail,
  deleteStudentCollegeDetail
} from '../../controllers/student/studentCollegeDetail.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentCollegeDetail)
  .get(protect, getAllStudentCollegeDetails);

router.route('/:id')
  .get(protect, getStudentCollegeDetailById)
  .put(protect, updateStudentCollegeDetail)
  .delete(protect, deleteStudentCollegeDetail);

export default router;
