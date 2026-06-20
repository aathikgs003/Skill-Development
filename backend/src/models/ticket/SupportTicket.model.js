import mongoose from 'mongoose';

const supportTicketSchema = new mongoose.Schema(
  {
    ticketNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ticketStatus: { 
      type: String, 
      enum: ['Open', 'In Progress', 'Waiting for Response', 'Resolved', 'Closed', 'Reopened', 'Escalated'], 
      default: 'Open' 
    },
    ticketPriority: { 
      type: String, 
      enum: ['Low', 'Medium', 'High', 'Critical'], 
      default: 'Medium' 
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// Pre-save hook: capture old status
supportTicketSchema.pre('save', async function (next) {
  if (this.isModified('ticketStatus')) {
    if (!this.isNew) {
      const oldDoc = await this.constructor.findById(this._id);
      this._oldStatus = oldDoc ? oldDoc.ticketStatus : null;
    } else {
      this._oldStatus = 'None';
    }
  }
  next();
});

// Post-save hook: create status log
supportTicketSchema.post('save', async function (doc) {
  if (doc._oldStatus && doc._oldStatus !== doc.ticketStatus) {
    try {
      const TicketStatusHistory = mongoose.model('TicketStatusHistory');
      await TicketStatusHistory.create({
        ticket: doc._id,
        oldStatus: doc._oldStatus,
        newStatus: doc.ticketStatus,
        changedBy: doc.updatedBy || doc.user,
        changedAt: new Date()
      });
    } catch (error) {
      console.error('Error logging ticket status history change:', error);
    }
  }
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);
export default SupportTicket;
