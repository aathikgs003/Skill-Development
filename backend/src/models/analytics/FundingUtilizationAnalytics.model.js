import mongoose from 'mongoose';

const fundingUtilizationAnalyticsSchema = new mongoose.Schema(
  {
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'FundingProgram', required: true }, utilizedPercentage: { type: Number, required: true }
  },
  { timestamps: true }
);

const FundingUtilizationAnalytics = mongoose.model('FundingUtilizationAnalytics', fundingUtilizationAnalyticsSchema);
export default FundingUtilizationAnalytics;
