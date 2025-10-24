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

export async function runSeed() {
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
      domain: 'frontend-production1.up.railway.app',
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
  console.log('   Password: Admin@2025');

  console.log('\n✅ Seed completed successfully!');
  console.log('\n📋 Summary:');
  console.log(`   - Tenant: ${tenant.name} (ID: ${tenant.id})`);
  console.log(`   - Admin: ${admin.email}`);
  console.log(`   - Password: Admin@2025`);

  return {
    tenant,
    admin: { email: admin.email }
  };
}
