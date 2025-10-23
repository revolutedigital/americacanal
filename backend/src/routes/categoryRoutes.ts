import { Router } from 'express';
import {
  getAllCategories,
  getAllCategoriesAdmin,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/', getAllCategories);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategoryById);

// Admin protected routes
router.get('/admin/all', authMiddleware, getAllCategoriesAdmin);
router.post('/', authMiddleware, createCategory);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;
