import mongoose from 'mongoose';

const qRAttendanceCodeSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'BatchSession', required: true }, qrCode: { type: String, required: true }, expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

const QRAttendanceCode = mongoose.model('QRAttendanceCode', qRAttendanceCodeSchema);
export default QRAttendanceCode;
