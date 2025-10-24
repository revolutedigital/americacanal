import { Router, Request, Response } from 'express';
import { runSeed } from '../scripts/seed';

const router = Router();

// Rota temporária para executar seed (REMOVER em produção!)
router.post('/api/seed', async (req: Request, res: Response) => {
  try {
    console.log('🌱 Executing seed...');

    const result = await runSeed();

    res.json({
      success: true,
      message: 'Seed executed successfully',
      data: result
    });
  } catch (error: any) {
    console.error('Seed failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

export default router;
