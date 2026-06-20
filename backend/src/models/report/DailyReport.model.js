import mongoose from 'mongoose';

const dailyReportSchema = new mongoose.Schema(
  {
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, date: { type: Date, default: Date.now }, summary: { type: String, required: true }, details: { type: String }
  },
  { timestamps: true }
);

const DailyReport = mongoose.model('DailyReport', dailyReportSchema);
export default DailyReport;
