import { Router } from 'express';
import {
  getProductReviews,
  getReviewStats,
  createReview,
  updateReview,
  deleteReview,
  approveReview,
  rejectReview,
  getAllReviewsAdmin,
  markReviewHelpful,
} from '../controllers/reviewController';
import { customerAuthMiddleware } from '../middlewares/customerAuthMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/product/:productId', getProductReviews);
router.get('/stats/:productId', getReviewStats);
router.post('/:id/helpful', markReviewHelpful);

// Customer protected routes
router.post('/', customerAuthMiddleware, createReview);
router.put('/:id', customerAuthMiddleware, updateReview);
router.delete('/:id', customerAuthMiddleware, deleteReview);

// Admin protected routes
router.get('/admin', authMiddleware, getAllReviewsAdmin);
router.put('/:id/approve', authMiddleware, approveReview);
router.put('/:id/reject', authMiddleware, rejectReview);

export default router;
