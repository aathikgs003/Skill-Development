import express from 'express';
import {
  createStudentUnemployedDetail,
  getAllStudentUnemployedDetails,
  getStudentUnemployedDetailById,
  updateStudentUnemployedDetail,
  deleteStudentUnemployedDetail
} from '../../controllers/student/studentUnemployedDetail.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentUnemployedDetail)
  .get(protect, getAllStudentUnemployedDetails);

router.route('/:id')
  .get(protect, getStudentUnemployedDetailById)
  .put(protect, updateStudentUnemployedDetail)
  .delete(protect, deleteStudentUnemployedDetail);

export default router;
