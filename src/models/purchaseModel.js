
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  buyingPrice: Number,
  total: Number,
  supplier: String
}, { timestamps: true });
export default mongoose.model('Purchase', schema);
