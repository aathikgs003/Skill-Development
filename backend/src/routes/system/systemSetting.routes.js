import express from 'express';
import {
  createSystemSetting,
  getAllSystemSettings,
  getSystemSettingById,
  updateSystemSetting,
  deleteSystemSetting
} from '../../controllers/system/systemSetting.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createSystemSetting)
  .get(protect, getAllSystemSettings);

router.route('/:id')
  .get(protect, getSystemSettingById)
  .put(protect, updateSystemSetting)
  .delete(protect, deleteSystemSetting);

export default router;
