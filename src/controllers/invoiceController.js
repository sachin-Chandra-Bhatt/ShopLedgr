
import Invoice from '../models/invoiceModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const listInvoices = asyncHandler(async (req,res)=>{
  const inv = await Invoice.find({ company: req.user.company }).populate('sale');
  res.json(new ApiResponse(200,'Invoices fetched', inv));
});
