import mongoose from 'mongoose';

const teachingMaterialSchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, title: { type: String, required: true }, description: { type: String }, materialType: { type: String, enum: ['PPT', 'PDF', 'Notes', 'Video', 'Code', 'Link', 'Other'], default: 'Other' }, fileUrl: { type: String, required: true }
  },
  { timestamps: true }
);

const TeachingMaterial = mongoose.model('TeachingMaterial', teachingMaterialSchema);
export default TeachingMaterial;
