import { Router } from 'express';
import {
  getAllGlobalBenefits,
  getActiveGlobalBenefits,
  createGlobalBenefit,
  updateGlobalBenefit,
  deleteGlobalBenefit,
  toggleGlobalBenefitActive,
  reorderGlobalBenefits,
  getProductBenefits,
  createProductBenefit,
  updateProductBenefit,
  deleteProductBenefit,
  reorderProductBenefits,
} from '../controllers/benefitController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/global/active', getActiveGlobalBenefits);
router.get('/product/:productId', getProductBenefits);

// Admin protected routes - Global Benefits
router.get('/global', authMiddleware, getAllGlobalBenefits);
router.post('/global', authMiddleware, createGlobalBenefit);
router.put('/global/reorder', authMiddleware, reorderGlobalBenefits);
router.put('/global/:id', authMiddleware, updateGlobalBenefit);
router.put('/global/:id/toggle-active', authMiddleware, toggleGlobalBenefitActive);
router.delete('/global/:id', authMiddleware, deleteGlobalBenefit);

// Admin protected routes - Product Benefits
router.post('/product', authMiddleware, createProductBenefit);
router.put('/product/reorder', authMiddleware, reorderProductBenefits);
router.put('/product/:id', authMiddleware, updateProductBenefit);
router.delete('/product/:id', authMiddleware, deleteProductBenefit);

export default router;
