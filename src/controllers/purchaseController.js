
import Purchase from '../models/purchaseModel.js';
import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createPurchase = asyncHandler(async (req,res)=>{
  const { productId, quantity, buyingPrice, supplier } = req.body;
  const product = await Product.findOne({ _id: productId, company: req.user.company });
  if(!product) return res.status(400).json(new ApiResponse(400,'Product not found'));
  product.stock += Number(quantity); await product.save();
  const total = Number(buyingPrice) * Number(quantity);
  const pu = await Purchase.create({ company: req.user.company, product: product._id, quantity, buyingPrice, total, supplier });
  res.status(201).json(new ApiResponse(201,'Purchase recorded', pu));
});

export const listPurchases = asyncHandler(async (req,res)=>{
  const pu = await Purchase.find({ company: req.user.company }).populate('product');
  res.json(new ApiResponse(200,'Purchases fetched', pu));
});
