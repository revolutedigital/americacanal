import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function autoCategorizeProducts() {
  console.log('\n🔄 Iniciando categorização automática de produtos...\n');

  // Buscar categorias
  const categories = await prisma.category.findMany();
  console.log('📁 Categorias disponíveis:');
  categories.forEach(cat => {
    console.log(`  - ${cat.name} (ID: ${cat.id})`);
  });

  // Criar mapa de categorias
  const categoryMap: { [key: string]: string } = {};
  categories.forEach(cat => {
    categoryMap[cat.name.toLowerCase()] = cat.id;
  });

  // Buscar produtos sem categoria
  const uncategorizedProducts = await prisma.product.findMany({
    where: { categoryId: null },
    select: {
      id: true,
      name: true,
      description: true,
      price: true
    }
  });

  console.log(`\n📦 Total de produtos sem categoria: ${uncategorizedProducts.length}\n`);

  let categorized = 0;
  let skipped = 0;

  for (const product of uncategorizedProducts) {
    const name = product.name.toLowerCase();
    const description = (product.description || '').toLowerCase();
    let categoryId: string | null = null;

    // Regras de categorização baseadas em padrões
    // 1. Vaporizadores Descartáveis (produtos com ml/g e marcas conhecidas)
    if (
      (name.includes('ml') || name.includes('g') || name.includes('1g') || name.includes('2g') || name.includes('3.5g') || name.includes('5g') || name.includes('7.5g')) &&
      (name.includes('torch') || name.includes('cactus') || name.includes('chapo') || name.includes('jetter') || name.includes('hallu') || name.includes('snoop') || name.includes('delta'))
    ) {
      categoryId = categoryMap['vaporizadores descartáveis'];
    }
    // 2. Vaporizadores Refil (cartuchos, pods)
    else if (
      name.includes('refil') ||
      name.includes('cartucho') ||
      name.includes('pod') ||
      name.includes('cart')
    ) {
      categoryId = categoryMap['vaporizadores refil'];
    }
    // 3. Comestíveis (gummy, edible, chocolate, etc)
    else if (
      name.includes('gummy') ||
      name.includes('gummies') ||
      name.includes('edible') ||
      name.includes('chocolate') ||
      name.includes('cookie') ||
      name.includes('brownie') ||
      description.includes('gummy') ||
      description.includes('comestível')
    ) {
      categoryId = categoryMap['comestíveis (gummy)'];
    }

    if (categoryId) {
      await prisma.product.update({
        where: { id: product.id },
        data: { categoryId }
      });

      const categoryName = Object.keys(categoryMap).find(key => categoryMap[key] === categoryId);
      console.log(`✅ ${product.name} → ${categoryName}`);
      categorized++;
    } else {
      console.log(`⚠️  SKIP: ${product.name}`);
      skipped++;
    }
  }

  console.log('\n📊 Resultado:');
  console.log(`✅ Categorizados: ${categorized}`);
  console.log(`⚠️  Não categorizados: ${skipped}`);

  // Verificar resultado final
  const finalStats = {
    total: await prisma.product.count(),
    withCategory: await prisma.product.count({ where: { categoryId: { not: null } } })
  };

  console.log('\n📈 Estatísticas Finais:');
  console.log(`Total de produtos: ${finalStats.total}`);
  console.log(`Com categoria: ${finalStats.withCategory} (${Math.round(finalStats.withCategory/finalStats.total*100)}%)`);
  console.log(`SEM categoria: ${finalStats.total - finalStats.withCategory} (${Math.round((finalStats.total - finalStats.withCategory)/finalStats.total*100)}%)`);

  await prisma.$disconnect();
}

autoCategorizeProducts()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
