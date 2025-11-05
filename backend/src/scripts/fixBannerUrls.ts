import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixBannerUrls() {
  try {
    console.log('🔧 Iniciando correção de URLs dos banners...');

    // Buscar todos os banners
    const banners = await prisma.banner.findMany();

    console.log(`📊 Encontrados ${banners.length} banners`);

    let updatedCount = 0;

    for (const banner of banners) {
      let needsUpdate = false;
      const updates: any = {};

      // Corrigir imageUrl se começar com /uploads
      if (banner.imageUrl && banner.imageUrl.startsWith('/uploads')) {
        updates.imageUrl = `https://backend-production1.up.railway.app${banner.imageUrl}`;
        needsUpdate = true;
        console.log(`  ✏️  Banner ${banner.id}: ${banner.imageUrl} → ${updates.imageUrl}`);
      }

      // Corrigir imageMobile se começar com /uploads
      if (banner.imageMobile && banner.imageMobile.startsWith('/uploads')) {
        updates.imageMobile = `https://backend-production1.up.railway.app${banner.imageMobile}`;
        needsUpdate = true;
        console.log(`  ✏️  Banner ${banner.id} (mobile): ${banner.imageMobile} → ${updates.imageMobile}`);
      }

      // Atualizar se necessário
      if (needsUpdate) {
        await prisma.banner.update({
          where: { id: banner.id },
          data: updates,
        });
        updatedCount++;
      }
    }

    console.log(`\n✅ Correção concluída!`);
    console.log(`📈 ${updatedCount} banners atualizados`);
    console.log(`✓ ${banners.length - updatedCount} banners já estavam corretos`);
  } catch (error) {
    console.error('❌ Erro ao corrigir URLs dos banners:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar
fixBannerUrls()
  .then(() => {
    console.log('\n🎉 Script finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  });
