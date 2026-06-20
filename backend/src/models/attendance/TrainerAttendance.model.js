import mongoose from 'mongoose';

const trainerAttendanceSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'BatchSession', required: true }, trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, attendanceStatus: { type: String, enum: ['Present', 'Absent', 'Late', 'Half Day', 'Excused', 'On Leave'], required: true }, markedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const TrainerAttendance = mongoose.model('TrainerAttendance', trainerAttendanceSchema);
export default TrainerAttendance;
