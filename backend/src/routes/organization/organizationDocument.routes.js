import express from 'express';
import {
  createOrganizationDocument,
  getAllOrganizationDocuments,
  getOrganizationDocumentById,
  updateOrganizationDocument,
  deleteOrganizationDocument
} from '../../controllers/organization/organizationDocument.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrganizationDocument)
  .get(protect, getAllOrganizationDocuments);

router.route('/:id')
  .get(protect, getOrganizationDocumentById)
  .put(protect, updateOrganizationDocument)
  .delete(protect, deleteOrganizationDocument);

export default router;
