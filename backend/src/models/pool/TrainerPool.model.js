import mongoose from 'mongoose';

const trainerPoolSchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, status: { type: String, enum: ['Available', 'Assigned', 'Unavailable'], default: 'Available' }
  },
  { timestamps: true }
);

const TrainerPool = mongoose.model('TrainerPool', trainerPoolSchema);
export default TrainerPool;
