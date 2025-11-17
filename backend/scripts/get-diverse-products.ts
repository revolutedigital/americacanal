import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getDiverseProducts() {
  console.log('🔍 Buscando produtos diversos para blog posts...\n');

  // Buscar produtos variados com imagens
  const products = await prisma.product.findMany({
    where: {
      imageUrl: { not: { equals: null } }
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      categoryId: true
    },
    take: 30,
    orderBy: {
      createdAt: 'desc'
    }
  });

  console.log(`Total de produtos encontrados: ${products.length}\n`);

  products.forEach((p, index) => {
    console.log(`${index + 1}. ${p.name}`);
    console.log(`   Categoria ID: ${p.categoryId || 'N/A'}`);
    console.log(`   ID: ${p.id}`);
    console.log(`   Imagem: ${p.imageUrl}`);
    console.log();
  });

  await prisma.$disconnect();
}

getDiverseProducts().catch(console.error);
