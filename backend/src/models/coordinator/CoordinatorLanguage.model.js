import mongoose from 'mongoose';

const coordinatorLanguageSchema = new mongoose.Schema(
  {
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator', required: true }, language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true }
  },
  { timestamps: true }
);

const CoordinatorLanguage = mongoose.model('CoordinatorLanguage', coordinatorLanguageSchema);
export default CoordinatorLanguage;
