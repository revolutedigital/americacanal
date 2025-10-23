import { Router } from 'express';
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  changeCustomerPassword,
  getCustomerOrders,
  getCustomerReviews,
} from '../controllers/customerAuthController';
import { customerAuthMiddleware } from '../middlewares/customerAuthMiddleware';

const router = Router();

// Public routes
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

// Customer protected routes
router.get('/me', customerAuthMiddleware, getCustomerProfile);
router.put('/me', customerAuthMiddleware, updateCustomerProfile);
router.put('/me/password', customerAuthMiddleware, changeCustomerPassword);
router.get('/me/orders', customerAuthMiddleware, getCustomerOrders);
router.get('/me/reviews', customerAuthMiddleware, getCustomerReviews);

export default router;
