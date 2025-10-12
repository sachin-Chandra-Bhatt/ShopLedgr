
import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createProduct = asyncHandler(async (req,res)=>{
  const { name, sku, buyingPrice, sellingPrice, stock } = req.body;
  const p = await Product.create({ company: req.user.company, name, sku, buyingPrice, sellingPrice, stock });
  res.status(201).json(new ApiResponse(201, 'Product created', p));
});

export const listProducts = asyncHandler(async (req,res)=>{
  const products = await Product.find({ company: req.user.company });
  res.json(new ApiResponse(200, 'Products fetched', products));
});

export const updateProduct = asyncHandler(async (req,res)=>{
  const p = await Product.findOneAndUpdate({ _id: req.params.id, company: req.user.company }, req.body, { new: true });
  res.json(new ApiResponse(200, 'Product updated', p));
});

export const deleteProduct = asyncHandler(async (req,res)=>{
  await Product.findOneAndDelete({ _id: req.params.id, company: req.user.company });
  res.json(new ApiResponse(200, 'Product deleted'));
});
