import { Router } from 'express';
import {
  getAllDefaultReviews,
  getFeaturedDefaultReviews,
  createDefaultReview,
  updateDefaultReview,
  deleteDefaultReview,
  toggleFeatured,
  toggleActive,
  reorderDefaultReviews,
} from '../controllers/defaultReviewController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/featured', getFeaturedDefaultReviews);

// Admin protected routes
router.get('/', authMiddleware, getAllDefaultReviews);
router.post('/', authMiddleware, createDefaultReview);
router.put('/reorder', authMiddleware, reorderDefaultReviews);
router.put('/:id', authMiddleware, updateDefaultReview);
router.put('/:id/toggle-featured', authMiddleware, toggleFeatured);
router.put('/:id/toggle-active', authMiddleware, toggleActive);
router.delete('/:id', authMiddleware, deleteDefaultReview);

export default router;
