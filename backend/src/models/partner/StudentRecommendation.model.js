import mongoose from 'mongoose';

const studentRecommendationSchema = new mongoose.Schema(
  {
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'ImplementationPartner', required: true }, student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, status: { type: String, enum: ['Recommended', 'Selected', 'Rejected', 'Shortlisted'], default: 'Recommended' }
  },
  { timestamps: true }
);

const StudentRecommendation = mongoose.model('StudentRecommendation', studentRecommendationSchema);
export default StudentRecommendation;
