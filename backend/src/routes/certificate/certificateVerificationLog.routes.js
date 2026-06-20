import express from 'express';
import {
  createCertificateVerificationLog,
  getAllCertificateVerificationLogs,
  getCertificateVerificationLogById,
  updateCertificateVerificationLog,
  deleteCertificateVerificationLog
} from '../../controllers/certificate/certificateVerificationLog.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCertificateVerificationLog)
  .get(protect, getAllCertificateVerificationLogs);

router.route('/:id')
  .get(protect, getCertificateVerificationLogById)
  .put(protect, updateCertificateVerificationLog)
  .delete(protect, deleteCertificateVerificationLog);

export default router;
