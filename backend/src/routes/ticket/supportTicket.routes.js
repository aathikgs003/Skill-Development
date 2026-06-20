import express from 'express';
import {
  createSupportTicket,
  getAllSupportTickets,
  getSupportTicketById,
  updateSupportTicket,
  deleteSupportTicket
} from '../../controllers/ticket/supportTicket.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createSupportTicket)
  .get(protect, getAllSupportTickets);

router.route('/:id')
  .get(protect, getSupportTicketById)
  .put(protect, updateSupportTicket)
  .delete(protect, deleteSupportTicket);

export default router;
