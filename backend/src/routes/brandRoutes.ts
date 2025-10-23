import { Router } from 'express';
import {
  getAllBrands,
  getActiveBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  toggleBrandActive,
  reorderBrands,
} from '../controllers/brandController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/active', getActiveBrands);
router.get('/:id', getBrandById);

// Admin protected routes
router.get('/', authMiddleware, getAllBrands);
router.post('/', authMiddleware, createBrand);
router.put('/reorder', authMiddleware, reorderBrands);
router.put('/:id', authMiddleware, updateBrand);
router.put('/:id/toggle-active', authMiddleware, toggleBrandActive);
router.delete('/:id', authMiddleware, deleteBrand);

export default router;
