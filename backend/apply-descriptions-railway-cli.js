const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function applyDescriptions() {
  try {
    console.log('📚 [RAILWAY CLI] Iniciando aplicação de descrições SEO...');
    console.log('🔗 [RAILWAY CLI] Usando DATABASE_URL do ambiente Railway\n');

    const sqlPath = path.join(__dirname, 'update-product-descriptions-seo.sql');

    if (!fs.existsSync(sqlPath)) {
      console.log('❌ Arquivo SQL não encontrado:', sqlPath);
      process.exit(1);
    }

    const sql = fs.readFileSync(sqlPath, 'utf8');
    const statements = sql
      .split(/(?=UPDATE "Product" SET)/g)
      .filter(s => s.trim().startsWith('UPDATE'))
      .map(s => s.trim());

    console.log(`📝 [RAILWAY CLI] ${statements.length} produtos para atualizar\n`);

    let success = 0;
    let errors = 0;
    const errorDetails = [];

    for (const stmt of statements) {
      if (!stmt) continue;

      try {
        await prisma.$executeRawUnsafe(stmt);
        success++;
        if (success % 10 === 0) {
          console.log(`✅ [RAILWAY CLI] ${success}/${statements.length}...`);
        }
      } catch (error) {
        errors++;
        const productIdMatch = stmt.match(/WHERE id = '([^']+)'/);
        const productId = productIdMatch ? productIdMatch[1] : 'desconhecido';
        errorDetails.push(`${productId}: ${error.message.substring(0, 100)}`);
        console.error(`❌ [RAILWAY CLI] Erro em ${productId}:`, error.message.substring(0, 100));
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ RESULTADO FINAL:');
    console.log('='.repeat(60));
    console.log(`✅ Sucessos: ${success}/${statements.length}`);
    console.log(`❌ Erros: ${errors}`);
    console.log(`📊 Taxa de sucesso: ${((success / statements.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));

    if (errorDetails.length > 0) {
      console.log('\n⚠️  Primeiros 10 erros:');
      errorDetails.slice(0, 10).forEach((err, i) => {
        console.log(`  ${i + 1}. ${err}`);
      });
    }

    process.exit(errors > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ [RAILWAY CLI] Erro fatal:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

applyDescriptions();
