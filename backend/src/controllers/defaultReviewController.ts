import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/default-reviews?tenantId=xxx
export const getAllDefaultReviews = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.query;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId é obrigatório' });
    }

    const reviews = await prisma.defaultReview.findMany({
      where: { tenantId },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching default reviews:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações padrão' });
  }
};

// GET /api/default-reviews/featured?tenantId=xxx
export const getFeaturedDefaultReviews = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.query;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId é obrigatório' });
    }

    const reviews = await prisma.defaultReview.findMany({
      where: {
        tenantId,
        isActive: true,
        isFeatured: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching featured default reviews:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações em destaque' });
  }
};

// POST /api/default-reviews
export const createDefaultReview = async (req: Request, res: Response) => {
  try {
    const {
      tenantId,
      customerName,
      customerPhoto,
      customerCity,
      rating,
      comment,
      mediaUrl,
      mediaType,
      productName,
      usageDuration,
      resultType,
      isActive,
      isFeatured,
      showOnHome,
      showOnProducts,
      order,
    } = req.body;

    // Validações
    if (!tenantId) {
      return res.status(400).json({
        error: 'tenantId é obrigatório',
      });
    }

    // Pelo menos mídia ou comentário deve estar presente
    if (!mediaUrl && !comment) {
      return res.status(400).json({
        error: 'mediaUrl ou comment devem ser fornecidos',
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        error: 'rating deve estar entre 1 e 5',
      });
    }

    const review = await prisma.defaultReview.create({
      data: {
        tenantId,
        customerName: customerName || null,
        customerPhoto: customerPhoto || null,
        customerCity: customerCity || null,
        rating: rating || 5,
        comment: comment || null,
        mediaUrl: mediaUrl || null,
        mediaType: mediaType || null,
        productName: productName || null,
        usageDuration: usageDuration || null,
        resultType: resultType || null,
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
        showOnHome: showOnHome !== undefined ? showOnHome : true,
        showOnProducts: showOnProducts !== undefined ? showOnProducts : true,
        order: order !== undefined ? order : 0,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating default review:', error);
    res.status(500).json({ error: 'Erro ao criar depoimento' });
  }
};

// PUT /api/default-reviews/:id
export const updateDefaultReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      customerName,
      customerPhoto,
      customerCity,
      rating,
      comment,
      mediaUrl,
      mediaType,
      productName,
      usageDuration,
      resultType,
      isActive,
      isFeatured,
      showOnHome,
      showOnProducts,
      order,
    } = req.body;

    // Verificar se existe
    const existing = await prisma.defaultReview.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Depoimento não encontrado' });
    }

    // Validação de rating
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        error: 'rating deve estar entre 1 e 5',
      });
    }

    const review = await prisma.defaultReview.update({
      where: { id },
      data: {
        ...(customerName !== undefined && { customerName }),
        ...(customerPhoto !== undefined && { customerPhoto }),
        ...(customerCity !== undefined && { customerCity }),
        ...(rating !== undefined && { rating }),
        ...(comment !== undefined && { comment }),
        ...(mediaUrl !== undefined && { mediaUrl }),
        ...(mediaType !== undefined && { mediaType }),
        ...(productName !== undefined && { productName }),
        ...(usageDuration !== undefined && { usageDuration }),
        ...(resultType !== undefined && { resultType }),
        ...(isActive !== undefined && { isActive }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(showOnHome !== undefined && { showOnHome }),
        ...(showOnProducts !== undefined && { showOnProducts }),
        ...(order !== undefined && { order }),
      },
    });

    res.json(review);
  } catch (error) {
    console.error('Error updating default review:', error);
    res.status(500).json({ error: 'Erro ao atualizar depoimento' });
  }
};

// DELETE /api/default-reviews/:id
export const deleteDefaultReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar se existe
    const existing = await prisma.defaultReview.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    await prisma.defaultReview.delete({
      where: { id },
    });

    res.json({ message: 'Avaliação excluída com sucesso' });
  } catch (error) {
    console.error('Error deleting default review:', error);
    res.status(500).json({ error: 'Erro ao excluir avaliação padrão' });
  }
};

// PUT /api/default-reviews/:id/toggle-featured
export const toggleFeatured = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.defaultReview.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    const review = await prisma.defaultReview.update({
      where: { id },
      data: {
        isFeatured: !existing.isFeatured,
      },
    });

    res.json(review);
  } catch (error) {
    console.error('Error toggling featured:', error);
    res.status(500).json({ error: 'Erro ao alterar destaque' });
  }
};

// PUT /api/default-reviews/:id/toggle-active
export const toggleActive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.defaultReview.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    const review = await prisma.defaultReview.update({
      where: { id },
      data: {
        isActive: !existing.isActive,
      },
    });

    res.json(review);
  } catch (error) {
    console.error('Error toggling active:', error);
    res.status(500).json({ error: 'Erro ao alterar status' });
  }
};

// PUT /api/default-reviews/reorder
export const reorderDefaultReviews = async (req: Request, res: Response) => {
  try {
    const { reviews } = req.body; // Array de { id, order }

    if (!Array.isArray(reviews)) {
      return res.status(400).json({ error: 'reviews deve ser um array' });
    }

    // Update all reviews in a transaction
    await prisma.$transaction(
      reviews.map((review: { id: string; order: number }) =>
        prisma.defaultReview.update({
          where: { id: review.id },
          data: { order: review.order },
        })
      )
    );

    res.json({ message: 'Ordem atualizada com sucesso' });
  } catch (error) {
    console.error('Error reordering default reviews:', error);
    res.status(500).json({ error: 'Erro ao reordenar avaliações' });
  }
};
