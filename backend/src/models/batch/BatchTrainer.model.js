import mongoose from 'mongoose';

const batchTrainerSchema = new mongoose.Schema(
  {
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }
  },
  { timestamps: true }
);

const BatchTrainer = mongoose.model('BatchTrainer', batchTrainerSchema);
export default BatchTrainer;
