import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getEducationalProducts() {
  console.log('🔍 Buscando produtos para posts educacionais...\n');

  // 1. Produtos de CBD/Óleo para posts sobre ansiedade, sono, dor
  console.log('📦 CATEGORIA: Óleos de CBD');
  const cbdOils = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: 'CBD', mode: 'insensitive' } },
        { name: { contains: 'óleo', mode: 'insensitive' } },
        { name: { contains: 'oil', mode: 'insensitive' } }
      ],
      imageUrl: { not: null }
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      category: true
    },
    take: 5
  });

  cbdOils.forEach(p => {
    console.log(`- ${p.name}`);
    console.log(`  ID: ${p.id}`);
    console.log(`  Imagem: ${p.imageUrl}`);
    console.log();
  });

  // 2. Flores Cannabis para posts sobre indica/sativa/híbrida
  console.log('\n🌿 CATEGORIA: Flores Cannabis');
  const flowers = await prisma.product.findMany({
    where: {
      OR: [
        { category: { contains: 'flor', mode: 'insensitive' } },
        { category: { contains: 'flower', mode: 'insensitive' } },
        { name: { contains: 'flower', mode: 'insensitive' } }
      ],
      imageUrl: { not: null }
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      category: true
    },
    take: 5
  });

  flowers.forEach(p => {
    console.log(`- ${p.name}`);
    console.log(`  ID: ${p.id}`);
    console.log(`  Imagem: ${p.imageUrl}`);
    console.log();
  });

  // 3. Gummies/Edibles para posts gerais
  console.log('\n🍬 CATEGORIA: Gummies/Edibles');
  const gummies = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: 'gummy', mode: 'insensitive' } },
        { name: { contains: 'goma', mode: 'insensitive' } },
        { category: { contains: 'edible', mode: 'insensitive' } }
      ],
      imageUrl: { not: null }
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      category: true
    },
    take: 5
  });

  gummies.forEach(p => {
    console.log(`- ${p.name}`);
    console.log(`  ID: ${p.id}`);
    console.log(`  Imagem: ${p.imageUrl}`);
    console.log();
  });

  // 4. Vapes para posts sobre terpenos/efeitos
  console.log('\n💨 CATEGORIA: Vapes');
  const vapes = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: 'vape', mode: 'insensitive' } },
        { name: { contains: 'cart', mode: 'insensitive' } },
        { category: { contains: 'vape', mode: 'insensitive' } }
      ],
      imageUrl: { not: null }
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      category: true
    },
    take: 5
  });

  vapes.forEach(p => {
    console.log(`- ${p.name}`);
    console.log(`  ID: ${p.id}`);
    console.log(`  Imagem: ${p.imageUrl}`);
    console.log();
  });

  // 5. Produto popular geral (para posts de guia/lei/etc)
  console.log('\n⭐ CATEGORIA: Produtos Populares');
  const popular = await prisma.product.findMany({
    where: {
      imageUrl: { not: null }
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      category: true
    },
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  popular.forEach(p => {
    console.log(`- ${p.name}`);
    console.log(`  ID: ${p.id}`);
    console.log(`  Imagem: ${p.imageUrl}`);
    console.log();
  });

  await prisma.$disconnect();
}

getEducationalProducts().catch(console.error);
