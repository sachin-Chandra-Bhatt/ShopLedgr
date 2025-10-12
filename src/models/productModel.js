
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  name: String,
  sku: String,
  buyingPrice: Number,
  sellingPrice: Number,
  stock: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('Product', schema);
