import mongoose from 'mongoose';

const coordinatorAssignmentSchema = new mongoose.Schema(
  {
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator', required: true }, batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, role: { type: String, enum: ['Primary', 'Support', 'Observer'], default: 'Primary' }
  },
  { timestamps: true }
);

const CoordinatorAssignment = mongoose.model('CoordinatorAssignment', coordinatorAssignmentSchema);
export default CoordinatorAssignment;
