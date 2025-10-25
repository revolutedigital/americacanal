import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import brandRoutes from './routes/brandRoutes';
import customerRoutes from './routes/customerRoutes';
import reviewRoutes from './routes/reviewRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import orderRoutes from './routes/orderRoutes';
import couponRoutes from './routes/couponRoutes';
import uploadRoutes from './routes/uploadRoutes';
import tenantRoutes from './routes/tenantRoutes';
import defaultReviewRoutes from './routes/defaultReviewRoutes';
import benefitRoutes from './routes/benefitRoutes';
import bannerRoutes from './routes/bannerRoutes';
import manualSaleRoutes from './routes/manualSaleRoutes';
import seedRoutes from './routes/seedRoutes';
import restoreRoutes from './routes/restoreRoutes';
import fixImageUrlsRoutes from './routes/fixImageUrls';
import applyDescriptionsRoutes from './routes/applyDescriptions';

// Carregar variáveis de ambiente
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:5178',
    'http://localhost:3000',
    'http://localhost:4000',
    'https://frontend-production1.up.railway.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads) com CORS
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, '../uploads')));

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/tenant', tenantRoutes);
app.use('/api/default-reviews', defaultReviewRoutes);
app.use('/api/benefits', benefitRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/sales', manualSaleRoutes);
app.use(seedRoutes); // Rota temporária para seed
app.use(restoreRoutes); // Rota temporária para restore DB
app.use(fixImageUrlsRoutes); // Rota temporária para fix image URLs
app.use(applyDescriptionsRoutes); // Rota para aplicar descrições SEO

// Rota de health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'America Cannabis API is running',
    timestamp: new Date().toISOString(),
    version: '2.0'
  });
});

// Rota raiz
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'America Cannabis API - Enterprise E-commerce Platform',
    version: '2.0.0',
    features: [
      'Multi-tenant architecture',
      'Product catalog with categories & tags',
      'Customer accounts & authentication',
      'Product reviews & ratings',
      'Wishlist system',
      'WhatsApp-based order tracking',
      'Coupon & discount management',
    ],
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      customers: '/api/customers',
      reviews: '/api/reviews',
      wishlist: '/api/wishlist',
      orders: '/api/orders',
      coupons: '/api/coupons',
      upload: '/api/upload',
      uploads: '/uploads',
      tenant: '/api/tenant',
      defaultReviews: '/api/default-reviews',
      benefits: '/api/benefits',
      banners: '/api/banners',
    },
  });
});

// Tratamento de rotas não encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
});

export default app;
// Force rebuild Fri Oct 24 13:46:13 -03 2025
