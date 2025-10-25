const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');

const router = Router();
const prisma = new PrismaClient();

// POST /api/admin/bulk-update-descriptions
// Body: { descriptions: [{ id: "uuid", description: "text" }, ...] }
router.post('/api/admin/bulk-update-descriptions', async (req, res) => {
  try {
    const { descriptions } = req.body;

    if (!descriptions || !Array.isArray(descriptions)) {
      return res.status(400).json({
        error: 'Body deve conter array "descriptions" com objetos { id, description }'
      });
    }

    console.log(`📝 [BULK UPDATE] Recebidas ${descriptions.length} descrições para atualizar`);

    let success = 0;
    let errors = 0;
    const errorDetails = [];

    for (const item of descriptions) {
      const { id, description } = item;

      if (!id || !description) {
        errors++;
        errorDetails.push(`Item inválido: ${JSON.stringify(item).substring(0, 100)}`);
        continue;
      }

      try {
        await prisma.product.update({
          where: { id },
          data: { description }
        });
        success++;

        if (success % 10 === 0) {
          console.log(`✅ [BULK UPDATE] ${success}/${descriptions.length}...`);
        }
      } catch (error) {
        errors++;
        errorDetails.push(`${id}: ${error.message.substring(0, 100)}`);
        console.error(`❌ [BULK UPDATE] Erro em ${id}:`, error.message.substring(0, 100));
      }
    }

    const result = {
      success,
      errors,
      total: descriptions.length,
      successRate: ((success / descriptions.length) * 100).toFixed(1) + '%',
      errorDetails: errorDetails.slice(0, 10)
    };

    console.log(`\n✅ [BULK UPDATE] Concluído: ${success}/${descriptions.length} (${result.successRate})`);
    console.log(`❌ [BULK UPDATE] Erros: ${errors}\n`);

    res.json(result);
  } catch (error) {
    console.error('❌ [BULK UPDATE] Erro fatal:', error);
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
