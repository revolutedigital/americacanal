import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCategories() {
  const total = await prisma.product.count();
  const withCategory = await prisma.product.count({
    where: { categoryId: { not: null } }
  });
  const withoutCategory = total - withCategory;

  console.log('\n📊 Análise de Categorização:\n');
  console.log(`Total de produtos: ${total}`);
  console.log(`Com categoria: ${withCategory} (${Math.round(withCategory/total*100)}%)`);
  console.log(`SEM categoria: ${withoutCategory} (${Math.round(withoutCategory/total*100)}%)`);

  // Listar categorias
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  console.log('\n📁 Produtos por Categoria:\n');
  categories.forEach(cat => {
    console.log(`- ${cat.name}: ${cat._count.products} produtos`);
  });

  // Listar alguns produtos sem categoria
  const productsNoCategory = await prisma.product.findMany({
    where: { categoryId: null },
    select: { id: true, name: true },
    take: 15
  });

  if (productsNoCategory.length > 0) {
    console.log(`\n❌ Exemplos de produtos SEM categoria (${productsNoCategory.length} de ${withoutCategory}):\n`);
    productsNoCategory.forEach(p => {
      console.log(`- ${p.name}`);
    });
  }

  await prisma.$disconnect();
}

checkCategories()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
