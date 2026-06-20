import express from 'express';
import {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate
} from '../../controllers/certificate/certificate.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCertificate)
  .get(protect, getAllCertificates);

router.route('/:id')
  .get(protect, getCertificateById)
  .put(protect, updateCertificate)
  .delete(protect, deleteCertificate);

export default router;
