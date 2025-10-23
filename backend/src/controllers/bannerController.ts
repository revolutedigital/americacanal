import { Request, Response } from 'express';
import { PrismaClient, BannerType } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/banners?tenantId=xxx&type=HOME
export const getAllBanners = async (req: Request, res: Response) => {
  try {
    const { tenantId, type } = req.query;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId é obrigatório' });
    }

    const where: any = { tenantId };

    // Filtrar por tipo se especificado
    if (type && typeof type === 'string') {
      where.type = type as BannerType;
    }

    const banners = await prisma.banner.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Erro ao buscar banners' });
  }
};

// GET /api/banners/active?tenantId=xxx&type=HOME
export const getActiveBanners = async (req: Request, res: Response) => {
  try {
    const { tenantId, type, categoryId } = req.query;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId é obrigatório' });
    }

    const where: any = {
      tenantId,
      isActive: true,
    };

    // Filtrar por tipo se especificado
    if (type && typeof type === 'string') {
      where.type = type as BannerType;
    }

    // Filtrar por categoria se especificado
    if (categoryId && typeof categoryId === 'string') {
      where.categoryId = categoryId;
    }

    const banners = await prisma.banner.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json(banners);
  } catch (error) {
    console.error('Error fetching active banners:', error);
    res.status(500).json({ error: 'Erro ao buscar banners ativos' });
  }
};

// GET /api/banners/:id
export const getBannerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const banner = await prisma.banner.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!banner) {
      return res.status(404).json({ error: 'Banner não encontrado' });
    }

    res.json(banner);
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({ error: 'Erro ao buscar banner' });
  }
};

// POST /api/banners
export const createBanner = async (req: Request, res: Response) => {
  try {
    const {
      tenantId,
      title,
      subtitle,
      imageUrl,
      imageMobile,
      linkUrl,
      linkText,
      type,
      categoryId,
      isActive,
      order,
    } = req.body;

    // Validações
    if (!tenantId || !imageUrl) {
      return res.status(400).json({
        error: 'tenantId e imageUrl são obrigatórios',
      });
    }

    // Validar tipo
    const validTypes = ['HOME', 'CATEGORY', 'PRODUCT'];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({
        error: 'type deve ser HOME, CATEGORY ou PRODUCT',
      });
    }

    // Se for CATEGORY, categoryId é obrigatório
    if (type === 'CATEGORY' && !categoryId) {
      return res.status(400).json({
        error: 'categoryId é obrigatório para banners do tipo CATEGORY',
      });
    }

    // Verificar se categoria existe (se categoryId fornecido)
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
    }

    const banner = await prisma.banner.create({
      data: {
        tenantId,
        title: title || null,
        subtitle: subtitle || null,
        imageUrl,
        imageMobile: imageMobile || null,
        linkUrl: linkUrl || null,
        linkText: linkText || null,
        type: (type as BannerType) || 'HOME',
        categoryId: categoryId || null,
        isActive: isActive !== undefined ? isActive : true,
        order: order !== undefined ? order : 0,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ error: 'Erro ao criar banner' });
  }
};

// PUT /api/banners/:id
export const updateBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      subtitle,
      imageUrl,
      imageMobile,
      linkUrl,
      linkText,
      type,
      categoryId,
      isActive,
      order,
    } = req.body;

    // Verificar se existe
    const existing = await prisma.banner.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Banner não encontrado' });
    }

    // Validar tipo se fornecido
    const validTypes = ['HOME', 'CATEGORY', 'PRODUCT'];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({
        error: 'type deve ser HOME, CATEGORY ou PRODUCT',
      });
    }

    // Se mudar para CATEGORY, categoryId é obrigatório
    if (type === 'CATEGORY' && categoryId === undefined && !existing.categoryId) {
      return res.status(400).json({
        error: 'categoryId é obrigatório para banners do tipo CATEGORY',
      });
    }

    // Verificar se categoria existe (se categoryId fornecido)
    if (categoryId && categoryId !== null) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
    }

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(imageMobile !== undefined && { imageMobile }),
        ...(linkUrl !== undefined && { linkUrl }),
        ...(linkText !== undefined && { linkText }),
        ...(type !== undefined && { type: type as BannerType }),
        ...(categoryId !== undefined && { categoryId }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    res.json(banner);
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ error: 'Erro ao atualizar banner' });
  }
};

// DELETE /api/banners/:id
export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar se existe
    const existing = await prisma.banner.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Banner não encontrado' });
    }

    await prisma.banner.delete({
      where: { id },
    });

    res.json({ message: 'Banner excluído com sucesso' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ error: 'Erro ao excluir banner' });
  }
};

// PUT /api/banners/:id/toggle-active
export const toggleBannerActive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.banner.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Banner não encontrado' });
    }

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        isActive: !existing.isActive,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    res.json(banner);
  } catch (error) {
    console.error('Error toggling active:', error);
    res.status(500).json({ error: 'Erro ao alterar status' });
  }
};

// PUT /api/banners/reorder
export const reorderBanners = async (req: Request, res: Response) => {
  try {
    const { banners } = req.body; // Array de { id, order }

    if (!Array.isArray(banners)) {
      return res.status(400).json({ error: 'banners deve ser um array' });
    }

    // Update all banners in a transaction
    await prisma.$transaction(
      banners.map((banner: { id: string; order: number }) =>
        prisma.banner.update({
          where: { id: banner.id },
          data: { order: banner.order },
        })
      )
    );

    res.json({ message: 'Ordem atualizada com sucesso' });
  } catch (error) {
    console.error('Error reordering banners:', error);
    res.status(500).json({ error: 'Erro ao reordenar banners' });
  }
};

// POST /api/banners/:id/track-impression
export const trackImpression = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.banner.update({
      where: { id },
      data: {
        impressions: {
          increment: 1,
        },
      },
    });

    res.json({ message: 'Impressão registrada' });
  } catch (error) {
    console.error('Error tracking impression:', error);
    res.status(500).json({ error: 'Erro ao registrar impressão' });
  }
};

// POST /api/banners/:id/track-click
export const trackClick = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.banner.update({
      where: { id },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    res.json({ message: 'Click registrado' });
  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ error: 'Erro ao registrar click' });
  }
};
