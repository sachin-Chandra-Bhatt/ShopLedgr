
import ApiResponse from '../utils/ApiResponse.js';
export const errorHandler = (err,req,res,next)=>{
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || 'Server Error';
  res.status(status).json(new ApiResponse(status, message));
};
