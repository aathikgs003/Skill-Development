import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, body: { type: String, required: true }, announcementType: { type: String, enum: ['System', 'Course', 'Batch', 'Organization', 'Partner', 'Program'], default: 'System' }
  },
  { timestamps: true }
);

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
