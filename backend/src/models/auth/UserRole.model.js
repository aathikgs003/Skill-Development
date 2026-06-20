import mongoose from 'mongoose';

const userRoleSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }, status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

const UserRole = mongoose.model('UserRole', userRoleSchema);
export default UserRole;
