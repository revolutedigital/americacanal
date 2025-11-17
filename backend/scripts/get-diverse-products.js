const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getDiverseProducts() {
  console.log('🔍 Buscando produtos diversos para blog posts...\n');

  // Buscar produtos variados com imagens
  const allProducts = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true
    },
    take: 50,
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Filtrar apenas produtos com imagens
  const products = allProducts.filter(p => p.imageUrl !== null && p.imageUrl !== '');

  console.log(`Total de produtos encontrados: ${products.length}\n`);

  products.forEach((p, index) => {
    console.log(`${index + 1}. ${p.name}`);
    console.log(`   ID: ${p.id}`);
    console.log(`   Imagem: ${p.imageUrl}`);
    console.log();
  });

  await prisma.$disconnect();
}

getDiverseProducts().catch(console.error);
