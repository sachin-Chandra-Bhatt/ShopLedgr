
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';
export const protect = async (req,res,next)=>{
  try{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) throw new ApiError(401, 'Not authorized');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id).select('-password');
    if(!user) throw new ApiError(401, 'User not found');
    req.user = user;
    next();
  }catch(err){ next(err); }
};
