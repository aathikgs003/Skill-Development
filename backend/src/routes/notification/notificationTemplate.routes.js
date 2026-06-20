import express from 'express';
import {
  createNotificationTemplate,
  getAllNotificationTemplates,
  getNotificationTemplateById,
  updateNotificationTemplate,
  deleteNotificationTemplate
} from '../../controllers/notification/notificationTemplate.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createNotificationTemplate)
  .get(protect, getAllNotificationTemplates);

router.route('/:id')
  .get(protect, getNotificationTemplateById)
  .put(protect, updateNotificationTemplate)
  .delete(protect, deleteNotificationTemplate);

export default router;
