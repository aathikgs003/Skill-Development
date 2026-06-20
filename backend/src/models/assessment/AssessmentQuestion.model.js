import mongoose from 'mongoose';

const assessmentQuestionSchema = new mongoose.Schema(
  {
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true }, questionText: { type: String, required: true }, questionType: { type: String, enum: ['MCQ', 'MSQ', 'True/False', 'Short Answer', 'Long Answer', 'Coding', 'File Upload'], default: 'MCQ' }, options: [{ type: String }], correctAnswer: { type: String }
  },
  { timestamps: true }
);

const AssessmentQuestion = mongoose.model('AssessmentQuestion', assessmentQuestionSchema);
export default AssessmentQuestion;
