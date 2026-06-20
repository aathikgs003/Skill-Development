import mongoose from 'mongoose';

const documentTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, description: { type: String }
  },
  { timestamps: true }
);

const DocumentType = mongoose.model('DocumentType', documentTypeSchema);
export default DocumentType;
