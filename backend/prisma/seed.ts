import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Helper function to generate slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('🌱 Starting database seed...');

  // ============================================
  // 1. CREATE TENANT
  // ============================================
  console.log('\n📦 Creating tenant...');

  const tenant = await prisma.tenant.upsert({
    where: { slug: 'americacannabis' },
    update: {},
    create: {
      slug: 'americacannabis',
      name: 'America Cannabis',
      domain: 'localhost:5178',
      isActive: true,
    },
  });

  console.log('✅ Tenant created:', tenant.name);

  // ============================================
  // 2. CREATE TENANT CONFIG
  // ============================================
  console.log('\n⚙️  Creating tenant config...');

  const config = await prisma.tenantConfig.upsert({
    where: { tenantId: tenant.id },
    update: {},
    create: {
      tenantId: tenant.id,
      siteName: 'America Cannabis',
      primaryColor: '#10b981',
      email: 'contato@americacannabis.com',
      phone: '+55 11 99999-9999',
      whatsappNumber: '595982574068',
      metaTitle: 'America Cannabis - Produtos Premium de Cannabis',
      metaDescription: 'Produtos de cannabis premium de alta qualidade. CBD Oil, Hemp Flowers, extratos e muito mais.',
      metaKeywords: 'cannabis, CBD, hemp, óleo CBD, flores hemp',
      enableReviews: true,
      enableWishlist: true,
      enableNewsletter: true,
      enableCoupons: true,
      currency: 'BRL',
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo',
    },
  });

  console.log('✅ Config created');

  // ============================================
  // 3. CREATE ADMIN USER
  // ============================================
  console.log('\n👤 Creating admin user...');

  const hashedPassword = await bcrypt.hash('Admin@2025', 10);

  const admin = await prisma.user.upsert({
    where: {
      tenantId_email: {
        tenantId: tenant.id,
        email: 'admin@americacannabis.com'
      }
    },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'admin@americacannabis.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin',
      isActive: true,
    },
  });

  console.log('✅ Admin created:', admin.email);

  // ============================================
  // 4. CREATE CATEGORIES
  // ============================================
  console.log('\n📁 Creating categories...');

  const categories = [
    {
      name: 'Óleos CBD',
      description: 'Óleos de CBD premium de alta qualidade',
      imageUrl: 'https://images.unsplash.com/photo-1608181563277-4c0f1d3f6c7f',
    },
    {
      name: 'Flores Hemp',
      description: 'Flores de cânhamo secas e curadas',
      imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82',
    },
    {
      name: 'Comestíveis',
      description: 'Gomas, chocolates e outros comestíveis com CBD',
      imageUrl: 'https://images.unsplash.com/photo-1582054593b0e-42c1c8b0d1e8',
    },
    {
      name: 'Tópicos',
      description: 'Cremes, bálsamos e produtos para aplicação tópica',
      imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108',
    },
    {
      name: 'Acessórios',
      description: 'Vaporizadores, grinders e outros acessórios',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
    },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: {
        tenantId_slug: {
          tenantId: tenant.id,
          slug: generateSlug(cat.name),
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        name: cat.name,
        slug: generateSlug(cat.name),
        description: cat.description,
        imageUrl: cat.imageUrl,
        isActive: true,
      },
    });
    createdCategories.push(category);
  }

  console.log(`✅ ${createdCategories.length} categories created`);

  // ============================================
  // 5. CREATE TAGS
  // ============================================
  console.log('\n🏷️  Creating tags...');

  const tagNames = ['Orgânico', 'Premium', 'Best Seller', 'Novo', 'Em Promoção', 'Full Spectrum', 'Isolado'];
  const createdTags = [];

  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { slug: generateSlug(name) },
      update: {},
      create: {
        name,
        slug: generateSlug(name),
      },
    });
    createdTags.push(tag);
  }

  console.log(`✅ ${createdTags.length} tags created`);

  // ============================================
  // 6. CREATE PRODUCTS
  // ============================================
  console.log('\n🛍️  Creating products...');

  const products = [
    {
      name: 'CBD Oil Premium 30ml',
      shortDesc: 'Óleo de CBD de alta concentração',
      description: 'Óleo de CBD premium de alta qualidade, extraído de plantas orgânicas cultivadas nos EUA. Ideal para alívio de ansiedade, estresse e dores crônicas. Concentração de 10% de CBD (1000mg). Testado em laboratório, certificado orgânico USDA. Contém MCT oil como óleo carreador. Sabor natural de menta.',
      price: 299.90,
      comparePrice: 349.90,
      cost: 120.00,
      imageUrl: 'https://images.unsplash.com/photo-1608181563277-4c0f1d3f6c7f',
      images: [
        'https://images.unsplash.com/photo-1608181563277-4c0f1d3f6c7f',
        'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34',
      ],
      stock: 25,
      sku: 'CBD-OIL-1000-30',
      categorySlug: 'oleos-cbd',
      tags: ['Premium', 'Best Seller', 'Orgânico', 'Full Spectrum'],
      isFeatured: true,
      metaTitle: 'CBD Oil Premium 30ml - 1000mg',
      metaDescription: 'Compre óleo de CBD premium com 1000mg. Orgânico, testado em laboratório. Alívio natural para ansiedade e dor.',
    },
    {
      name: 'Hemp Flower - Blue Dream',
      shortDesc: 'Flor de cânhamo premium strain Blue Dream',
      description: 'Flor de cânhamo premium, strain Blue Dream. Rico em terpenos naturais (Beta-Caryophyllene, Myrcene, Pinene) e baixo THC (<0.3%). Produto 100% legal e certificado. Cultivado indoor em Oregon, USA. Efeito relaxante e suave. Embalagem a vácuo preservando aroma e frescor.',
      price: 149.90,
      comparePrice: 189.90,
      cost: 60.00,
      imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82',
      images: [
        'https://images.unsplash.com/photo-1605792657660-596af9009e82',
        'https://images.unsplash.com/photo-1583683733911-a26b35e6d26c',
      ],
      stock: 0,
      sku: 'HEMP-BLUE-5G',
      categorySlug: 'flores-hemp',
      tags: ['Premium', 'Em Promoção'],
      isFeatured: false,
    },
    {
      name: 'CBD Gummies - Pack 30un',
      shortDesc: 'Gomas de CBD saborosas - 300mg total',
      description: 'Gomas de CBD deliciosas e práticas para consumo diário. Cada goma contém 10mg de CBD. Pack com 30 unidades (300mg total). Sabor frutas vermelhas naturais. Sem glúten, veganas. Ingredientes orgânicos. Perfeito para iniciantes. Discreto e portátil.',
      price: 189.90,
      cost: 75.00,
      imageUrl: 'https://images.unsplash.com/photo-1582054593b0e-42c1c8b0d1e8',
      images: ['https://images.unsplash.com/photo-1582054593b0e-42c1c8b0d1e8'],
      stock: 42,
      sku: 'CBD-GUMMY-30',
      categorySlug: 'comestiveis',
      tags: ['Best Seller', 'Orgânico'],
      isFeatured: true,
    },
    {
      name: 'CBD Cream - Alívio Muscular 100g',
      shortDesc: 'Creme tópico para dores musculares',
      description: 'Creme tópico de CBD para alívio rápido de dores musculares e articulares. Fórmula enriquecida com mentol, arnica montana e óleo de eucalipto. 500mg de CBD por embalagem. Absorção rápida, não oleoso. Ideal para atletas e pessoas com dores crônicas. Embalagem 100g.',
      price: 129.90,
      cost: 48.00,
      imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108',
      images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108'],
      stock: 18,
      sku: 'CBD-CREAM-500-100',
      categorySlug: 'topicos',
      tags: ['Premium'],
      isFeatured: false,
    },
    {
      name: 'Full Spectrum CBD Oil 50ml - 2000mg',
      shortDesc: 'Óleo de CBD concentração extra forte',
      description: 'Óleo de CBD Full Spectrum de concentração extra forte (2000mg/50ml). Contém canabinoides, terpenos e flavonoides completos (efeito entourage). Extração por CO2 supercrítico. Certificado orgânico. THC <0.3%. Para usuários experientes. Sabor natural de cânhamo.',
      price: 499.90,
      comparePrice: 599.90,
      cost: 180.00,
      imageUrl: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34',
      images: ['https://images.unsplash.com/photo-1612277795421-9bc7706a4a34'],
      stock: 12,
      sku: 'CBD-OIL-2000-50',
      categorySlug: 'oleos-cbd',
      tags: ['Premium', 'Novo', 'Full Spectrum'],
      isFeatured: true,
    },
    {
      name: 'CBD Isolate Powder 1g',
      shortDesc: 'CBD puro 99% em pó cristalino',
      description: 'CBD Isolado 99% de pureza em forma de pó cristalino. 1000mg de CBD puro, zero THC. Ideal para criar suas próprias fórmulas, adicionar em alimentos ou uso sublingual. Sem sabor, sem odor. Testado por laboratório terceiro. Vem com dosador.',
      price: 349.90,
      cost: 120.00,
      imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d',
      images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d'],
      stock: 8,
      sku: 'CBD-ISO-1000',
      categorySlug: 'oleos-cbd',
      tags: ['Premium', 'Isolado'],
      isFeatured: false,
    },
  ];

  const createdProducts = [];
  for (const prod of products) {
    const category = createdCategories.find((c) => c.slug === prod.categorySlug);

    const product = await prisma.product.upsert({
      where: {
        tenantId_slug: {
          tenantId: tenant.id,
          slug: generateSlug(prod.name),
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        categoryId: category?.id,
        name: prod.name,
        slug: generateSlug(prod.name),
        description: prod.description,
        shortDesc: prod.shortDesc,
        price: prod.price,
        comparePrice: prod.comparePrice,
        cost: prod.cost,
        imageUrl: prod.imageUrl,
        images: prod.images,
        stock: prod.stock,
        sku: prod.sku,
        trackStock: true,
        lowStockAlert: 5,
        isActive: true,
        isFeatured: prod.isFeatured,
        metaTitle: prod.metaTitle || prod.name,
        metaDescription: prod.metaDescription || prod.shortDesc,
      },
    });

    // Add tags to product
    if (prod.tags) {
      for (const tagName of prod.tags) {
        const tag = createdTags.find((t) => t.name === tagName);
        if (tag) {
          await prisma.productTag.upsert({
            where: {
              productId_tagId: {
                productId: product.id,
                tagId: tag.id,
              },
            },
            update: {},
            create: {
              productId: product.id,
              tagId: tag.id,
            },
          });
        }
      }
    }

    createdProducts.push(product);
  }

  console.log(`✅ ${createdProducts.length} products created`);

  // ============================================
  // 7. CREATE PRODUCT VARIANTS (Example)
  // ============================================
  console.log('\n🎨 Creating product variants...');

  const oilProduct = createdProducts.find((p) => p.sku === 'CBD-OIL-1000-30');
  if (oilProduct) {
    const variants = [
      {
        name: 'Tamanho: 10ml',
        options: { size: '10ml' },
        price: 129.90,
        stock: 35,
        sku: 'CBD-OIL-1000-10',
      },
      {
        name: 'Tamanho: 30ml',
        options: { size: '30ml' },
        price: 299.90,
        stock: 25,
        sku: 'CBD-OIL-1000-30',
      },
      {
        name: 'Tamanho: 60ml',
        options: { size: '60ml' },
        price: 499.90,
        stock: 15,
        sku: 'CBD-OIL-1000-60',
      },
    ];

    for (const variant of variants) {
      await prisma.productVariant.create({
        data: {
          productId: oilProduct.id,
          ...variant,
          isActive: true,
        },
      });
    }

    console.log(`✅ Created 3 variants for ${oilProduct.name}`);
  }

  // ============================================
  // 8. CREATE CUSTOMERS (Example)
  // ============================================
  console.log('\n👥 Creating example customers...');

  const customerPassword = await bcrypt.hash('Customer@2025', 10);

  const customers = [
    {
      email: 'maria@example.com',
      name: 'Maria Silva',
      phone: '+55 11 98765-4321',
      city: 'São Paulo',
      state: 'SP',
    },
    {
      email: 'joao@example.com',
      name: 'João Santos',
      phone: '+55 21 91234-5678',
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
  ];

  const createdCustomers = [];
  for (const cust of customers) {
    const customer = await prisma.customer.upsert({
      where: {
        tenantId_email: {
          tenantId: tenant.id,
          email: cust.email,
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        email: cust.email,
        password: customerPassword,
        name: cust.name,
        phone: cust.phone,
        city: cust.city,
        state: cust.state,
        country: 'BR',
        isActive: true,
      },
    });
    createdCustomers.push(customer);
  }

  console.log(`✅ ${createdCustomers.length} customers created`);

  // ============================================
  // 9. CREATE REVIEWS (Example)
  // ============================================
  console.log('\n⭐ Creating product reviews...');

  const reviewsData = [
    {
      productSku: 'CBD-OIL-1000-30',
      customerEmail: 'maria@example.com',
      rating: 5,
      title: 'Excelente produto!',
      comment: 'Melhor óleo de CBD que já experimentei. Ajudou muito com minha ansiedade e o sono melhorou bastante. Recomendo!',
    },
    {
      productSku: 'CBD-OIL-1000-30',
      customerEmail: 'joao@example.com',
      rating: 4,
      title: 'Muito bom',
      comment: 'Produto de qualidade, chegou rápido. Único ponto negativo é o preço um pouco alto, mas vale a pena.',
    },
    {
      productSku: 'CBD-GUMMY-30',
      customerEmail: 'maria@example.com',
      rating: 5,
      title: 'Deliciosas!',
      comment: 'As gomas são muito gostosas e práticas. Levo na bolsa e uso durante o dia. Efeito relaxante suave.',
    },
  ];

  for (const rev of reviewsData) {
    const product = createdProducts.find((p) => p.sku === rev.productSku);
    const customer = createdCustomers.find((c) => c.email === rev.customerEmail);

    if (product && customer) {
      await prisma.review.create({
        data: {
          productId: product.id,
          customerId: customer.id,
          rating: rev.rating,
          title: rev.title,
          comment: rev.comment,
          isApproved: true,
          isVerified: true,
          helpful: Math.floor(Math.random() * 10),
        },
      });
    }
  }

  console.log(`✅ ${reviewsData.length} reviews created`);

  // ============================================
  // 10. CREATE COUPONS
  // ============================================
  console.log('\n🎟️  Creating coupons...');

  const coupons = [
    {
      code: 'WELCOME10',
      description: 'Cupom de boas-vindas - 10% de desconto',
      type: 'percentage',
      value: 10,
      minPurchase: 100,
      maxDiscount: 50,
      expiresAt: new Date('2025-12-31'),
    },
    {
      code: 'PRIMEIRA COMPRA',
      description: 'Primeira compra - R$ 30 de desconto',
      type: 'fixed',
      value: 30,
      minPurchase: 150,
      usageLimit: 100,
      expiresAt: new Date('2025-12-31'),
    },
    {
      code: 'BLACK25',
      description: 'Black Friday - 25% de desconto',
      type: 'percentage',
      value: 25,
      minPurchase: 200,
      maxDiscount: 150,
      startsAt: new Date('2025-11-20'),
      expiresAt: new Date('2025-11-30'),
    },
  ];

  for (const coup of coupons) {
    await prisma.coupon.upsert({
      where: {
        tenantId_code: {
          tenantId: tenant.id,
          code: coup.code,
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        ...coup,
        isActive: true,
      },
    });
  }

  console.log(`✅ ${coupons.length} coupons created`);

  // ============================================
  // 11. CREATE PRODUCT RELATIONS (Upsell/Related)
  // ============================================
  console.log('\n🔗 Creating product relations...');

  const oil1 = createdProducts.find((p) => p.sku === 'CBD-OIL-1000-30');
  const oil2 = createdProducts.find((p) => p.sku === 'CBD-OIL-2000-50');
  const gummies = createdProducts.find((p) => p.sku === 'CBD-GUMMY-30');
  const cream = createdProducts.find((p) => p.sku === 'CBD-CREAM-500-100');

  if (oil1 && oil2 && gummies && cream) {
    // Upsell: Oil 30ml -> Oil 50ml
    await prisma.productRelation.create({
      data: {
        fromId: oil1.id,
        toId: oil2.id,
        type: 'upsell',
      },
    });

    // Related: Oil -> Gummies
    await prisma.productRelation.create({
      data: {
        fromId: oil1.id,
        toId: gummies.id,
        type: 'related',
      },
    });

    // Cross-sell: Gummies -> Cream
    await prisma.productRelation.create({
      data: {
        fromId: gummies.id,
        toId: cream.id,
        type: 'cross-sell',
      },
    });

    console.log('✅ Product relations created');
  }

  // ============================================
  // FINAL SUMMARY
  // ============================================
  console.log('\n═══════════════════════════════════════');
  console.log('🎉 SEED COMPLETED SUCCESSFULLY!');
  console.log('═══════════════════════════════════════');
  console.log(`\n📊 Summary:`);
  console.log(`  ✓ 1 Tenant created`);
  console.log(`  ✓ 1 Admin user created`);
  console.log(`  ✓ ${createdCategories.length} Categories created`);
  console.log(`  ✓ ${createdTags.length} Tags created`);
  console.log(`  ✓ ${createdProducts.length} Products created`);
  console.log(`  ✓ ${createdCustomers.length} Customers created`);
  console.log(`  ✓ ${reviewsData.length} Reviews created`);
  console.log(`  ✓ ${coupons.length} Coupons created`);
  console.log('\n🔐 Login credentials:');
  console.log(`  Admin: admin@americacannabis.com / Admin@2025`);
  console.log(`  Customer: maria@example.com / Customer@2025`);
  console.log('\n🎟️  Test coupons:');
  console.log(`  WELCOME10 - 10% off`);
  console.log(`  PRIMEIRACOMPRA - R$ 30 off`);
  console.log(`  BLACK25 - 25% off`);
  console.log('═══════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
