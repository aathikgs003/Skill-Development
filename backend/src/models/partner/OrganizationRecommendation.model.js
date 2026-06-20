import mongoose from 'mongoose';

const organizationRecommendationSchema = new mongoose.Schema(
  {
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'ImplementationPartner', required: true }, organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, status: { type: String, enum: ['Recommended', 'Selected', 'Rejected', 'Shortlisted'], default: 'Recommended' }
  },
  { timestamps: true }
);

const OrganizationRecommendation = mongoose.model('OrganizationRecommendation', organizationRecommendationSchema);
export default OrganizationRecommendation;
