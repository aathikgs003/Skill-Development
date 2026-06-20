import express from 'express';
import supportTicketRoutes from './supportTicket.routes.js';
import ticketCommentRoutes from './ticketComment.routes.js';
import ticketStatusHistoryRoutes from './ticketStatusHistory.routes.js';

const router = express.Router();

router.use('/supportTickets', supportTicketRoutes);
router.use('/ticketComments', ticketCommentRoutes);
router.use('/ticketStatusHistorys', ticketStatusHistoryRoutes);

export default router;
