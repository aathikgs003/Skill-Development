import express from 'express';
import {
  createOrganizationSpecialization,
  getAllOrganizationSpecializations,
  getOrganizationSpecializationById,
  updateOrganizationSpecialization,
  deleteOrganizationSpecialization
} from '../../controllers/organization/organizationSpecialization.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrganizationSpecialization)
  .get(protect, getAllOrganizationSpecializations);

router.route('/:id')
  .get(protect, getOrganizationSpecializationById)
  .put(protect, updateOrganizationSpecialization)
  .delete(protect, deleteOrganizationSpecialization);

export default router;
