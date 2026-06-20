import mongoose from 'mongoose';

const studentEvaluationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, overallGrade: { type: String }, remarks: { type: String }
  },
  { timestamps: true }
);

const StudentEvaluation = mongoose.model('StudentEvaluation', studentEvaluationSchema);
export default StudentEvaluation;
