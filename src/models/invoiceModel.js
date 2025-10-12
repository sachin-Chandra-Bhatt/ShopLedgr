
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  sale: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale' },
  invoiceNumber: String,
  subtotal: Number,
  gstPercent: Number,
  gstAmount: Number,
  total: Number,
  emailSent: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Invoice', schema);
