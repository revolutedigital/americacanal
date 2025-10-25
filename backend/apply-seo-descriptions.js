const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function applySQL() {
  try {
    console.log('📚 Lendo arquivo SQL...');
    const sql = fs.readFileSync(
      path.join(__dirname, 'update-product-descriptions-seo.sql'),
      'utf8'
    );

    // Split into individual UPDATE statements
    const statements = sql
      .split(/(?=UPDATE "Product" SET)/g)
      .filter(s => s.trim().startsWith('UPDATE'))
      .map(s => s.trim());

    console.log(`\n📝 Encontrados ${statements.length} produtos para atualizar\n`);

    let success = 0;
    let errors = 0;

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (!stmt) continue;

      try {
        await prisma.$executeRawUnsafe(stmt);
        success++;
        if (success % 10 === 0) {
          console.log(`✅ ${success}/${statements.length} produtos atualizados...`);
        }
      } catch (error) {
        errors++;
        const productIdMatch = stmt.match(/WHERE id = '([^']+)'/);
        const productId = productIdMatch ? productIdMatch[1] : 'desconhecido';
        console.error(`❌ Erro no produto ${productId}:`, error.message.substring(0, 100));
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ ATUALIZAÇÃO CONCLUÍDA!`);
    console.log(`${'='.repeat(60)}`);
    console.log(`✅ Sucessos: ${success}/${statements.length}`);
    console.log(`❌ Erros: ${errors}`);
    console.log(`📊 Taxa de sucesso: ${((success/statements.length) * 100).toFixed(1)}%`);
    console.log(`${'='.repeat(60)}\n`);

  } catch (error) {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

applySQL();
