import { Router } from 'express';
import {
  getAllBanners,
  getActiveBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBannerActive,
  reorderBanners,
  trackImpression,
  trackClick,
} from '../controllers/bannerController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/active', getActiveBanners);
router.get('/:id', getBannerById);
router.post('/:id/track-impression', trackImpression);
router.post('/:id/track-click', trackClick);

// Admin protected routes
router.get('/', authMiddleware, getAllBanners);
router.post('/', authMiddleware, createBanner);
router.put('/reorder', authMiddleware, reorderBanners);
router.put('/:id', authMiddleware, updateBanner);
router.put('/:id/toggle-active', authMiddleware, toggleBannerActive);
router.delete('/:id', authMiddleware, deleteBanner);

export default router;
