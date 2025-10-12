
import express from 'express';
import { createPurchase, listPurchases } from '../controllers/purchaseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkSubscription } from '../middleware/subscriptionMiddleware.js';
const r = express.Router();
r.use(protect, checkSubscription);
r.post('/', createPurchase);
r.get('/', listPurchases);
export default r;
