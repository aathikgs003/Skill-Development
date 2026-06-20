import mongoose from 'mongoose';

const fundingAgencySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, agencyName: { type: String, required: true }, agencyCode: { type: String, required: true, unique: true }, agencyType: { type: String, enum: ['Government', 'Private', 'NGO', 'International', 'CSR', 'Other'], default: 'Government' }, status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

const FundingAgency = mongoose.model('FundingAgency', fundingAgencySchema);
export default FundingAgency;
