import mongoose from 'mongoose';

const trainerRecommendationSchema = new mongoose.Schema(
  {
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'ImplementationPartner', required: true }, trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, status: { type: String, enum: ['Recommended', 'Selected', 'Rejected', 'Shortlisted'], default: 'Recommended' }
  },
  { timestamps: true }
);

const TrainerRecommendation = mongoose.model('TrainerRecommendation', trainerRecommendationSchema);
export default TrainerRecommendation;
