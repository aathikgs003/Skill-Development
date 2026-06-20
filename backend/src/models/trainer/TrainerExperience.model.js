import mongoose from 'mongoose';

const trainerExperienceSchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, companyName: { type: String, required: true }, designation: { type: String, required: true }, startDate: { type: Date, required: true }, endDate: { type: Date }, description: { type: String }
  },
  { timestamps: true }
);

const TrainerExperience = mongoose.model('TrainerExperience', trainerExperienceSchema);
export default TrainerExperience;
