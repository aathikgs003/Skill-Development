import mongoose from 'mongoose';

const assessmentAnswerDetailSchema = new mongoose.Schema(
  {
    submission: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentSubmission', required: true }, question: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentQuestion', required: true }, selectedOption: { type: String }, isCorrect: { type: Boolean }
  },
  { timestamps: true }
);

const AssessmentAnswerDetail = mongoose.model('AssessmentAnswerDetail', assessmentAnswerDetailSchema);
export default AssessmentAnswerDetail;
