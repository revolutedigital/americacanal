import { Router } from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
  clearWishlist,
  getWishlistCount,
} from '../controllers/wishlistController';
import { customerAuthMiddleware } from '../middlewares/customerAuthMiddleware';

const router = Router();

// All wishlist routes require customer authentication
router.get('/', customerAuthMiddleware, getWishlist);
router.get('/count', customerAuthMiddleware, getWishlistCount);
router.get('/check/:productId', customerAuthMiddleware, checkWishlist);
router.post('/', customerAuthMiddleware, addToWishlist);
router.delete('/:productId', customerAuthMiddleware, removeFromWishlist);
router.delete('/', customerAuthMiddleware, clearWishlist);

export default router;
