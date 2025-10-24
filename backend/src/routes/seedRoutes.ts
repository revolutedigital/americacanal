import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const router = Router();
const execAsync = promisify(exec);

// Rota temporária para executar seed (REMOVER em produção!)
router.post('/api/seed', async (req: Request, res: Response) => {
  try {
    console.log('🌱 Executing seed...');
    
    const { stdout, stderr } = await execAsync('npm run prisma:seed', {
      cwd: process.cwd()
    });
    
    console.log('Seed output:', stdout);
    if (stderr) console.error('Seed errors:', stderr);
    
    res.json({ 
      success: true, 
      message: 'Seed executed successfully',
      output: stdout
    });
  } catch (error: any) {
    console.error('Seed failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      output: error.stdout,
      stderr: error.stderr
    });
  }
});

export default router;
