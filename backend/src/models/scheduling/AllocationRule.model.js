import mongoose from 'mongoose';

const allocationRuleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, description: { type: String }, ruleType: { type: String, required: true }, criteria: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

const AllocationRule = mongoose.model('AllocationRule', allocationRuleSchema);
export default AllocationRule;
