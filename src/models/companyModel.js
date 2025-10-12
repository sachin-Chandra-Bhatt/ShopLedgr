
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: String, email: String, plan: String, isActive: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Company', schema);
