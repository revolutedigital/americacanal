import express from 'express';
import { getTenantConfig, updateTenantConfig } from '../controllers/tenantController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// GET /api/tenant/config - Get tenant configuration (public)
router.get('/config', getTenantConfig);

// PUT /api/tenant/config - Update tenant configuration (admin only)
router.put('/config', authMiddleware, updateTenantConfig);

export default router;
