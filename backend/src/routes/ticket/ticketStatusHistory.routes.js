import express from 'express';
import {
  createTicketStatusHistory,
  getAllTicketStatusHistorys,
  getTicketStatusHistoryById,
  updateTicketStatusHistory,
  deleteTicketStatusHistory
} from '../../controllers/ticket/ticketStatusHistory.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTicketStatusHistory)
  .get(protect, getAllTicketStatusHistorys);

router.route('/:id')
  .get(protect, getTicketStatusHistoryById)
  .put(protect, updateTicketStatusHistory)
  .delete(protect, deleteTicketStatusHistory);

export default router;
