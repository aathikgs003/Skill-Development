import mongoose from 'mongoose';

const salaryRangeSchema = new mongoose.Schema(
  {
    min: { type: Number, required: true }, max: { type: Number, required: true }, currency: { type: String, default: 'INR' }
  },
  { timestamps: true }
);

const SalaryRange = mongoose.model('SalaryRange', salaryRangeSchema);
export default SalaryRange;
