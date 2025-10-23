import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/coupons/validate - Validate coupon code (public)
export const validateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId, code, subtotal } = req.body;

    if (!tenantId || !code) {
      res.status(400).json({ error: 'tenantId e code são obrigatórios' });
      return;
    }

    const coupon = await prisma.coupon.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: code.toUpperCase(),
        },
      },
    });

    if (!coupon) {
      res.status(404).json({ error: 'Cupom não encontrado', valid: false });
      return;
    }

    if (!coupon.isActive) {
      res.status(400).json({ error: 'Cupom inativo', valid: false });
      return;
    }

    const now = new Date();

    // Check start date
    if (coupon.startsAt && coupon.startsAt > now) {
      res.status(400).json({
        error: `Cupom válido a partir de ${coupon.startsAt.toLocaleDateString()}`,
        valid: false,
      });
      return;
    }

    // Check expiration
    if (coupon.expiresAt && coupon.expiresAt < now) {
      res.status(400).json({ error: 'Cupom expirado', valid: false });
      return;
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      res.status(400).json({ error: 'Cupom atingiu o limite de uso', valid: false });
      return;
    }

    // Check minimum purchase
    if (coupon.minPurchase && subtotal < Number(coupon.minPurchase)) {
      res.status(400).json({
        error: `Compra mínima de R$ ${Number(coupon.minPurchase).toFixed(2)}`,
        valid: false,
        minPurchase: Number(coupon.minPurchase),
      });
      return;
    }

    // Calculate discount
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = subtotal * (Number(coupon.value) / 100);
      if (coupon.maxDiscount && discount > Number(coupon.maxDiscount)) {
        discount = Number(coupon.maxDiscount);
      }
    } else if (coupon.type === 'fixed') {
      discount = Number(coupon.value);
    }

    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        type: coupon.type,
        value: Number(coupon.value),
        discount,
      },
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({ error: 'Erro ao validar cupom' });
  }
};

// GET /api/coupons/admin - Get all coupons (admin protected)
export const getAllCouponsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const coupons = await prisma.coupon.findMany({
      where: {
        tenantId: tenantId as string,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(coupons);
  } catch (error) {
    console.error('Get all coupons admin error:', error);
    res.status(500).json({ error: 'Erro ao buscar cupons' });
  }
};

// GET /api/coupons/:id - Get coupon by ID (admin protected)
export const getCouponById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const coupon = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!coupon) {
      res.status(404).json({ error: 'Cupom não encontrado' });
      return;
    }

    res.json(coupon);
  } catch (error) {
    console.error('Get coupon by id error:', error);
    res.status(500).json({ error: 'Erro ao buscar cupom' });
  }
};

// POST /api/coupons - Create coupon (admin protected)
export const createCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      tenantId,
      code,
      description,
      type,
      value,
      minPurchase,
      maxDiscount,
      usageLimit,
      startsAt,
      expiresAt,
      isActive,
    } = req.body;

    // Validation
    if (!tenantId || !code || !type || !value) {
      res.status(400).json({ error: 'tenantId, code, type e value são obrigatórios' });
      return;
    }

    if (!['percentage', 'fixed'].includes(type)) {
      res.status(400).json({ error: 'type deve ser percentage ou fixed' });
      return;
    }

    if (type === 'percentage' && (value < 0 || value > 100)) {
      res.status(400).json({ error: 'value para percentage deve estar entre 0 e 100' });
      return;
    }

    // Check if code already exists
    const existing = await prisma.coupon.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: code.toUpperCase(),
        },
      },
    });

    if (existing) {
      res.status(400).json({ error: 'Código de cupom já existe' });
      return;
    }

    const coupon = await prisma.coupon.create({
      data: {
        tenantId,
        code: code.toUpperCase(),
        description,
        type,
        value,
        minPurchase,
        maxDiscount,
        usageLimit,
        startsAt: startsAt ? new Date(startsAt) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    res.status(201).json(coupon);
  } catch (error) {
    console.error('Create coupon error:', error);
    res.status(500).json({ error: 'Erro ao criar cupom' });
  }
};

// PUT /api/coupons/:id - Update coupon (admin protected)
export const updateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      code,
      description,
      type,
      value,
      minPurchase,
      maxDiscount,
      usageLimit,
      startsAt,
      expiresAt,
      isActive,
      usageCount,
    } = req.body;

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!existingCoupon) {
      res.status(404).json({ error: 'Cupom não encontrado' });
      return;
    }

    // If code is being changed, check if new code exists
    if (code && code.toUpperCase() !== existingCoupon.code) {
      const codeExists = await prisma.coupon.findUnique({
        where: {
          tenantId_code: {
            tenantId: existingCoupon.tenantId,
            code: code.toUpperCase(),
          },
        },
      });

      if (codeExists) {
        res.status(400).json({ error: 'Código de cupom já existe' });
        return;
      }
    }

    const coupon = await prisma.coupon.update({
      where: { id },
      data: {
        ...(code && { code: code.toUpperCase() }),
        ...(description !== undefined && { description }),
        ...(type && { type }),
        ...(value !== undefined && { value }),
        ...(minPurchase !== undefined && { minPurchase }),
        ...(maxDiscount !== undefined && { maxDiscount }),
        ...(usageLimit !== undefined && { usageLimit }),
        ...(startsAt !== undefined && { startsAt: startsAt ? new Date(startsAt) : null }),
        ...(expiresAt !== undefined && { expiresAt: expiresAt ? new Date(expiresAt) : null }),
        ...(isActive !== undefined && { isActive }),
        ...(usageCount !== undefined && { usageCount }),
      },
    });

    res.json(coupon);
  } catch (error) {
    console.error('Update coupon error:', error);
    res.status(500).json({ error: 'Erro ao atualizar cupom' });
  }
};

// DELETE /api/coupons/:id - Delete coupon (admin protected)
export const deleteCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!existingCoupon) {
      res.status(404).json({ error: 'Cupom não encontrado' });
      return;
    }

    await prisma.coupon.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete coupon error:', error);
    res.status(500).json({ error: 'Erro ao deletar cupom' });
  }
};

// GET /api/coupons/stats - Get coupon statistics (admin protected)
export const getCouponStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const totalCoupons = await prisma.coupon.count({
      where: { tenantId: tenantId as string },
    });

    const activeCoupons = await prisma.coupon.count({
      where: {
        tenantId: tenantId as string,
        isActive: true,
      },
    });

    const topCoupons = await prisma.coupon.findMany({
      where: { tenantId: tenantId as string },
      orderBy: { usageCount: 'desc' },
      take: 10,
      select: {
        code: true,
        description: true,
        usageCount: true,
        usageLimit: true,
      },
    });

    res.json({
      totalCoupons,
      activeCoupons,
      topCoupons,
    });
  } catch (error) {
    console.error('Get coupon stats error:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas de cupons' });
  }
};
