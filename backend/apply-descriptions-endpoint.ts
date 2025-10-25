import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function applyDescriptions() {
  try {
    console.log('📚 Lendo arquivo SQL...');

    const sqlPath = path.join(__dirname, '..', 'update-product-descriptions-seo.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    const statements = sql
      .split(/(?=UPDATE "Product" SET)/g)
      .filter(s => s.trim().startsWith('UPDATE'))
      .map(s => s.trim());

    console.log(`\n📝 Aplicando ${statements.length} descrições...`);

    let success = 0;
    let errors = 0;

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
        console.error(`❌ Erro:`, error.message.substring(0, 100));
      }
    }

    console.log(`\n✅ Concluído: ${success}/${statements.length}`);
    console.log(`❌ Erros: ${errors}\n`);

    return { success, errors, total: statements.length };
  } finally {
    await prisma.$disconnect();
  }
}

// Se executar diretamente
if (require.main === module) {
  applyDescriptions()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
