import { Router, Request, Response } from 'express';
import { runSeed } from '../scripts/seed';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Rota temporária para executar seed (REMOVER em produção!)
router.post('/api/seed', async (req: Request, res: Response) => {
  try {
    const action = req.query.action as string;

    if (action === 'add-testimonial-images') {
      console.log('🖼️  Adding images to testimonials...');

      const availableImages = [
        'https://backend-production1.up.railway.app/uploads/images/banners/0cbc4bef-7b6d-4c4f-b3fb-afffa8f77600.jpg',
        'https://backend-production1.up.railway.app/uploads/images/banners/12d34f35-c7fa-4477-935b-dcaf05709092.jpg',
        'https://backend-production1.up.railway.app/uploads/images/banners/1940d3cc-5e12-4f14-86b8-50b89ec1405d.jpg',
        'https://backend-production1.up.railway.app/uploads/images/banners/360d0152-f865-4ecc-82a0-f64a81044d18.jpg',
        'https://backend-production1.up.railway.app/uploads/images/banners/83dd452f-de23-4340-8c31-217953593481.jpg',
        'https://backend-production1.up.railway.app/uploads/images/banners/b05a4c02-4b7e-42c8-b3e0-0b07eb2b05c2.jpg',
        'https://backend-production1.up.railway.app/uploads/images/banners/ba8dec1d-bafd-475e-8d16-9866d40221a0.jpg',
        'https://backend-production1.up.railway.app/uploads/images/banners/dbe83c55-d8ed-4c50-806f-94f6c9a384be.jpg',
        'https://backend-production1.up.railway.app/uploads/images/banners/f7f2ca5f-028f-4d56-b8f9-a15ba49fedc7.jpg',
      ];

      const reviewsWithoutMedia = await prisma.defaultReview.findMany({
        where: {
          mediaUrl: null,
          showOnHome: true,
        },
        take: 9,
      });

      let updated = 0;
      for (let i = 0; i < reviewsWithoutMedia.length && i < availableImages.length; i++) {
        const review = reviewsWithoutMedia[i];
        const imageUrl = availableImages[i];

        await prisma.defaultReview.update({
          where: { id: review.id },
          data: {
            mediaUrl: imageUrl,
            mediaType: 'image',
          },
        });
        updated++;
      }

      res.json({
        success: true,
        message: `Added images to ${updated} testimonials`,
        updated,
      });
    } else if (action === 'fix-images') {
      console.log('🔄 Fixing image URLs...');

      const OLD_URL = 'http://localhost:4000';
      const NEW_URL = 'https://backend-production1.up.railway.app';

      // Update Product imageUrl
      await prisma.$executeRaw`
        UPDATE "Product"
        SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL})
        WHERE "imageUrl" LIKE '%localhost%'
      `;

      // Update Product images array
      await prisma.$executeRaw`
        UPDATE "Product"
        SET images = ARRAY(
          SELECT REPLACE(unnest(images)::text, ${OLD_URL}, ${NEW_URL})
        )
        WHERE images::text LIKE '%localhost%'
      `;

      // Update Banner imageUrl
      await prisma.$executeRaw`
        UPDATE "Banner"
        SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL})
        WHERE "imageUrl" LIKE '%localhost%'
      `;

      // Update Banner imageMobile
      await prisma.$executeRaw`
        UPDATE "Banner"
        SET "imageMobile" = REPLACE("imageMobile", ${OLD_URL}, ${NEW_URL})
        WHERE "imageMobile" LIKE '%localhost%'
      `;

      // Update DefaultReview mediaUrl
      await prisma.$executeRaw`
        UPDATE "DefaultReview"
        SET "mediaUrl" = REPLACE("mediaUrl", ${OLD_URL}, ${NEW_URL})
        WHERE "mediaUrl" LIKE '%localhost%'
      `;

      // Update Brand imageUrl
      await prisma.$executeRaw`
        UPDATE "Brand"
        SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL})
        WHERE "imageUrl" LIKE '%localhost%'
      `;

      // Update Category imageUrl
      await prisma.$executeRaw`
        UPDATE "Category"
        SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL})
        WHERE "imageUrl" LIKE '%localhost%'
      `;

      res.json({
        success: true,
        message: 'Image URLs fixed successfully',
        oldUrl: OLD_URL,
        newUrl: NEW_URL
      });
    } else {
      console.log('🌱 Executing seed...');
      const result = await runSeed();

      res.json({
        success: true,
        message: 'Seed executed successfully',
        data: result
      });
    }
  } catch (error: any) {
    console.error('Operation failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

export default router;
