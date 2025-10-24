import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const router = Router();
const prisma = new PrismaClient();

// Rota TEMPORÁRIA para restaurar banco (REMOVER após uso!)
router.post('/api/restore-db', async (req: Request, res: Response) => {
  try {
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

    res.json({
      success: true,
      message: 'Database restored from local Docker dump',
      originalSize: `${(sqlContent.length / 1024).toFixed(2)} KB`,
      cleanedSize: `${(cleanSql.length / 1024).toFixed(2)} KB`,
      statementsTotal: statements.length,
      statementsExecuted: executed
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
