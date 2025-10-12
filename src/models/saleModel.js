
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  sellingPrice: Number,
  total: Number,
  customerName: String,
  customerEmail: String
}, { timestamps: true });
export default mongoose.model('Sale', schema);
