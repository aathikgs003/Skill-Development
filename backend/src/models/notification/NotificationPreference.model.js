import mongoose from 'mongoose';

const notificationPreferenceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, email: { type: Boolean, default: true }, sms: { type: Boolean, default: false }, whatsapp: { type: Boolean, default: false }, inApp: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const NotificationPreference = mongoose.model('NotificationPreference', notificationPreferenceSchema);
export default NotificationPreference;
