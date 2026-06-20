import mongoose from 'mongoose';

const studentPoolSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, status: { type: String, enum: ['Available', 'Enrolled', 'Waitlisted', 'Unavailable'], default: 'Available' }
  },
  { timestamps: true }
);

const StudentPool = mongoose.model('StudentPool', studentPoolSchema);
export default StudentPool;
