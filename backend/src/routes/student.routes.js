import express from 'express';
import { getAllStudents, getStudentById, updateStudentProfile } from '../controllers/student.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/rbac.middleware.js';

const router = express.Router();

// Allow Admin, SuperAdmin, Coordinator to view all students
router.get('/', authMiddleware, authorizeRoles('Admin', 'SuperAdmin', 'Coordinator'), getAllStudents);

// Fetch specific profile (Authenticated users)
router.get('/:id', authMiddleware, getStudentById);

// Update profile (Authenticated users, check inside controller for ownership)
router.put('/:id', authMiddleware, updateStudentProfile);

export default router;
