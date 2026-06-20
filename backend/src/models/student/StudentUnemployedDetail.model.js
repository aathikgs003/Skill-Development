import mongoose from 'mongoose';

const studentUnemployedDetailSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, reason: { type: String }, jobSearchStatus: { type: String, enum: ['Actively Looking', 'Casually Looking', 'Not Looking'], default: 'Actively Looking' }
  },
  { timestamps: true }
);

const StudentUnemployedDetail = mongoose.model('StudentUnemployedDetail', studentUnemployedDetailSchema);
export default StudentUnemployedDetail;
