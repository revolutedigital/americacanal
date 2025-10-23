import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ProductCreateRequest, ProductUpdateRequest } from '../types';

const prisma = new PrismaClient();

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// GET /api/products - List active products (public)
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId, categoryId, brandId, type, featured, search, limit } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const products = await prisma.product.findMany({
      where: {
        tenantId: tenantId as string,
        isActive: true,
        ...(categoryId && { categoryId: categoryId as string }),
        ...(brandId && { brandId: brandId as string }),
        ...(type && { type: type as any }),
        ...(featured === 'true' && { isFeatured: true }),
        ...(search && {
          OR: [
            { name: { contains: search as string, mode: 'insensitive' } },
            { description: { contains: search as string, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            reviews: {
              where: { isApproved: true },
            },
          },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' },
      ],
      ...(limit && { take: parseInt(limit as string) }),
    });

    res.json(products);
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// GET /api/products/admin - List ALL products (admin)
export const getAllProductsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const products = await prisma.product.findMany({
      where: {
        tenantId: tenantId as string,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            variants: true,
            reviews: true,
            orderItems: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    console.error('Get all products admin error:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// GET /api/products/:id - Get product by ID (public)
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { incrementView } = req.query;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        variants: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        faqs: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        reviews: {
          where: { isApproved: true },
          include: {
            customer: {
              select: {
                name: true,
              },
            },
          },
          orderBy: [
            { isVerified: 'desc' },
            { helpful: 'desc' },
            { createdAt: 'desc' },
          ],
          take: 10,
        },
        relatedTo: {
          include: {
            to: {
              include: {
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
          take: 4,
        },
      },
    });

    if (!product) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }

    // Increment view count if requested
    if (incrementView === 'true') {
      await prisma.product.update({
        where: { id },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product by id error:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// GET /api/products/slug/:slug - Get product by slug (public)
export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { tenantId } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const product = await prisma.product.findUnique({
      where: {
        tenantId_slug: {
          tenantId: tenantId as string,
          slug,
        },
      },
      include: {
        category: true,
        variants: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        faqs: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        reviews: {
          where: { isApproved: true },
          include: {
            customer: {
              select: {
                name: true,
              },
            },
          },
          orderBy: [
            { isVerified: 'desc' },
            { helpful: 'desc' },
            { createdAt: 'desc' },
          ],
          take: 10,
        },
        relatedTo: {
          include: {
            to: {
              include: {
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
          take: 4,
        },
      },
    });

    if (!product) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }

    // Increment view count
    await prisma.product.update({
      where: { id: product.id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Get product by slug error:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// POST /api/products - Create product (admin protected)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      tenantId,
      categoryId,
      name,
      description,
      shortDesc,
      price,
      comparePrice,
      cost,
      imageUrl,
      images,
      stock,
      sku,
      trackStock,
      lowStockAlert,
      isFeatured,
      metaTitle,
      metaDescription,
      metaKeywords,
      tags, // Array of tag IDs
      faqs, // Array of FAQ objects
      relatedProductIds, // Array of product IDs
    } = req.body;

    // Validation
    if (!tenantId || !name || !description || !price || !imageUrl) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    const slug = generateSlug(name);

    // Check if slug already exists
    const existing = await prisma.product.findUnique({
      where: {
        tenantId_slug: {
          tenantId,
          slug,
        },
      },
    });

    if (existing) {
      res.status(400).json({ error: 'Produto com este nome já existe' });
      return;
    }

    const product = await prisma.product.create({
      data: {
        tenantId,
        categoryId: categoryId || null,
        name,
        slug,
        description,
        shortDesc,
        price,
        comparePrice,
        cost,
        imageUrl,
        images: images || [],
        stock: stock || 0,
        sku,
        trackStock: trackStock !== undefined ? trackStock : true,
        lowStockAlert: lowStockAlert || 5,
        isFeatured: isFeatured || false,
        metaTitle,
        metaDescription,
        metaKeywords,
        ...(tags && tags.length > 0 && {
          tags: {
            create: tags.map((tagId: string) => ({
              tagId,
            })),
          },
        }),
        ...(faqs && faqs.length > 0 && {
          faqs: {
            create: faqs.map((faq: any, index: number) => ({
              question: faq.question,
              answer: faq.answer,
              isActive: faq.isActive !== undefined ? faq.isActive : true,
              order: faq.order !== undefined ? faq.order : index,
            })),
          },
        }),
        ...(relatedProductIds && relatedProductIds.length > 0 && {
          relatedTo: {
            create: relatedProductIds.map((toId: string, index: number) => ({
              toId,
              type: 'RELATED',
              order: index,
            })),
          },
        }),
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        faqs: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// PUT /api/products/:id - Update product (admin protected)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      categoryId,
      name,
      description,
      shortDesc,
      price,
      comparePrice,
      cost,
      imageUrl,
      images,
      stock,
      sku,
      trackStock,
      lowStockAlert,
      isActive,
      isFeatured,
      metaTitle,
      metaDescription,
      metaKeywords,
      faqs,
      relatedProductIds,
    } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }

    const updateData: any = {
      ...(categoryId !== undefined && { categoryId: categoryId || null }),
      ...(description && { description }),
      ...(shortDesc !== undefined && { shortDesc }),
      ...(price !== undefined && { price }),
      ...(comparePrice !== undefined && { comparePrice }),
      ...(cost !== undefined && { cost }),
      ...(imageUrl && { imageUrl }),
      ...(images !== undefined && { images }),
      ...(stock !== undefined && { stock }),
      ...(sku !== undefined && { sku }),
      ...(trackStock !== undefined && { trackStock }),
      ...(lowStockAlert !== undefined && { lowStockAlert }),
      ...(isActive !== undefined && { isActive }),
      ...(isFeatured !== undefined && { isFeatured }),
      ...(metaTitle !== undefined && { metaTitle }),
      ...(metaDescription !== undefined && { metaDescription }),
      ...(metaKeywords !== undefined && { metaKeywords }),
    };

    // If name changes, regenerate slug
    if (name && name !== existingProduct.name) {
      const slug = generateSlug(name);

      // Check if new slug already exists
      const slugExists = await prisma.product.findUnique({
        where: {
          tenantId_slug: {
            tenantId: existingProduct.tenantId,
            slug,
          },
        },
      });

      if (slugExists && slugExists.id !== id) {
        res.status(400).json({ error: 'Produto com este nome já existe' });
        return;
      }

      updateData.name = name;
      updateData.slug = slug;
    }

    // Handle FAQs update
    if (faqs !== undefined) {
      // Delete existing FAQs
      await prisma.productFAQ.deleteMany({
        where: { productId: id },
      });

      // Create new FAQs
      if (faqs.length > 0) {
        updateData.faqs = {
          create: faqs.map((faq: any, index: number) => ({
            question: faq.question,
            answer: faq.answer,
            isActive: faq.isActive !== undefined ? faq.isActive : true,
            order: faq.order !== undefined ? faq.order : index,
          })),
        };
      }
    }

    // Handle related products update
    if (relatedProductIds !== undefined) {
      // Delete existing relations
      await prisma.productRelation.deleteMany({
        where: { fromId: id },
      });

      // Create new relations
      if (relatedProductIds.length > 0) {
        updateData.relatedTo = {
          create: relatedProductIds.map((toId: string, index: number) => ({
            toId,
            type: 'RELATED',
            order: index,
          })),
        };
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        faqs: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

// DELETE /api/products/:id - Delete product (admin protected)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    if (!existingProduct) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }

    // Don't allow deletion if product has orders
    if (existingProduct._count.orderItems > 0) {
      res.status(400).json({
        error: 'Não é possível deletar produto com pedidos associados. Desative-o em vez disso.',
      });
      return;
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};

// GET /api/products/:id/related - Get related products
export const getRelatedProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const relations = await prisma.productRelation.findMany({
      where: {
        fromId: id,
      },
      include: {
        to: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    res.json(relations.map((r) => ({ ...r.to, relationType: r.type })));
  } catch (error) {
    console.error('Get related products error:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos relacionados' });
  }
};
