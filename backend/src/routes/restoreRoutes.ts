import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const router = Router();
const prisma = new PrismaClient();

// Rota TEMPORÁRIA para restaurar banco (REMOVER após uso!)
router.post('/api/restore-db', async (req: Request, res: Response) => {
  try {
    const clean = req.query.clean === 'true';

    if (clean) {
      console.log('🗑️  CLEANING ALL EXISTING DATA...');

      const tenantId = '0fb61585-3cb3-48b3-ae76-0a5358084a8c';

      // Deletar TODOS os dados do tenant (respeitando ordem de foreign keys)
      await prisma.orderItem.deleteMany({ where: { order: { tenantId } } });
      await prisma.order.deleteMany({ where: { tenantId } });
      await prisma.review.deleteMany({ where: { product: { tenantId } } });
      // await prisma.wishlist.deleteMany({ where: { customer: { tenantId } } }); // Modelo não existe no schema
      await prisma.customer.deleteMany({ where: { tenantId } });
      await prisma.coupon.deleteMany({ where: { tenantId } });
      await prisma.defaultReview.deleteMany({ where: { tenantId } });
      // await prisma.benefit.deleteMany({ where: { tenantId } }); // Modelo não existe no schema
      // await prisma.manualSale.deleteMany({ where: { tenantId } }); // Modelo não existe no schema
      await prisma.banner.deleteMany({ where: { tenantId } });
      await prisma.product.deleteMany({ where: { tenantId } });
      await prisma.category.deleteMany({ where: { tenantId } });
      await prisma.brand.deleteMany({ where: { tenantId } });
      await prisma.tenantConfig.deleteMany({ where: { tenantId } });

      console.log('✅ All existing data deleted!');
    }

    console.log('🔄 Starting database restore from Docker dump...');

    // Ler o arquivo SQL
    const dumpPath = path.join(__dirname, '../../dump.sql');

    if (!fs.existsSync(dumpPath)) {
      return res.status(404).json({
        success: false,
        error: 'Dump file not found at: ' + dumpPath
      });
    }

    const sqlContent = fs.readFileSync(dumpPath, 'utf-8');
    console.log(`📄 SQL file size: ${(sqlContent.length / 1024).toFixed(2)} KB`);

    // Filtrar e limpar o SQL - remover comandos especiais do psql
    const lines = sqlContent.split('\n');
    const cleanLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed &&
             !trimmed.startsWith('--') &&
             !trimmed.startsWith('\\') &&
             !trimmed.startsWith('SET ') &&
             !trimmed.startsWith('SELECT pg_catalog');
    });

    const cleanSql = cleanLines.join('\n');

    console.log('🗑️  Cleaned SQL, splitting into statements...');

    // Dividir em statements individuais (separados por ;)
    const statements = cleanSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // Executar statement por statement
    let executed = 0;
    for (const statement of statements) {
      try {
        await prisma.$executeRawUnsafe(statement);
        executed++;
        if (executed % 50 === 0) {
          console.log(`  ✓ Executed ${executed}/${statements.length} statements`);
        }
      } catch (error: any) {
        console.warn(`  ⚠️  Skipped statement (likely already exists): ${statement.substring(0, 100)}...`);
      }
    }

    console.log(`✅ Database restored! Executed ${executed}/${statements.length} statements successfully`);

    // Fix image URLs from localhost to Railway
    console.log('🔧 Fixing image URLs from localhost to Railway...');
    const OLD_URL = 'http://localhost:4000';
    const NEW_URL = 'https://backend-production1.up.railway.app';

    await prisma.$executeRaw`UPDATE "Product" SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL}) WHERE "imageUrl" LIKE '%localhost%'`;
    await prisma.$executeRaw`UPDATE "Product" SET images = ARRAY(SELECT REPLACE(unnest(images)::text, ${OLD_URL}, ${NEW_URL})) WHERE images::text LIKE '%localhost%'`;
    await prisma.$executeRaw`UPDATE "Banner" SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL}) WHERE "imageUrl" LIKE '%localhost%'`;
    await prisma.$executeRaw`UPDATE "Banner" SET "imageMobile" = REPLACE("imageMobile", ${OLD_URL}, ${NEW_URL}) WHERE "imageMobile" LIKE '%localhost%'`;
    await prisma.$executeRaw`UPDATE "DefaultReview" SET "mediaUrl" = REPLACE("mediaUrl", ${OLD_URL}, ${NEW_URL}) WHERE "mediaUrl" LIKE '%localhost%'`;
    await prisma.$executeRaw`UPDATE "Brand" SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL}) WHERE "imageUrl" LIKE '%localhost%'`;
    await prisma.$executeRaw`UPDATE "Category" SET "imageUrl" = REPLACE("imageUrl", ${OLD_URL}, ${NEW_URL}) WHERE "imageUrl" LIKE '%localhost%'`;

    console.log('✅ Image URLs fixed!');

    res.json({
      success: true,
      message: clean ? 'Database cleaned and fully restored from Docker' : 'Database restored from Docker dump',
      originalSize: `${(sqlContent.length / 1024).toFixed(2)} KB`,
      cleanedSize: `${(cleanSql.length / 1024).toFixed(2)} KB`,
      statementsTotal: statements.length,
      statementsExecuted: executed,
      cleaned: clean,
      imageUrlsFixed: true
    });
  } catch (error: any) {
    console.error('❌ Restore failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString().substring(0, 500)
    });
  }
});

export default router;
