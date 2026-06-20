import express from 'express';
import {
  createOrganizationStaff,
  getAllOrganizationStaffs,
  getOrganizationStaffById,
  updateOrganizationStaff,
  deleteOrganizationStaff
} from '../../controllers/organization/organizationStaff.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrganizationStaff)
  .get(protect, getAllOrganizationStaffs);

router.route('/:id')
  .get(protect, getOrganizationStaffById)
  .put(protect, updateOrganizationStaff)
  .delete(protect, deleteOrganizationStaff);

export default router;
