import express from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
} from '../../controllers/auth/role.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createRole)
  .get(protect, getAllRoles);

router.route('/:id')
  .get(protect, getRoleById)
  .put(protect, updateRole)
  .delete(protect, deleteRole);

export default router;
