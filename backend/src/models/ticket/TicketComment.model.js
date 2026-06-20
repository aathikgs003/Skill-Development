import mongoose from 'mongoose';

const ticketCommentSchema = new mongoose.Schema(
  {
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportTicket', required: true }, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, comment: { type: String, required: true }
  },
  { timestamps: true }
);

const TicketComment = mongoose.model('TicketComment', ticketCommentSchema);
export default TicketComment;
