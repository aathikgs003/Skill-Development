import express from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from '../../controllers/master/department.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createDepartment)
  .get(protect, getAllDepartments);

router.route('/:id')
  .get(protect, getDepartmentById)
  .put(protect, updateDepartment)
  .delete(protect, deleteDepartment);

export default router;
