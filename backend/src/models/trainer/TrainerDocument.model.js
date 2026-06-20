import mongoose from 'mongoose';

const trainerDocumentSchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, documentType: { type: mongoose.Schema.Types.ObjectId, ref: 'DocumentType', required: true }, documentUrl: { type: String, required: true }
  },
  { timestamps: true }
);

const TrainerDocument = mongoose.model('TrainerDocument', trainerDocumentSchema);
export default TrainerDocument;
