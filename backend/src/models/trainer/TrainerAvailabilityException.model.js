import mongoose from 'mongoose';

const trainerAvailabilityExceptionSchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, date: { type: Date, required: true }, slots: [{ startTime: { type: String, required: true }, endTime: { type: String, required: true } }], exceptionType: { type: String, enum: ['Leave', 'Holiday', 'Personal', 'Other'], default: 'Personal' }
  },
  { timestamps: true }
);

const TrainerAvailabilityException = mongoose.model('TrainerAvailabilityException', trainerAvailabilityExceptionSchema);
export default TrainerAvailabilityException;
