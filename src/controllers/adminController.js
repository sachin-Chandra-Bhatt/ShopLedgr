
import Company from '../models/companyModel.js';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const superStats = asyncHandler(async (req,res)=>{
  const companies = await Company.countDocuments();
  const users = await User.countDocuments();
  res.json(new ApiResponse(200,'Super stats', { companies, users }));
});
