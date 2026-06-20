import mongoose from 'mongoose';

const systemSettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, value: { type: String, required: true }, settingType: { type: String, enum: ['String', 'Integer', 'Boolean', 'JSON', 'Date'], default: 'String' }
  },
  { timestamps: true }
);

const SystemSetting = mongoose.model('SystemSetting', systemSettingSchema);
export default SystemSetting;
