import express from 'express';
import {
  createCertificateTemplate,
  getAllCertificateTemplates,
  getCertificateTemplateById,
  updateCertificateTemplate,
  deleteCertificateTemplate
} from '../../controllers/certificate/certificateTemplate.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCertificateTemplate)
  .get(protect, getAllCertificateTemplates);

router.route('/:id')
  .get(protect, getCertificateTemplateById)
  .put(protect, updateCertificateTemplate)
  .delete(protect, deleteCertificateTemplate);

export default router;
