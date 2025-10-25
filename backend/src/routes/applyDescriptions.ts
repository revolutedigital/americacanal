import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const router = Router();
const prisma = new PrismaClient();

router.post('/api/admin/apply-descriptions', async (req: Request, res: Response) => {
  try {
    console.log('📚 Aplicando descrições SEO...');

    const sqlPath = path.join(__dirname, '../../update-product-descriptions-seo.sql');

    if (!fs.existsSync(sqlPath)) {
      return res.status(404).json({ error: 'Arquivo SQL não encontrado' });
    }

    const sql = fs.readFileSync(sqlPath, 'utf8');

    const statements = sql
      .split(/(?=UPDATE "Product" SET)/g)
      .filter(s => s.trim().startsWith('UPDATE'))
      .map(s => s.trim());

    console.log(`\n📝 Aplicando ${statements.length} descrições...`);

    let success = 0;
    let errors = 0;
    const errorDetails: string[] = [];

    for (const stmt of statements) {
      if (!stmt) continue;

      try {
        await prisma.$executeRawUnsafe(stmt);
        success++;
        if (success % 10 === 0) {
          console.log(`✅ ${success}/${statements.length}...`);
        }
      } catch (error: any) {
        errors++;
        const productIdMatch = stmt.match(/WHERE id = '([^']+)'/);
        const productId = productIdMatch ? productIdMatch[1] : 'desconhecido';
        errorDetails.push(`${productId}: ${error.message.substring(0, 100)}`);
      }
    }

    console.log(`\n✅ Concluído: ${success}/${statements.length}`);
    console.log(`❌ Erros: ${errors}\n`);

    res.json({
      success,
      errors,
      total: statements.length,
      successRate: ((success / statements.length) * 100).toFixed(1) + '%',
      errorDetails: errorDetails.slice(0, 10) // primeiros 10 erros
    });
  } catch (error: any) {
    console.error('Erro fatal:', error);
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
