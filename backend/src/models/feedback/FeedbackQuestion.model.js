import mongoose from 'mongoose';

const feedbackQuestionSchema = new mongoose.Schema(
  {
    feedbackType: { type: String, required: true }, questionText: { type: String, required: true }
  },
  { timestamps: true }
);

const FeedbackQuestion = mongoose.model('FeedbackQuestion', feedbackQuestionSchema);
export default FeedbackQuestion;
