import express from 'express';
import {
  createRolePermission,
  getAllRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission
} from '../../controllers/auth/rolePermission.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createRolePermission)
  .get(protect, getAllRolePermissions);

router.route('/:id')
  .get(protect, getRolePermissionById)
  .put(protect, updateRolePermission)
  .delete(protect, deleteRolePermission);

export default router;
