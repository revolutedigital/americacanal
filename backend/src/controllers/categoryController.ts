import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// GET /api/categories - List all active categories (public)
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const categories = await prisma.category.findMany({
      where: {
        tenantId: tenantId as string,
        isActive: true,
      },
      include: {
        parent: true,
        children: {
          where: { isActive: true },
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });

    res.json(categories);
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// GET /api/categories/admin - List ALL categories (admin)
export const getAllCategoriesAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const categories = await prisma.category.findMany({
      where: {
        tenantId: tenantId as string,
      },
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true },
        },
      },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });

    res.json(categories);
  } catch (error) {
    console.error('Get all categories admin error:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// GET /api/categories/:id - Get category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: {
          where: { isActive: true },
        },
        products: {
          where: { isActive: true },
          take: 20,
        },
      },
    });

    if (!category) {
      res.status(404).json({ error: 'Categoria não encontrada' });
      return;
    }

    res.json(category);
  } catch (error) {
    console.error('Get category by id error:', error);
    res.status(500).json({ error: 'Erro ao buscar categoria' });
  }
};

// GET /api/categories/slug/:slug - Get category by slug
export const getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { tenantId } = req.query;

    if (!tenantId) {
      res.status(400).json({ error: 'tenantId é obrigatório' });
      return;
    }

    const category = await prisma.category.findUnique({
      where: {
        tenantId_slug: {
          tenantId: tenantId as string,
          slug,
        },
      },
      include: {
        parent: true,
        children: {
          where: { isActive: true },
        },
        products: {
          where: { isActive: true },
          take: 20,
        },
      },
    });

    if (!category) {
      res.status(404).json({ error: 'Categoria não encontrada' });
      return;
    }

    res.json(category);
  } catch (error) {
    console.error('Get category by slug error:', error);
    res.status(500).json({ error: 'Erro ao buscar categoria' });
  }
};

// POST /api/categories - Create category (protected)
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId, name, description, imageUrl, parentId, order } = req.body;

    if (!tenantId || !name) {
      res.status(400).json({ error: 'tenantId e name são obrigatórios' });
      return;
    }

    const slug = generateSlug(name);

    // Check if slug already exists for this tenant
    const existing = await prisma.category.findUnique({
      where: {
        tenantId_slug: {
          tenantId,
          slug,
        },
      },
    });

    if (existing) {
      res.status(400).json({ error: 'Categoria com este nome já existe' });
      return;
    }

    const category = await prisma.category.create({
      data: {
        tenantId,
        name,
        slug,
        description,
        imageUrl,
        parentId: parentId || null,
        order: order || 0,
      },
      include: {
        parent: true,
        children: true,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
};

// PUT /api/categories/:id - Update category (protected)
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, parentId, isActive, order } = req.body;

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      res.status(404).json({ error: 'Categoria não encontrada' });
      return;
    }

    const updateData: any = {
      ...(description !== undefined && { description }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(parentId !== undefined && { parentId: parentId || null }),
      ...(isActive !== undefined && { isActive }),
      ...(order !== undefined && { order }),
    };

    // If name changes, regenerate slug
    if (name && name !== existingCategory.name) {
      const slug = generateSlug(name);

      // Check if new slug already exists
      const slugExists = await prisma.category.findUnique({
        where: {
          tenantId_slug: {
            tenantId: existingCategory.tenantId,
            slug,
          },
        },
      });

      if (slugExists && slugExists.id !== id) {
        res.status(400).json({ error: 'Categoria com este nome já existe' });
        return;
      }

      updateData.name = name;
      updateData.slug = slug;
    }

    const category = await prisma.category.update({
      where: { id },
      data: updateData,
      include: {
        parent: true,
        children: true,
      },
    });

    res.json(category);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
};

// DELETE /api/categories/:id - Delete category (protected)
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        _count: {
          select: { products: true },
        },
      },
    });

    if (!existingCategory) {
      res.status(404).json({ error: 'Categoria não encontrada' });
      return;
    }

    // Check if has children
    if (existingCategory.children.length > 0) {
      res.status(400).json({ error: 'Não é possível deletar categoria com subcategorias' });
      return;
    }

    // Check if has products
    if (existingCategory._count.products > 0) {
      res.status(400).json({ error: 'Não é possível deletar categoria com produtos associados' });
      return;
    }

    await prisma.category.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
};
