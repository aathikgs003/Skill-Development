import express from 'express';
import {
  createNotificationPreference,
  getAllNotificationPreferences,
  getNotificationPreferenceById,
  updateNotificationPreference,
  deleteNotificationPreference
} from '../../controllers/notification/notificationPreference.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createNotificationPreference)
  .get(protect, getAllNotificationPreferences);

router.route('/:id')
  .get(protect, getNotificationPreferenceById)
  .put(protect, updateNotificationPreference)
  .delete(protect, deleteNotificationPreference);

export default router;
