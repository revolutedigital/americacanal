import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/brands?tenantId=xxx
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.query;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId é obrigatório' });
    }

    const brands = await prisma.brand.findMany({
      where: { tenantId },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    });

    res.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Erro ao buscar marcas' });
  }
};

// GET /api/brands/active?tenantId=xxx
export const getActiveBrands = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.query;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId é obrigatório' });
    }

    const brands = await prisma.brand.findMany({
      where: {
        tenantId,
        isActive: true,
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    });

    res.json(brands);
  } catch (error) {
    console.error('Error fetching active brands:', error);
    res.status(500).json({ error: 'Erro ao buscar marcas ativas' });
  }
};

// GET /api/brands/:id
export const getBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brand = await prisma.brand.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!brand) {
      return res.status(404).json({ error: 'Marca não encontrada' });
    }

    res.json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ error: 'Erro ao buscar marca' });
  }
};

// POST /api/brands
export const createBrand = async (req: Request, res: Response) => {
  try {
    const { tenantId, name, slug, description, imageUrl, isActive, order } = req.body;

    // Validações
    if (!tenantId || !name || !slug) {
      return res.status(400).json({
        error: 'tenantId, name e slug são obrigatórios',
      });
    }

    // Verificar se slug já existe para esse tenant
    const existing = await prisma.brand.findUnique({
      where: {
        tenantId_slug: {
          tenantId,
          slug,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Slug já existe para este tenant' });
    }

    const brand = await prisma.brand.create({
      data: {
        tenantId,
        name,
        slug,
        description: description || null,
        imageUrl: imageUrl || null,
        isActive: isActive !== undefined ? isActive : true,
        order: order !== undefined ? order : 0,
      },
    });

    res.status(201).json(brand);
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ error: 'Erro ao criar marca' });
  }
};

// PUT /api/brands/:id
export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, imageUrl, isActive, order } = req.body;

    // Verificar se existe
    const existing = await prisma.brand.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Marca não encontrada' });
    }

    // Se mudou o slug, verificar se já existe
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.brand.findUnique({
        where: {
          tenantId_slug: {
            tenantId: existing.tenantId,
            slug,
          },
        },
      });

      if (slugExists) {
        return res.status(400).json({ error: 'Slug já existe para este tenant' });
      }
    }

    const brand = await prisma.brand.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    });

    res.json(brand);
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({ error: 'Erro ao atualizar marca' });
  }
};

// DELETE /api/brands/:id
export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar se existe
    const existing = await prisma.brand.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Marca não encontrada' });
    }

    // Verificar se tem produtos
    if (existing._count.products > 0) {
      return res.status(400).json({
        error: `Não é possível excluir marca com ${existing._count.products} produto(s) associado(s)`,
      });
    }

    await prisma.brand.delete({
      where: { id },
    });

    res.json({ message: 'Marca excluída com sucesso' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ error: 'Erro ao excluir marca' });
  }
};

// PUT /api/brands/:id/toggle-active
export const toggleBrandActive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.brand.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Marca não encontrada' });
    }

    const brand = await prisma.brand.update({
      where: { id },
      data: {
        isActive: !existing.isActive,
      },
    });

    res.json(brand);
  } catch (error) {
    console.error('Error toggling active:', error);
    res.status(500).json({ error: 'Erro ao alterar status' });
  }
};

// PUT /api/brands/reorder
export const reorderBrands = async (req: Request, res: Response) => {
  try {
    const { brands } = req.body; // Array de { id, order }

    if (!Array.isArray(brands)) {
      return res.status(400).json({ error: 'brands deve ser um array' });
    }

    // Update all brands in a transaction
    await prisma.$transaction(
      brands.map((brand: { id: string; order: number }) =>
        prisma.brand.update({
          where: { id: brand.id },
          data: { order: brand.order },
        })
      )
    );

    res.json({ message: 'Ordem atualizada com sucesso' });
  } catch (error) {
    console.error('Error reordering brands:', error);
    res.status(500).json({ error: 'Erro ao reordenar marcas' });
  }
};
