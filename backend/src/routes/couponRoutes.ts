import { Router } from 'express';
import {
  validateCoupon,
  getAllCouponsAdmin,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponStats,
} from '../controllers/couponController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public route
router.post('/validate', validateCoupon);

// Admin protected routes
router.get('/admin', authMiddleware, getAllCouponsAdmin);
router.get('/admin/stats', authMiddleware, getCouponStats);
router.get('/:id', authMiddleware, getCouponById);
router.post('/', authMiddleware, createCoupon);
router.put('/:id', authMiddleware, updateCoupon);
router.delete('/:id', authMiddleware, deleteCoupon);

export default router;
