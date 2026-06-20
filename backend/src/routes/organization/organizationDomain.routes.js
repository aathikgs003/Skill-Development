import express from 'express';
import {
  createOrganizationDomain,
  getAllOrganizationDomains,
  getOrganizationDomainById,
  updateOrganizationDomain,
  deleteOrganizationDomain
} from '../../controllers/organization/organizationDomain.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrganizationDomain)
  .get(protect, getAllOrganizationDomains);

router.route('/:id')
  .get(protect, getOrganizationDomainById)
  .put(protect, updateOrganizationDomain)
  .delete(protect, deleteOrganizationDomain);

export default router;
