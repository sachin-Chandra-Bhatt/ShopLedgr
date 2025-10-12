
import express from 'express';
import { register, login, logout, profile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const r = express.Router();
r.post('/register', register);
r.post('/login', login);
r.post('/logout', logout);
r.get('/profile', protect, profile);
export default r;
