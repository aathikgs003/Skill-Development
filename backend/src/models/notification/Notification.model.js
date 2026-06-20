import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, title: { type: String, required: true }, body: { type: String, required: true }, channel: { type: String, enum: ['Email', 'SMS', 'WhatsApp', 'In-App', 'Push'], required: true }, deliveryStatus: { type: String, enum: ['Pending', 'Sent', 'Delivered', 'Failed', 'Bounced'], default: 'Pending' }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
