import express from 'express';
import {
  createUserPermission,
  getAllUserPermissions,
  getUserPermissionById,
  updateUserPermission,
  deleteUserPermission
} from '../../controllers/auth/userPermission.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createUserPermission)
  .get(protect, getAllUserPermissions);

router.route('/:id')
  .get(protect, getUserPermissionById)
  .put(protect, updateUserPermission)
  .delete(protect, deleteUserPermission);

export default router;
