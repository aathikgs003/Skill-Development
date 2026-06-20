import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    feedbackType: { type: String, enum: ['Student→Trainer', 'Trainer→Student', 'Student→Organization', 'Trainer→Organization', 'Coordinator→Trainer', 'Coordinator→Student', 'Student→Course', 'General'], required: true }, givenByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, givenToUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, givenToEntityId: { type: mongoose.Schema.Types.ObjectId }, overallRating: { type: Number, required: true }
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
