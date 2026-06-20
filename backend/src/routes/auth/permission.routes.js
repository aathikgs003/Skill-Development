import express from 'express';
import {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission
} from '../../controllers/auth/permission.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createPermission)
  .get(protect, getAllPermissions);

router.route('/:id')
  .get(protect, getPermissionById)
  .put(protect, updatePermission)
  .delete(protect, deletePermission);

export default router;
