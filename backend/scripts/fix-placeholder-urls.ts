/**
 * Script para substituir URLs via.placeholder.com por nosso gerador local
 * via.placeholder.com está frequentemente offline causando ERR_NAME_NOT_RESOLVED
 *
 * Uso: ts-node scripts/fix-placeholder-urls.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const FRONTEND_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';

async function fixPlaceholderUrls() {
  console.log('🔧 Iniciando substituição de URLs via.placeholder.com...\n');

  try {
    // Buscar todos os produtos
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        images: true,
      },
    });

    console.log(`📦 Total de produtos: ${products.length}\n`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const product of products) {
      const images = product.images as string[];

      if (!images || images.length === 0) {
        skippedCount++;
        continue;
      }

      // Verificar se tem via.placeholder
      const hasPlaceholder = images.some((img) => img.includes('via.placeholder.com'));

      if (!hasPlaceholder) {
        skippedCount++;
        continue;
      }

      // Substituir URLs
      const newImages = images.map((img) => {
        if (img.includes('via.placeholder.com')) {
          // Extrair informações da URL original
          // Formato: https://via.placeholder.com/800x800/10b981/ffffff?text=Nome
          const match = img.match(/(\d+)x(\d+)\/([^\/]+)\/([^\?]+)\?text=(.+)/);

          if (match) {
            const [, width, height, bg, color, text] = match;
            return `${FRONTEND_URL}/api/placeholder?width=${width}&height=${height}&bg=${bg}&color=${color}&text=${encodeURIComponent(text)}`;
          } else {
            // Fallback simples
            const productName = product.name.substring(0, 20);
            return `${FRONTEND_URL}/api/placeholder?width=800&height=800&text=${encodeURIComponent(productName)}`;
          }
        }
        return img;
      });

      // Atualizar no banco
      await prisma.product.update({
        where: { id: product.id },
        data: { images: newImages },
      });

      console.log(`✅ Atualizado: ${product.name}`);
      console.log(`   Antes: ${images[0]}`);
      console.log(`   Depois: ${newImages[0]}\n`);

      updatedCount++;
    }

    console.log('\n📊 RELATÓRIO FINAL:');
    console.log(`   ✅ Atualizados: ${updatedCount}`);
    console.log(`   ⏭️  Pulados: ${skippedCount}`);
    console.log(`   📦 Total: ${products.length}`);

  } catch (error) {
    console.error('❌ Erro ao atualizar URLs:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar script
fixPlaceholderUrls()
  .then(() => {
    console.log('\n✅ Script concluído com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script falhou:', error);
    process.exit(1);
  });
