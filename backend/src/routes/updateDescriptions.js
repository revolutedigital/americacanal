const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const router = Router();
const prisma = new PrismaClient();

router.post('/api/admin/update-descriptions', async (req, res) => {
  try {
    console.log('📚 [UPDATE DESCRIPTIONS] Iniciando...');

    const sqlPath = path.join(__dirname, '../../update-product-descriptions-seo.sql');

    if (!fs.existsSync(sqlPath)) {
      console.log('❌ Arquivo SQL não encontrado:', sqlPath);
      return res.status(404).json({ error: 'Arquivo SQL não encontrado', path: sqlPath });
    }

    const sql = fs.readFileSync(sqlPath, 'utf8');
    const statements = sql
      .split(/(?=UPDATE "Product" SET)/g)
      .filter(s => s.trim().startsWith('UPDATE'))
      .map(s => s.trim());

    console.log(`📝 [UPDATE DESCRIPTIONS] ${statements.length} produtos para atualizar`);

    let success = 0;
    let errors = 0;
    const errorDetails = [];

    for (const stmt of statements) {
      if (!stmt) continue;

      try {
        await prisma.$executeRawUnsafe(stmt);
        success++;
        if (success % 10 === 0) {
          console.log(`✅ [UPDATE DESCRIPTIONS] ${success}/${statements.length}...`);
        }
      } catch (error) {
        errors++;
        const productIdMatch = stmt.match(/WHERE id = '([^']+)'/);
        const productId = productIdMatch ? productIdMatch[1] : 'desconhecido';
        errorDetails.push(`${productId}: ${error.message.substring(0, 100)}`);
        console.error(`❌ [UPDATE DESCRIPTIONS] Erro em ${productId}:`, error.message.substring(0, 100));
      }
    }

    const result = {
      success,
      errors,
      total: statements.length,
      successRate: ((success / statements.length) * 100).toFixed(1) + '%',
      errorDetails: errorDetails.slice(0, 10)
    };

    console.log(`\n✅ [UPDATE DESCRIPTIONS] Concluído: ${success}/${statements.length} (${result.successRate})`);
    console.log(`❌ [UPDATE DESCRIPTIONS] Erros: ${errors}\n`);

    res.json(result);
  } catch (error) {
    console.error('❌ [UPDATE DESCRIPTIONS] Erro fatal:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
