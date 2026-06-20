import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  slots: [
    {
      startTime: { type: String, required: true }, // Format HH:MM (e.g. 09:00)
      endTime: { type: String, required: true },
    },
  ],
});

const teachingMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  description: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

const trainerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specializations: [{ type: String }],
    experienceYears: { type: Number, required: true, default: 0 },
    bio: { type: String },
    availability: [availabilitySchema],
    teachingMaterials: [teachingMaterialSchema],
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
);

const Trainer = mongoose.model('Trainer', trainerSchema);
export default Trainer;
