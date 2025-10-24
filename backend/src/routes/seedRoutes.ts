import { Router, Request, Response } from 'express';
import { runSeed } from '../scripts/seed';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Rota temporária para executar seed (REMOVER em produção!)
router.post('/api/seed', async (req: Request, res: Response) => {
  try {
    const action = req.query.action as string;

    if (action === 'fix-images') {
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
