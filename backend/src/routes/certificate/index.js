import express from 'express';
import certificateRoutes from './certificate.routes.js';
import certificateTemplateRoutes from './certificateTemplate.routes.js';
import certificateVerificationLogRoutes from './certificateVerificationLog.routes.js';

const router = express.Router();

router.use('/certificates', certificateRoutes);
router.use('/certificateTemplates', certificateTemplateRoutes);
router.use('/certificateVerificationLogs', certificateVerificationLogRoutes);

export default router;
