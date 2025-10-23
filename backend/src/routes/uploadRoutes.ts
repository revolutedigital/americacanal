import { Router } from 'express';
import {
  upload,
  uploadProductImage,
  uploadProductImages,
  uploadCategoryImage,
  uploadLogo,
  uploadBannerImage,
  deleteImage,
} from '../controllers/uploadController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Todas as rotas de upload requerem autenticação de admin
router.post('/product', authMiddleware, upload.single('image'), uploadProductImage);
router.post('/products', authMiddleware, upload.array('images', 10), uploadProductImages);
router.post('/category', authMiddleware, upload.single('image'), uploadCategoryImage);
router.post('/logo', authMiddleware, upload.single('image'), uploadLogo);
router.post('/banner', authMiddleware, upload.single('image'), uploadBannerImage);
router.post('/', authMiddleware, upload.single('image'), uploadBannerImage); // Rota genérica para banners
router.delete('/image', authMiddleware, deleteImage);

export default router;
