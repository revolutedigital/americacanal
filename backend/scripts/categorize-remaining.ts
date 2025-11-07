import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function categorizeRemaining() {
  console.log('\n🔄 Categorizando produtos restantes...\n');

  // Buscar categoria de Vaporizadores Descartáveis
  const vaporizadoresCategory = await prisma.category.findFirst({
    where: { name: { contains: 'Vaporizadores Descartáveis', mode: 'insensitive' } }
  });

  if (!vaporizadoresCategory) {
    console.error('❌ Categoria Vaporizadores Descartáveis não encontrada!');
    process.exit(1);
  }

  console.log(`📁 Usando categoria: ${vaporizadoresCategory.name} (${vaporizadoresCategory.id})\n`);

  // Produtos restantes que são todos vaporizadores
  const remainingProducts = [
    'Stoney Cat Lemon Pez 3.5g',
    'Stoney Cat Blue Dream 3.5g',
    'Pulse Thc Super Lemon Haze -Sat 5g',
    'Pulse Thc Og Mango Kush - Hyb 5g',
    'Pulse Thc Blue Dream - Hyb 5g',
    'Pulse Thc Laughing Gás -Hyb 5g',
    'Stoney Cat Berry Payton 3.5g',
    'Ignite Ind BlueberryKush 7g',
    'Pressure Los Angeles 6g Jelly Doughnuts - Ind',
    'Pulse Thc Ice Cream Cake- Ind 5g'
  ];

  let updated = 0;

  for (const productName of remainingProducts) {
    const product = await prisma.product.findFirst({
      where: {
        name: { contains: productName.substring(0, 20), mode: 'insensitive' },
        categoryId: null
      }
    });

    if (product) {
      await prisma.product.update({
        where: { id: product.id },
        data: { categoryId: vaporizadoresCategory.id }
      });
      console.log(`✅ ${product.name} → Vaporizadores Descartáveis`);
      updated++;
    } else {
      console.log(`⚠️  Produto não encontrado: ${productName}`);
    }
  }

  console.log(`\n📊 Total atualizado: ${updated} produtos`);

  // Verificar resultado final
  const finalStats = {
    total: await prisma.product.count(),
    withCategory: await prisma.product.count({ where: { categoryId: { not: null } } })
  };

  console.log('\n📈 Estatísticas Finais:');
  console.log(`Total de produtos: ${finalStats.total}`);
  console.log(`Com categoria: ${finalStats.withCategory} (${Math.round(finalStats.withCategory/finalStats.total*100)}%)`);
  console.log(`SEM categoria: ${finalStats.total - finalStats.withCategory}`);

  await prisma.$disconnect();
}

categorizeRemaining()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
