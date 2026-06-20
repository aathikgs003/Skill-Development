import express from 'express';
import {
  createCourseModule,
  getAllCourseModules,
  getCourseModuleById,
  updateCourseModule,
  deleteCourseModule
} from '../../controllers/course/courseModule.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCourseModule)
  .get(protect, getAllCourseModules);

router.route('/:id')
  .get(protect, getCourseModuleById)
  .put(protect, updateCourseModule)
  .delete(protect, deleteCourseModule);

export default router;
