import mongoose from 'mongoose';

const notificationTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, channel: { type: String, enum: ['Email', 'SMS', 'WhatsApp', 'In-App', 'Push'], required: true }, subject: { type: String }, bodyTemplate: { type: String, required: true }
  },
  { timestamps: true }
);

const NotificationTemplate = mongoose.model('NotificationTemplate', notificationTemplateSchema);
export default NotificationTemplate;
