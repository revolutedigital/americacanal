import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/wishlist - Get customer wishlist (customer protected)
export const getWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;

    const wishlist = await prisma.wishlistItem.findMany({
      where: { customerId },
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(wishlist);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};

// POST /api/wishlist - Add product to wishlist (customer protected)
export const addToWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;
    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({ error: 'productId é obrigatório' });
      return;
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }

    // Check if already in wishlist
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        customerId_productId: {
          customerId,
          productId,
        },
      },
    });

    if (existing) {
      res.status(400).json({ error: 'Produto já está nos favoritos' });
      return;
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        customerId,
        productId,
      },
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json(wishlistItem);
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ error: 'Erro ao adicionar aos favoritos' });
  }
};

// DELETE /api/wishlist/:productId - Remove product from wishlist (customer protected)
export const removeFromWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;
    const { productId } = req.params;

    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: {
        customerId_productId: {
          customerId,
          productId,
        },
      },
    });

    if (!wishlistItem) {
      res.status(404).json({ error: 'Item não encontrado nos favoritos' });
      return;
    }

    await prisma.wishlistItem.delete({
      where: {
        customerId_productId: {
          customerId,
          productId,
        },
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ error: 'Erro ao remover dos favoritos' });
  }
};

// GET /api/wishlist/check/:productId - Check if product is in wishlist (customer protected)
export const checkWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;
    const { productId } = req.params;

    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: {
        customerId_productId: {
          customerId,
          productId,
        },
      },
    });

    res.json({ inWishlist: !!wishlistItem });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({ error: 'Erro ao verificar favoritos' });
  }
};

// DELETE /api/wishlist - Clear entire wishlist (customer protected)
export const clearWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;

    await prisma.wishlistItem.deleteMany({
      where: { customerId },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({ error: 'Erro ao limpar favoritos' });
  }
};

// GET /api/wishlist/count - Get wishlist items count (customer protected)
export const getWishlistCount = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;

    const count = await prisma.wishlistItem.count({
      where: { customerId },
    });

    res.json({ count });
  } catch (error) {
    console.error('Get wishlist count error:', error);
    res.status(500).json({ error: 'Erro ao contar favoritos' });
  }
};
