import mongoose from 'mongoose';

const educationTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, description: { type: String }
  },
  { timestamps: true }
);

const EducationType = mongoose.model('EducationType', educationTypeSchema);
export default EducationType;
