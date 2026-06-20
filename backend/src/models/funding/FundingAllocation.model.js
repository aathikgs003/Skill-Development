import mongoose from 'mongoose';

const fundingAllocationSchema = new mongoose.Schema(
  {
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'FundingProgram', required: true }, organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, allocatedAmount: { type: Number, required: true }, status: { type: String, enum: ['Draft', 'Pending Review', 'Approved', 'Rejected', 'Archived'], default: 'Draft' }
  },
  { timestamps: true }
);

const FundingAllocation = mongoose.model('FundingAllocation', fundingAllocationSchema);
export default FundingAllocation;
