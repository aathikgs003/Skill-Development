import mongoose from 'mongoose';

const studentDocumentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, documentType: { type: mongoose.Schema.Types.ObjectId, ref: 'DocumentType', required: true }, documentUrl: { type: String, required: true }
  },
  { timestamps: true }
);

const StudentDocument = mongoose.model('StudentDocument', studentDocumentSchema);
export default StudentDocument;
