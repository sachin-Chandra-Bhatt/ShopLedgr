
import express from 'express';
import { superStats } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { permit } from '../middleware/roleMiddleware.js';
const r = express.Router();
r.get('/overview', protect, permit('superadmin'), superStats);
export default r;
