import mongoose from 'mongoose';

const trainerTimeSlotSchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, date: { type: Date, required: true }, startTime: { type: String, required: true }, endTime: { type: String, required: true }, isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const TrainerTimeSlot = mongoose.model('TrainerTimeSlot', trainerTimeSlotSchema);
export default TrainerTimeSlot;
