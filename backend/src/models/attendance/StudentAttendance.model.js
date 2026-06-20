import mongoose from 'mongoose';

const studentAttendanceSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'BatchSession', required: true }, student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, attendanceStatus: { type: String, enum: ['Present', 'Absent', 'Late', 'Half Day', 'Excused', 'On Leave'], required: true }, markedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const StudentAttendance = mongoose.model('StudentAttendance', studentAttendanceSchema);
export default StudentAttendance;
