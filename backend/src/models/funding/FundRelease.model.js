import mongoose from 'mongoose';

const fundReleaseSchema = new mongoose.Schema(
  {
    allocation: { type: mongoose.Schema.Types.ObjectId, ref: 'FundingAllocation', required: true }, releasedAmount: { type: Number, required: true }, releasedDate: { type: Date, default: Date.now }, paymentMode: { type: String, enum: ['Bank Transfer', 'Cheque', 'DD', 'UPI', 'NEFT', 'RTGS', 'Cash', 'Other'], default: 'Bank Transfer' }
  },
  { timestamps: true }
);

const FundRelease = mongoose.model('FundRelease', fundReleaseSchema);
export default FundRelease;
