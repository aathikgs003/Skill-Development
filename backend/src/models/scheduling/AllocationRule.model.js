import mongoose from 'mongoose';

const allocationRuleSchema = new mongoose.Schema(
  {
    ruleName: { type: String, required: true, trim: true },
    entityType: {
      type: String,
      enum: ['Trainer', 'Coordinator', 'Venue'],
      default: 'Trainer',
    },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ImplementationPartner' },
    priority: { type: Number, default: 5 }, // 1 = highest
    matchCriteria: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    weightConfig: {
      skillMatch: { type: Number, default: 40 },
      availability: { type: Number, default: 30 },
      rating: { type: Number, default: 20 },
      cost: { type: Number, default: 10 },
    },
    minSkillMatchPct: { type: Number, default: 50 },
    minRating: { type: Number, default: 3.5 },
    maxDistance: { type: Number }, // in km for offline
    preferTrainerPool: { type: Boolean, default: true },
    autoAssign: { type: Boolean, default: false },
    notifyOnAssignment: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

allocationRuleSchema.index({ entityType: 1, isActive: 1 });
allocationRuleSchema.index({ organizationId: 1 });
allocationRuleSchema.index({ partnerId: 1 });

const AllocationRule = mongoose.model('AllocationRule', allocationRuleSchema);
export default AllocationRule;
