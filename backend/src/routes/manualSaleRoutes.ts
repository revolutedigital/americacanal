import { Router } from 'express';
import {
  createManualSale,
  getSalesHistory,
  getSalesStats,
} from '../controllers/manualSaleController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Todas as rotas requerem autenticação de admin
router.post('/', authMiddleware, createManualSale);
router.get('/history', authMiddleware, getSalesHistory);
router.get('/stats', authMiddleware, getSalesStats);

export default router;
