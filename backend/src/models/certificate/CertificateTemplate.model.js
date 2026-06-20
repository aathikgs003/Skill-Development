import mongoose from 'mongoose';

const certificateTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, htmlContent: { type: String, required: true }
  },
  { timestamps: true }
);

const CertificateTemplate = mongoose.model('CertificateTemplate', certificateTemplateSchema);
export default CertificateTemplate;
