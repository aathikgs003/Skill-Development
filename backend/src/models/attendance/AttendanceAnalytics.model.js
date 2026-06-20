import mongoose from 'mongoose';

const attendanceAnalyticsSchema = new mongoose.Schema(
  {
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, attendancePercentage: { type: Number, required: true }
  },
  { timestamps: true }
);

const AttendanceAnalytics = mongoose.model('AttendanceAnalytics', attendanceAnalyticsSchema);
export default AttendanceAnalytics;
