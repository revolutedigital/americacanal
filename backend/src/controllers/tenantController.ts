import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/tenant/config - Get tenant configuration
export const getTenantConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Get tenantId from authenticated user
    const tenantId = '0fb61585-3cb3-48b3-ae76-0a5358084a8c'; // America Cannabis tenant ID (from Docker)

    const config = await prisma.tenantConfig.findUnique({
      where: { tenantId },
    });

    if (!config) {
      res.status(404).json({ error: 'Configuração não encontrada' });
      return;
    }

    res.json(config);
  } catch (error) {
    console.error('Get tenant config error:', error);
    res.status(500).json({ error: 'Erro ao buscar configuração' });
  }
};

// PUT /api/tenant/config - Update tenant configuration
export const updateTenantConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Get tenantId from authenticated user
    const tenantId = '0fb61585-3cb3-48b3-ae76-0a5358084a8c'; // America Cannabis tenant ID (from Docker)

    const {
      primaryColor,
      secondaryColor,
      accentColor,
      backgroundColor,
      textColor,
      whatsappNumber,
      whatsappMessage,
      shippingPolicy,
      returnPolicy,
      privacyPolicy,
      termsOfService,
      trustBadges,
      socialProofText,
      enableUrgency,
      urgencyThreshold,
      enableViewCount,
      requireApproval,
      allowGuestReviews,
      showRelatedProducts,
      relatedProductsCount,
      enableProductFAQ,
      enableZoom,
    } = req.body;

    // Check if config exists
    const existing = await prisma.tenantConfig.findUnique({
      where: { tenantId },
    });

    if (!existing) {
      res.status(404).json({ error: 'Configuração não encontrada' });
      return;
    }

    const updateData: any = {};

    // Theme colors
    if (primaryColor !== undefined) updateData.primaryColor = primaryColor;
    if (secondaryColor !== undefined) updateData.secondaryColor = secondaryColor;
    if (accentColor !== undefined) updateData.accentColor = accentColor;
    if (backgroundColor !== undefined) updateData.backgroundColor = backgroundColor;
    if (textColor !== undefined) updateData.textColor = textColor;

    // Other settings
    if (whatsappNumber !== undefined) updateData.whatsappNumber = whatsappNumber;
    if (whatsappMessage !== undefined) updateData.whatsappMessage = whatsappMessage;
    if (shippingPolicy !== undefined) updateData.shippingPolicy = shippingPolicy;
    if (returnPolicy !== undefined) updateData.returnPolicy = returnPolicy;
    if (privacyPolicy !== undefined) updateData.privacyPolicy = privacyPolicy;
    if (termsOfService !== undefined) updateData.termsOfService = termsOfService;
    if (trustBadges !== undefined) updateData.trustBadges = trustBadges;
    if (socialProofText !== undefined) updateData.socialProofText = socialProofText;
    if (enableUrgency !== undefined) updateData.enableUrgency = enableUrgency;
    if (urgencyThreshold !== undefined) updateData.urgencyThreshold = urgencyThreshold;
    if (enableViewCount !== undefined) updateData.enableViewCount = enableViewCount;
    if (requireApproval !== undefined) updateData.requireApproval = requireApproval;
    if (allowGuestReviews !== undefined) updateData.allowGuestReviews = allowGuestReviews;
    if (showRelatedProducts !== undefined) updateData.showRelatedProducts = showRelatedProducts;
    if (relatedProductsCount !== undefined) updateData.relatedProductsCount = relatedProductsCount;
    if (enableProductFAQ !== undefined) updateData.enableProductFAQ = enableProductFAQ;
    if (enableZoom !== undefined) updateData.enableZoom = enableZoom;

    const config = await prisma.tenantConfig.update({
      where: { tenantId },
      data: updateData,
    });

    res.json(config);
  } catch (error) {
    console.error('Update tenant config error:', error);
    res.status(500).json({ error: 'Erro ao atualizar configuração' });
  }
};
