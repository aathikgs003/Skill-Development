import mongoose from 'mongoose';

const ticketStatusHistorySchema = new mongoose.Schema(
  {
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportTicket', required: true }, oldStatus: { type: String }, newStatus: { type: String, required: true }
  },
  { timestamps: true }
);

const TicketStatusHistory = mongoose.model('TicketStatusHistory', ticketStatusHistorySchema);
export default TicketStatusHistory;
