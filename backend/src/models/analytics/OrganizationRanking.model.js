import mongoose from 'mongoose';

const organizationRankingSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, rank: { type: Number, required: true }, score: { type: Number, required: true }
  },
  { timestamps: true }
);

const OrganizationRanking = mongoose.model('OrganizationRanking', organizationRankingSchema);
export default OrganizationRanking;
