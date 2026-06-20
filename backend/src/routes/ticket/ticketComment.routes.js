import express from 'express';
import {
  createTicketComment,
  getAllTicketComments,
  getTicketCommentById,
  updateTicketComment,
  deleteTicketComment
} from '../../controllers/ticket/ticketComment.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTicketComment)
  .get(protect, getAllTicketComments);

router.route('/:id')
  .get(protect, getTicketCommentById)
  .put(protect, updateTicketComment)
  .delete(protect, deleteTicketComment);

export default router;
