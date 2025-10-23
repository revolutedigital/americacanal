import { Router } from 'express';
import {
  getAllProducts,
  getAllProductsAdmin,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
} from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);

// Admin protected routes
router.get('/admin/all', authMiddleware, getAllProductsAdmin);
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
