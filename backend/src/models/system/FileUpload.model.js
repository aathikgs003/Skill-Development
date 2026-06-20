import mongoose from 'mongoose';

const fileUploadSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true }, fileName: { type: String, required: true }, fileUrl: { type: String, required: true }, mimeType: { type: String }, sizeBytes: { type: Number }, uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);
export default FileUpload;
