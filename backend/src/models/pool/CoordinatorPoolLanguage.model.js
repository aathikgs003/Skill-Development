import mongoose from 'mongoose';

const coordinatorPoolLanguageSchema = new mongoose.Schema(
  {
    pool: { type: mongoose.Schema.Types.ObjectId, ref: 'CoordinatorPool', required: true }, language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true }
  },
  { timestamps: true }
);

const CoordinatorPoolLanguage = mongoose.model('CoordinatorPoolLanguage', coordinatorPoolLanguageSchema);
export default CoordinatorPoolLanguage;
