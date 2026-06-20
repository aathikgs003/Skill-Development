import express from 'express';
import {
  createCourseCategory,
  getAllCourseCategorys,
  getCourseCategoryById,
  updateCourseCategory,
  deleteCourseCategory
} from '../../controllers/master/courseCategory.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCourseCategory)
  .get(protect, getAllCourseCategorys);

router.route('/:id')
  .get(protect, getCourseCategoryById)
  .put(protect, updateCourseCategory)
  .delete(protect, deleteCourseCategory);

export default router;
