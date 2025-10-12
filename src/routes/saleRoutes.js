
import express from 'express';
import { createSale, listSales, sendInvoice } from '../controllers/saleController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkSubscription } from '../middleware/subscriptionMiddleware.js';
const r = express.Router();
r.use(protect, checkSubscription);
r.post('/', createSale);
r.get('/', listSales);
r.post('/:id/send', sendInvoice);
export default r;
