import mongoose from 'mongoose';

const enrollmentStatusHistorySchema = new mongoose.Schema(
  {
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true }, oldStatus: { type: String }, newStatus: { type: String, required: true }, changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, changedAt: { type: Date, default: Date.now }, remarks: { type: String }
  },
  { timestamps: true }
);

const EnrollmentStatusHistory = mongoose.model('EnrollmentStatusHistory', enrollmentStatusHistorySchema);
export default EnrollmentStatusHistory;
