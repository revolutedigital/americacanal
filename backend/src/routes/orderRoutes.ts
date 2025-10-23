import { Router } from 'express';
import {
  createOrder,
  getOrderByNumber,
  getAllOrdersAdmin,
  updateOrderStatus,
  updateOrder,
  getOrderStats,
} from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes (anyone with order number can track)
router.post('/', createOrder);
router.get('/:orderNumber', getOrderByNumber);

// Admin protected routes
router.get('/admin/all', authMiddleware, getAllOrdersAdmin);
router.get('/admin/stats', authMiddleware, getOrderStats);
router.put('/:id/status', authMiddleware, updateOrderStatus);
router.put('/:id', authMiddleware, updateOrder);

export default router;
