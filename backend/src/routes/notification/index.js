import express from 'express';
import notificationTemplateRoutes from './notificationTemplate.routes.js';
import notificationRoutes from './notification.routes.js';
import notificationPreferenceRoutes from './notificationPreference.routes.js';

const router = express.Router();

router.use('/notificationTemplates', notificationTemplateRoutes);
router.use('/notifications', notificationRoutes);
router.use('/notificationPreferences', notificationPreferenceRoutes);

export default router;
