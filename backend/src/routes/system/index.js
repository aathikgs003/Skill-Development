import express from 'express';
import systemSettingRoutes from './systemSetting.routes.js';
import emailTemplateRoutes from './emailTemplate.routes.js';
import fileUploadRoutes from './fileUpload.routes.js';

const router = express.Router();

router.use('/systemSettings', systemSettingRoutes);
router.use('/emailTemplates', emailTemplateRoutes);
router.use('/fileUploads', fileUploadRoutes);

export default router;
