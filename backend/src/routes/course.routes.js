import express from 'express';
import { createCourse, getAllCourses, getCourseById } from '../controllers/course.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/rbac.middleware.js';

const router = express.Router();

// Allow all authenticated users to read courses
router.get('/', authMiddleware, getAllCourses);
router.get('/:id', authMiddleware, getCourseById);

// Only Admin, SuperAdmin, and Coordinators can create courses
router.post('/', authMiddleware, authorizeRoles('Admin', 'SuperAdmin', 'Coordinator'), createCourse);

export default router;
