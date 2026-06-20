import express from 'express';
import {
  createFileUpload,
  getAllFileUploads,
  getFileUploadById,
  updateFileUpload,
  deleteFileUpload
} from '../../controllers/system/fileUpload.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFileUpload)
  .get(protect, getAllFileUploads);

router.route('/:id')
  .get(protect, getFileUploadById)
  .put(protect, updateFileUpload)
  .delete(protect, deleteFileUpload);

export default router;
