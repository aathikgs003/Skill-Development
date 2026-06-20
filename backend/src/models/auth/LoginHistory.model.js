import mongoose from 'mongoose';

const loginHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, loginAt: { type: Date, default: Date.now }, loginIp: { type: String }, userAgent: { type: String }, deviceType: { type: String, enum: ['Web', 'Mobile', 'Tablet', 'Desktop', 'API'], default: 'Web' }, status: { type: String, enum: ['Success', 'Failed', 'Blocked', 'MFA_Pending'], default: 'Success' }
  },
  { timestamps: true }
);

const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);
export default LoginHistory;
