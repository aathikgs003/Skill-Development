import mongoose from 'mongoose';

const batchCoordinatorSchema = new mongoose.Schema(
  {
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator', required: true }
  },
  { timestamps: true }
);

const BatchCoordinator = mongoose.model('BatchCoordinator', batchCoordinatorSchema);
export default BatchCoordinator;
