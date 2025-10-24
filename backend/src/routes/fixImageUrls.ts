import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Temporary endpoint to fix image URLs from localhost to production
router.post('/api/fix-image-urls', async (req: Request, res: Response) => {
  try {
    console.log('🔄 Starting image URL migration...');

    const OLD_URL = 'http://localhost:4000';
    const NEW_URL = 'https://backend-production1.up.railway.app';

    let updated = {
      products: 0,
      banners: 0,
      defaultReviews: 0,
      brands: 0,
      categories: 0,
    };

    // 1. Update Products
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { imageUrl: { contains: 'localhost' } },
          { images: { hasSome: [OLD_URL] } }
        ]
      }
    });

    for (const product of products) {
      const newImageUrl = product.imageUrl?.replace(OLD_URL, NEW_URL);
      const newImages = product.images.map((img: string) => img.replace(OLD_URL, NEW_URL));

      await prisma.product.update({
        where: { id: product.id },
        data: {
          imageUrl: newImageUrl,
          images: newImages,
        }
      });
      updated.products++;
    }

    // 2. Update Banners
    const banners = await prisma.banner.findMany({
      where: {
        OR: [
          { imageUrl: { contains: 'localhost' } },
          { imageMobile: { contains: 'localhost' } }
        ]
      }
    });

    for (const banner of banners) {
      await prisma.banner.update({
        where: { id: banner.id },
        data: {
          imageUrl: banner.imageUrl?.replace(OLD_URL, NEW_URL),
          imageMobile: banner.imageMobile?.replace(OLD_URL, NEW_URL),
        }
      });
      updated.banners++;
    }

    // 3. Update Default Reviews (Testimonials)
    const defaultReviews = await prisma.defaultReview.findMany({
      where: {
        mediaUrl: { contains: 'localhost' }
      }
    });

    for (const review of defaultReviews) {
      await prisma.defaultReview.update({
        where: { id: review.id },
        data: {
          mediaUrl: review.mediaUrl?.replace(OLD_URL, NEW_URL),
        }
      });
      updated.defaultReviews++;
    }

    // 4. Update Brands
    const brands = await prisma.brand.findMany({
      where: {
        imageUrl: { contains: 'localhost' }
      }
    });

    for (const brand of brands) {
      await prisma.brand.update({
        where: { id: brand.id },
        data: {
          imageUrl: brand.imageUrl?.replace(OLD_URL, NEW_URL),
        }
      });
      updated.brands++;
    }

    // 5. Update Categories
    const categories = await prisma.category.findMany({
      where: {
        imageUrl: { contains: 'localhost' }
      }
    });

    for (const category of categories) {
      await prisma.category.update({
        where: { id: category.id },
        data: {
          imageUrl: category.imageUrl?.replace(OLD_URL, NEW_URL),
        }
      });
      updated.categories++;
    }

    console.log('✅ Image URL migration completed!', updated);

    res.json({
      success: true,
      message: 'Image URLs updated successfully',
      updated,
      oldUrl: OLD_URL,
      newUrl: NEW_URL,
    });
  } catch (error: any) {
    console.error('❌ Image URL migration error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
