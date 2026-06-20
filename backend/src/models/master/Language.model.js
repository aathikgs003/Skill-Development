import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, code: { type: String }
  },
  { timestamps: true }
);

const Language = mongoose.model('Language', languageSchema);
export default Language;
