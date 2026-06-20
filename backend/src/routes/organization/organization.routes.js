import express from 'express';
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
} from '../../controllers/organization/organization.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrganization)
  .get(protect, getAllOrganizations);

router.route('/:id')
  .get(protect, getOrganizationById)
  .put(protect, updateOrganization)
  .delete(protect, deleteOrganization);

export default router;
