import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/products/:productId/reviews - Get product reviews (public)
export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { approved } = req.query;

    const reviews = await prisma.review.findMany({
      where: {
        productId,
        ...(approved === 'true' && { isApproved: true }),
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { isVerified: 'desc' }, // Verified purchases first
        { helpful: 'desc' }, // Most helpful first
        { createdAt: 'desc' }, // Most recent first
      ],
    });

    res.json(reviews);
  } catch (error) {
    console.error('Get product reviews error:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
};

// GET /api/reviews/stats/:productId - Get review statistics
export const getReviewStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    const reviews = await prisma.review.findMany({
      where: {
        productId,
        isApproved: true,
      },
      select: {
        rating: true,
      },
    });

    if (reviews.length === 0) {
      res.json({
        averageRating: 0,
        totalReviews: 0,
        distribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      });
      return;
    }

    // Calculate average
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    // Calculate distribution
    const distribution = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    res.json({
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: reviews.length,
      distribution,
    });
  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};

// POST /api/reviews - Create review (customer protected)
export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;
    const { productId, rating, title, comment } = req.body;

    // Validation
    if (!productId || !rating || !comment) {
      res.status(400).json({ error: 'productId, rating e comment são obrigatórios' });
      return;
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({ error: 'Rating deve estar entre 1 e 5' });
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

    // Check if customer already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        customerId,
      },
    });

    if (existingReview) {
      res.status(400).json({ error: 'Você já avaliou este produto' });
      return;
    }

    // Check if customer purchased this product (for verified badge)
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          customerId,
          status: {
            in: ['delivered', 'confirmed'],
          },
        },
      },
    });

    const review = await prisma.review.create({
      data: {
        productId,
        customerId,
        rating,
        title,
        comment,
        isVerified: !!hasPurchased,
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
};

// PUT /api/reviews/:id - Update review (customer protected)
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;
    const { id } = req.params;
    const { rating, title, comment } = req.body;

    // Check if review exists and belongs to customer
    const existingReview = await prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      res.status(404).json({ error: 'Avaliação não encontrada' });
      return;
    }

    if (existingReview.customerId !== customerId) {
      res.status(403).json({ error: 'Não autorizado' });
      return;
    }

    const review = await prisma.review.update({
      where: { id },
      data: {
        ...(rating !== undefined && { rating }),
        ...(title !== undefined && { title }),
        ...(comment !== undefined && { comment }),
        isApproved: false, // Require re-approval after edit
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
    });

    res.json(review);
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ error: 'Erro ao atualizar avaliação' });
  }
};

// DELETE /api/reviews/:id - Delete review (customer protected)
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore - customerId is set by auth middleware
    const customerId = req.customerId;
    const { id } = req.params;

    // Check if review exists and belongs to customer
    const existingReview = await prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      res.status(404).json({ error: 'Avaliação não encontrada' });
      return;
    }

    if (existingReview.customerId !== customerId) {
      res.status(403).json({ error: 'Não autorizado' });
      return;
    }

    await prisma.review.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Erro ao deletar avaliação' });
  }
};

// PUT /api/reviews/:id/approve - Approve review (admin protected)
export const approveReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const review = await prisma.review.update({
      where: { id },
      data: { isApproved: true },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    res.json(review);
  } catch (error) {
    console.error('Approve review error:', error);
    res.status(500).json({ error: 'Erro ao aprovar avaliação' });
  }
};

// PUT /api/reviews/:id/reject - Reject review (admin protected)
export const rejectReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const review = await prisma.review.update({
      where: { id },
      data: { isApproved: false },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    res.json(review);
  } catch (error) {
    console.error('Reject review error:', error);
    res.status(500).json({ error: 'Erro ao rejeitar avaliação' });
  }
};

// GET /api/reviews/admin - Get all reviews for moderation (admin protected)
export const getAllReviewsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId, approved } = req.query;

    const reviews = await prisma.review.findMany({
      where: {
        product: {
          tenantId: tenantId as string,
        },
        ...(approved !== undefined && {
          isApproved: approved === 'true',
        }),
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            name: true,
            slug: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(reviews);
  } catch (error) {
    console.error('Get all reviews admin error:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
};

// POST /api/reviews/:id/helpful - Mark review as helpful
export const markReviewHelpful = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const review = await prisma.review.update({
      where: { id },
      data: {
        helpful: {
          increment: 1,
        },
      },
    });

    res.json({ helpful: review.helpful });
  } catch (error) {
    console.error('Mark review helpful error:', error);
    res.status(500).json({ error: 'Erro ao marcar como útil' });
  }
};
