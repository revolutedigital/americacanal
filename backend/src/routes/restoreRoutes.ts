import { Router, Request, Response } from 'express';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

const router = Router();

// Rota TEMPORÁRIA para restaurar banco (REMOVER após uso!)
router.post('/api/restore-db', async (req: Request, res: Response) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔄 Starting database restore...');

    // Conectar ao banco
    await client.connect();

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

    // Executar o SQL completo
    await client.query(sqlContent);

    console.log('✅ Database restored successfully');

    res.json({
      success: true,
      message: 'Database restored from local Docker dump',
      size: `${(sqlContent.length / 1024).toFixed(2)} KB`
    });
  } catch (error: any) {
    console.error('❌ Restore failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    await client.end();
  }
});

export default router;
