
import Sale from '../models/saleModel.js';
import Product from '../models/productModel.js';
import Invoice from '../models/invoiceModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import generateInvoicePDF from '../utils/generateInvoicePDF.js';
import sendEmail from '../utils/sendEmail.js';
import path from 'path';

export const createSale = asyncHandler(async (req,res)=>{
  const { productId, quantity, customerName, customerEmail } = req.body;
  const product = await Product.findOne({ _id: productId, company: req.user.company });
  if(!product) return res.status(400).json(new ApiResponse(400, 'Product not found'));
  if(product.stock < quantity) return res.status(400).json(new ApiResponse(400, 'Insufficient stock'));
  product.stock -= Number(quantity); await product.save();
  const total = Number(product.sellingPrice) * Number(quantity);
  const sale = await Sale.create({ company: req.user.company, product: product._id, quantity, sellingPrice: product.sellingPrice, total, customerName, customerEmail });
  const gstPercent = 18;
  const gstAmount = +(total * gstPercent / 100).toFixed(2);
  const invoice = await Invoice.create({ company: req.user.company, sale: sale._id, invoiceNumber: `INV-${Date.now()}`, subtotal: total, gstPercent, gstAmount, total: +(total+gstAmount).toFixed(2) });
  res.status(201).json(new ApiResponse(201, 'Sale created', { sale, invoice }));
});

export const listSales = asyncHandler(async (req,res)=>{
  const sales = await Sale.find({ company: req.user.company }).populate('product');
  res.json(new ApiResponse(200, 'Sales fetched', sales));
});

export const sendInvoice = asyncHandler(async (req,res)=>{
  const invoice = await Invoice.findOne({ _id: req.params.id, company: req.user.company }).populate('sale');
  if(!invoice) return res.status(404).json(new ApiResponse(404, 'Invoice not found'));
  const outPath = path.join('/tmp', `${invoice.invoiceNumber}.pdf`);
  await generateInvoicePDF(invoice, outPath);
  const to = invoice.sale.customerEmail || req.user.email;
  await sendEmail({ to, subject: `Invoice ${invoice.invoiceNumber}`, text: 'Please find attached invoice', attachments: [{ filename: invoice.invoiceNumber + '.pdf', path: outPath }] });
  invoice.emailSent = true; await invoice.save();
  res.json(new ApiResponse(200, 'Invoice sent'));
});
