
import ApiError from '../utils/ApiError.js';
export const checkSubscription = (req,res,next)=>{
  // superadmin bypass
  if(req.user.role === 'superadmin') return next();
  const now = new Date();
  if(req.user.subscriptionExpiry && new Date(req.user.subscriptionExpiry) > now) return next();
  // allow 7-day trial from createdAt if no expiry
  const created = req.user.createdAt || req.user._doc?.createdAt;
  if(created){
    const trialEnd = new Date(created);
    trialEnd.setDate(trialEnd.getDate() + 7);
    if(trialEnd > now) return next();
  }
  return next(new ApiError(403, 'Subscription expired'));
};
