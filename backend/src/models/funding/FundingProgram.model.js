import mongoose from 'mongoose';

const fundingProgramSchema = new mongoose.Schema(
  {
    agency: { type: mongoose.Schema.Types.ObjectId, ref: 'FundingAgency', required: true }, programName: { type: String, required: true }, programCode: { type: String, required: true, unique: true }, budget: { type: Number, required: true }, remainingBudget: { type: Number, required: true }, status: { type: String, enum: ['Draft', 'Active', 'Paused', 'Completed', 'Cancelled'], default: 'Draft' }
  },
  { timestamps: true }
);

const FundingProgram = mongoose.model('FundingProgram', fundingProgramSchema);
export default FundingProgram;
