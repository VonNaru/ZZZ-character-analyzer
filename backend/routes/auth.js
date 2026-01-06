import express from 'express';
import { login, checkAdmin } from '../controllers/authController.js';

const router = express.Router();

// Login
router.post('/login', login);

// Check if admin
router.post('/check-admin', checkAdmin);

export default router;
