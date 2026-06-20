import mongoose from 'mongoose';

const fundUtilizationSchema = new mongoose.Schema(
  {
    allocation: { type: mongoose.Schema.Types.ObjectId, ref: 'FundingAllocation', required: true }, utilizedAmount: { type: Number, required: true }, expenseCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseCategory', required: true }, utilizationDate: { type: Date, default: Date.now }, remarks: { type: String }
  },
  { timestamps: true }
);

const FundUtilization = mongoose.model('FundUtilization', fundUtilizationSchema);
export default FundUtilization;
