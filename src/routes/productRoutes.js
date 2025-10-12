
import express from 'express';
import { createProduct, listProducts, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkSubscription } from '../middleware/subscriptionMiddleware.js';
const r = express.Router();
r.use(protect, checkSubscription);
r.post('/', createProduct);
r.get('/', listProducts);
r.put('/:id', updateProduct);
r.delete('/:id', deleteProduct);
export default r;
