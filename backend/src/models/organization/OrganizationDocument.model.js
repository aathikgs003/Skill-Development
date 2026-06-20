import mongoose from 'mongoose';

const organizationDocumentSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, documentType: { type: mongoose.Schema.Types.ObjectId, ref: 'DocumentType', required: true }, documentUrl: { type: String, required: true }
  },
  { timestamps: true }
);

const OrganizationDocument = mongoose.model('OrganizationDocument', organizationDocumentSchema);
export default OrganizationDocument;
