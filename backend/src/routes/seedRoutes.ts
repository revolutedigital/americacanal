import { Router, Request, Response } from 'express';
import { runSeed } from '../scripts/seed';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Rota temporária para executar seed (REMOVER em produção!)
router.post('/api/seed', async (req: Request, res: Response) => {
  try {
    const action = req.query.action as string;

    if (action === 'restore-original-testimonials') {
      console.log('🔄 Restoring ORIGINAL testimonials from Docker...');

      // Deletar todos os depoimentos atuais
      await prisma.defaultReview.deleteMany({
        where: {
          tenantId: '0fb61585-3cb3-48b3-ae76-0a5358084a8c'
        }
      });

      // Restaurar APENAS os 5 depoimentos originais do Docker
      const originalTestimonials = [
        {
          id: '0c048706-4acf-4b81-8bc0-835e849d5fb4',
          mediaUrl: 'https://backend-production1.up.railway.app/uploads/images/banners/f995cf16-56fe-4a3d-9690-b0dbc4d8c7d8.jpg',
          createdAt: new Date('2025-10-22T16:44:27.051Z'),
        },
        {
          id: '219ac9c0-a057-46fb-8bec-b2e3c963367e',
          mediaUrl: 'https://backend-production1.up.railway.app/uploads/images/banners/360d0152-f865-4ecc-82a0-f64a81044d18.jpg',
          createdAt: new Date('2025-10-22T16:28:50.467Z'),
        },
        {
          id: 'b9e0d691-0659-4696-94b1-e9073b1292c6',
          mediaUrl: 'https://backend-production1.up.railway.app/uploads/images/banners/b05a4c02-4b7e-42c8-b3e0-0b07eb2b05c2.jpg',
          createdAt: new Date('2025-10-22T16:28:39.302Z'),
        },
        {
          id: '570fe3fd-bfa1-4a3e-845a-9abe70649b21',
          mediaUrl: 'https://backend-production1.up.railway.app/uploads/images/banners/12d34f35-c7fa-4477-935b-dcaf05709092.jpg',
          createdAt: new Date('2025-10-22T16:28:28.614Z'),
        },
        {
          id: '5e5bae87-eb3e-4ef6-842b-193c9a7cfbe5',
          mediaUrl: 'https://backend-production1.up.railway.app/uploads/images/banners/ecef7e0e-7ea7-4883-8e64-e7492eef3f2c.jpg',
          createdAt: new Date('2025-10-21T16:56:17.727Z'),
        },
      ];

      for (const testimonial of originalTestimonials) {
        await prisma.defaultReview.create({
          data: {
            id: testimonial.id,
            tenantId: '0fb61585-3cb3-48b3-ae76-0a5358084a8c',
            rating: 5,
            mediaUrl: testimonial.mediaUrl,
            mediaType: 'image',
            isActive: true,
            isFeatured: true,
            showOnHome: true,
            showOnProducts: true,
            order: 0,
            createdAt: testimonial.createdAt,
            updatedAt: new Date(),
          }
        });
      }

      res.json({
        success: true,
        message: 'Restored 5 original testimonials from Docker',
        count: 5,
      });
    } else if (action === 'add-testimonial-images') {
      console.log('🖼️  Adding PRODUCT images to testimonials...');

      // Usar imagens de PRODUTOS (não banners!)
      const availableImages = [
        'https://backend-production1.up.railway.app/uploads/images/products/fc0c9641-97d2-4501-8c1a-506fe0b9c1e5.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/5da654fa-7761-450b-b916-e4b3b8f8d597.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/6bd3b385-3de1-4842-b9d3-df282f6bc227.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/1a516e81-7a29-4908-9d01-3808ee9540c8.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/4435f829-7955-402d-abac-fee182475ed2.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/d7a15ebf-6457-4144-bef2-a4f0a7c67efb.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/fe00e1df-0cd4-4d45-a081-04b6beebcc3c.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/070f73b4-85c6-4c77-a822-5edc052151e0.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/0bc8a731-b2e4-401b-b29f-0ab0ead8e7a2.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/72bb5edf-5075-4606-a1a8-044ebf53675e.jpg',
        'https://backend-production1.up.railway.app/uploads/images/products/fc411061-172b-4cb8-ba42-40e12e0535a4.jpg',
      ];

      // Primeiro, limpar imagens de banner que foram adicionadas incorretamente
      await prisma.$executeRaw`
        UPDATE "DefaultReview"
        SET "mediaUrl" = NULL, "mediaType" = NULL
        WHERE "mediaUrl" LIKE '%/banners/%'
      `;

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
