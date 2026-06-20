import express from 'express';
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment
} from '../../controllers/enrollment/enrollment.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createEnrollment)
  .get(protect, getAllEnrollments);

router.route('/:id')
  .get(protect, getEnrollmentById)
  .put(protect, updateEnrollment)
  .delete(protect, deleteEnrollment);

export default router;
