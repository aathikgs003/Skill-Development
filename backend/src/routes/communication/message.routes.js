import express from 'express';
import {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
} from '../../controllers/communication/message.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createMessage)
  .get(protect, getAllMessages);

router.route('/:id')
  .get(protect, getMessageById)
  .put(protect, updateMessage)
  .delete(protect, deleteMessage);

export default router;
