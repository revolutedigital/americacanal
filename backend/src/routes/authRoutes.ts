import { Router } from 'express';
import { login, me } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// POST /api/auth/login - Login
router.post('/login', login);

// GET /api/auth/me - Verificar token (protegida)
router.get('/me', authMiddleware, me);

export default router;
