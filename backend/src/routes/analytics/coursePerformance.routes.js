import express from 'express';
import {
  createCoursePerformance,
  getAllCoursePerformances,
  getCoursePerformanceById,
  updateCoursePerformance,
  deleteCoursePerformance
} from '../../controllers/analytics/coursePerformance.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCoursePerformance)
  .get(protect, getAllCoursePerformances);

router.route('/:id')
  .get(protect, getCoursePerformanceById)
  .put(protect, updateCoursePerformance)
  .delete(protect, deleteCoursePerformance);

export default router;
