import express from 'express';
import {
  createDocumentType,
  getAllDocumentTypes,
  getDocumentTypeById,
  updateDocumentType,
  deleteDocumentType
} from '../../controllers/master/documentType.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createDocumentType)
  .get(protect, getAllDocumentTypes);

router.route('/:id')
  .get(protect, getDocumentTypeById)
  .put(protect, updateDocumentType)
  .delete(protect, deleteDocumentType);

export default router;
