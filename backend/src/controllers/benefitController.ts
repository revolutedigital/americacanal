import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================
// GLOBAL BENEFITS
// ============================================

// GET /api/benefits/global?tenantId=xxx
export const getAllGlobalBenefits = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.query;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId é obrigatório' });
    }

    const benefits = await prisma.globalBenefit.findMany({
      where: { tenantId },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json(benefits);
  } catch (error) {
    console.error('Error fetching global benefits:', error);
    res.status(500).json({ error: 'Erro ao buscar benefícios globais' });
  }
};

// GET /api/benefits/global/active?tenantId=xxx
export const getActiveGlobalBenefits = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.query;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId é obrigatório' });
    }

    const benefits = await prisma.globalBenefit.findMany({
      where: {
        tenantId,
        isActive: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
      take: 10, // Máximo de 10 benefícios
    });

    res.json(benefits);
  } catch (error) {
    console.error('Error fetching active global benefits:', error);
    res.status(500).json({ error: 'Erro ao buscar benefícios ativos' });
  }
};

// POST /api/benefits/global
export const createGlobalBenefit = async (req: Request, res: Response) => {
  try {
    const { tenantId, icon, title, description, isActive, order } = req.body;

    // Validações
    if (!tenantId || !icon || !title || !description) {
      return res.status(400).json({
        error: 'tenantId, icon, title e description são obrigatórios',
      });
    }

    const benefit = await prisma.globalBenefit.create({
      data: {
        tenantId,
        icon,
        title,
        description,
        isActive: isActive !== undefined ? isActive : true,
        order: order !== undefined ? order : 0,
      },
    });

    res.status(201).json(benefit);
  } catch (error) {
    console.error('Error creating global benefit:', error);
    res.status(500).json({ error: 'Erro ao criar benefício global' });
  }
};

// PUT /api/benefits/global/:id
export const updateGlobalBenefit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { icon, title, description, isActive, order } = req.body;

    // Verificar se existe
    const existing = await prisma.globalBenefit.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Benefício não encontrado' });
    }

    const benefit = await prisma.globalBenefit.update({
      where: { id },
      data: {
        ...(icon !== undefined && { icon }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    });

    res.json(benefit);
  } catch (error) {
    console.error('Error updating global benefit:', error);
    res.status(500).json({ error: 'Erro ao atualizar benefício global' });
  }
};

// DELETE /api/benefits/global/:id
export const deleteGlobalBenefit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar se existe
    const existing = await prisma.globalBenefit.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Benefício não encontrado' });
    }

    await prisma.globalBenefit.delete({
      where: { id },
    });

    res.json({ message: 'Benefício excluído com sucesso' });
  } catch (error) {
    console.error('Error deleting global benefit:', error);
    res.status(500).json({ error: 'Erro ao excluir benefício global' });
  }
};

// PUT /api/benefits/global/:id/toggle-active
export const toggleGlobalBenefitActive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.globalBenefit.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Benefício não encontrado' });
    }

    const benefit = await prisma.globalBenefit.update({
      where: { id },
      data: {
        isActive: !existing.isActive,
      },
    });

    res.json(benefit);
  } catch (error) {
    console.error('Error toggling active:', error);
    res.status(500).json({ error: 'Erro ao alterar status' });
  }
};

// PUT /api/benefits/global/reorder
export const reorderGlobalBenefits = async (req: Request, res: Response) => {
  try {
    const { benefits } = req.body; // Array de { id, order }

    if (!Array.isArray(benefits)) {
      return res.status(400).json({ error: 'benefits deve ser um array' });
    }

    // Update all benefits in a transaction
    await prisma.$transaction(
      benefits.map((benefit: { id: string; order: number }) =>
        prisma.globalBenefit.update({
          where: { id: benefit.id },
          data: { order: benefit.order },
        })
      )
    );

    res.json({ message: 'Ordem atualizada com sucesso' });
  } catch (error) {
    console.error('Error reordering global benefits:', error);
    res.status(500).json({ error: 'Erro ao reordenar benefícios' });
  }
};

// ============================================
// PRODUCT BENEFITS
// ============================================

// GET /api/benefits/product/:productId
export const getProductBenefits = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const benefits = await prisma.productBenefit.findMany({
      where: { productId },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json(benefits);
  } catch (error) {
    console.error('Error fetching product benefits:', error);
    res.status(500).json({ error: 'Erro ao buscar benefícios do produto' });
  }
};

// POST /api/benefits/product
export const createProductBenefit = async (req: Request, res: Response) => {
  try {
    const { productId, icon, title, description, order } = req.body;

    // Validações
    if (!productId || !icon || !title || !description) {
      return res.status(400).json({
        error: 'productId, icon, title e description são obrigatórios',
      });
    }

    // Verificar se o produto existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const benefit = await prisma.productBenefit.create({
      data: {
        productId,
        icon,
        title,
        description,
        order: order !== undefined ? order : 0,
      },
    });

    res.status(201).json(benefit);
  } catch (error) {
    console.error('Error creating product benefit:', error);
    res.status(500).json({ error: 'Erro ao criar benefício do produto' });
  }
};

// PUT /api/benefits/product/:id
export const updateProductBenefit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { icon, title, description, order } = req.body;

    // Verificar se existe
    const existing = await prisma.productBenefit.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Benefício não encontrado' });
    }

    const benefit = await prisma.productBenefit.update({
      where: { id },
      data: {
        ...(icon !== undefined && { icon }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
      },
    });

    res.json(benefit);
  } catch (error) {
    console.error('Error updating product benefit:', error);
    res.status(500).json({ error: 'Erro ao atualizar benefício do produto' });
  }
};

// DELETE /api/benefits/product/:id
export const deleteProductBenefit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar se existe
    const existing = await prisma.productBenefit.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Benefício não encontrado' });
    }

    await prisma.productBenefit.delete({
      where: { id },
    });

    res.json({ message: 'Benefício excluído com sucesso' });
  } catch (error) {
    console.error('Error deleting product benefit:', error);
    res.status(500).json({ error: 'Erro ao excluir benefício do produto' });
  }
};

// PUT /api/benefits/product/reorder
export const reorderProductBenefits = async (req: Request, res: Response) => {
  try {
    const { benefits } = req.body; // Array de { id, order }

    if (!Array.isArray(benefits)) {
      return res.status(400).json({ error: 'benefits deve ser um array' });
    }

    // Update all benefits in a transaction
    await prisma.$transaction(
      benefits.map((benefit: { id: string; order: number }) =>
        prisma.productBenefit.update({
          where: { id: benefit.id },
          data: { order: benefit.order },
        })
      )
    );

    res.json({ message: 'Ordem atualizada com sucesso' });
  } catch (error) {
    console.error('Error reordering product benefits:', error);
    res.status(500).json({ error: 'Erro ao reordenar benefícios' });
  }
};
