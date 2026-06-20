import mongoose from 'mongoose';

const trainerAvailabilitySchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true }, slots: [{ startTime: { type: String, required: true }, endTime: { type: String, required: true } }]
  },
  { timestamps: true }
);

const TrainerAvailability = mongoose.model('TrainerAvailability', trainerAvailabilitySchema);
export default TrainerAvailability;
