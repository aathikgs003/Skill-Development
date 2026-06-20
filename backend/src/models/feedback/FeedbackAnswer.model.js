import mongoose from 'mongoose';

const feedbackAnswerSchema = new mongoose.Schema(
  {
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback', required: true }, question: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackQuestion', required: true }, rating: { type: Number, required: true }, comment: { type: String }
  },
  { timestamps: true }
);

const FeedbackAnswer = mongoose.model('FeedbackAnswer', feedbackAnswerSchema);
export default FeedbackAnswer;
