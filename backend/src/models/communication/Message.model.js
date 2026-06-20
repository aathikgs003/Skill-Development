import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, messageText: { type: String, required: true }, messageType: { type: String, enum: ['Direct', 'Group', 'Broadcast', 'Announcement'], default: 'Direct' }
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
