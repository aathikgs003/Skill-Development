import express from 'express';
import {
  createUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole
} from '../../controllers/auth/userRole.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createUserRole)
  .get(protect, getAllUserRoles);

router.route('/:id')
  .get(protect, getUserRoleById)
  .put(protect, updateUserRole)
  .delete(protect, deleteUserRole);

export default router;
