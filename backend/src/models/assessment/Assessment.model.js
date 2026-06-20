import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema(
  {
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, title: { type: String, required: true }, assessmentType: { type: String, enum: ['Quiz', 'Assignment', 'Coding Test', 'Project', 'Viva', 'Mid-Term', 'Final', 'Mock'], default: 'Quiz' }, maxMarks: { type: Number, required: true }, passingMarks: { type: Number, required: true }
  },
  { timestamps: true }
);

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;
