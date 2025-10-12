
import express from 'express';
import { listInvoices } from '../controllers/invoiceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkSubscription } from '../middleware/subscriptionMiddleware.js';
const r = express.Router();
r.use(protect, checkSubscription);
r.get('/', listInvoices);
export default r;
