import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash da senha do admin
  const hashedPassword = await bcrypt.hash('Admin@2025', 10);

  // Criar usuário admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@americacannabis.com' },
    update: {},
    create: {
      email: 'admin@americacannabis.com',
      password: hashedPassword,
      name: 'Administrador',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Criar alguns produtos de exemplo (apenas se não existirem)
  const existingProducts = await prisma.product.count();

  if (existingProducts === 0) {
    const products = [
      {
        name: 'CBD Oil Premium 30ml',
        description: 'Óleo de CBD premium de alta qualidade, extraído de plantas orgânicas. Ideal para alívio de ansiedade e estresse. Concentração de 10% de CBD.',
        price: 299.90,
        imageUrl: 'https://images.unsplash.com/photo-1608181563277-4c0f1d3f6c7f',
        stock: 15,
        isActive: true,
      },
      {
        name: 'Hemp Flower - Strain Blue Dream',
        description: 'Flor de cânhamo premium, strain Blue Dream. Rico em terpenos naturais e baixo THC. Produto 100% legal e certificado.',
        price: 149.90,
        imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82',
        stock: 0,
        isActive: true,
      },
      {
        name: 'CBD Gummies - Pack 30un',
        description: 'Gomas de CBD saborosas e práticas. Cada goma contém 10mg de CBD. Pack com 30 unidades. Sabor frutas vermelhas.',
        price: 189.90,
        imageUrl: 'https://images.unsplash.com/photo-1582054593b0e-42c1c8b0d1e8',
        stock: 42,
        isActive: true,
      },
      {
        name: 'CBD Cream - Alívio Muscular',
        description: 'Creme tópico de CBD para alívio de dores musculares e articulares. Fórmula com mentol e arnica. Embalagem 100g.',
        price: 129.90,
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108',
        stock: 8,
        isActive: true,
      },
    ];

    await prisma.product.createMany({
      data: products,
    });

    console.log(`✅ ${products.length} products created`);
  } else {
    console.log(`ℹ️ Products already exist, skipping product seed`);
  }
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
