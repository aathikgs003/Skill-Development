import mongoose from 'mongoose';

const coordinatorPoolSchema = new mongoose.Schema(
  {
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator', required: true }, status: { type: String, enum: ['Available', 'Assigned', 'Unavailable'], default: 'Available' }
  },
  { timestamps: true }
);

const CoordinatorPool = mongoose.model('CoordinatorPool', coordinatorPoolSchema);
export default CoordinatorPool;
