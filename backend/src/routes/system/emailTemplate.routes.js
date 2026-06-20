import express from 'express';
import {
  createEmailTemplate,
  getAllEmailTemplates,
  getEmailTemplateById,
  updateEmailTemplate,
  deleteEmailTemplate
} from '../../controllers/system/emailTemplate.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createEmailTemplate)
  .get(protect, getAllEmailTemplates);

router.route('/:id')
  .get(protect, getEmailTemplateById)
  .put(protect, updateEmailTemplate)
  .delete(protect, deleteEmailTemplate);

export default router;
