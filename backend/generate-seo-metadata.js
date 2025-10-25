const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Gera meta tags SEO personalizadas baseadas no nome e descrição do produto
 */
function generateMetaTags(product) {
  const { name, description, price, category } = product;

  // Extrair primeira linha da descrição (geralmente é o resumo)
  const firstLine = description ? description.split('\n')[0] : '';
  const shortDesc = firstLine.length > 155
    ? firstLine.substring(0, 152) + '...'
    : firstLine;

  // Gerar Meta Title (50-60 caracteres ideal)
  const metaTitle = `${name} | America Cannabis`;

  // Gerar Meta Description (150-160 caracteres ideal)
  let metaDescription = shortDesc || `${name} - Produto premium de cannabis de alta qualidade.`;

  // Adicionar preço e CTA se couber
  if (metaDescription.length < 130) {
    const priceText = ` R$ ${Number(price).toFixed(2).replace('.', ',')}`;
    const cta = '. Entrega em todo Brasil ⚡';

    if ((metaDescription + priceText + cta).length <= 160) {
      metaDescription += priceText + cta;
    } else if ((metaDescription + cta).length <= 160) {
      metaDescription += cta;
    }
  }

  // Gerar Keywords (extrair palavras-chave do nome e descrição)
  const keywords = [];

  // Palavras do nome
  const nameWords = name.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['the', 'and', 'for', 'with'].includes(w));

  keywords.push(...nameWords);

  // Adicionar categoria se houver
  if (category && category.name) {
    keywords.push(category.name.toLowerCase());
  }

  // Palavras-chave comuns para produtos de cannabis
  const commonKeywords = ['cannabis', 'brasil', 'premium', 'thc', 'cbd'];
  const descLower = description ? description.toLowerCase() : '';

  commonKeywords.forEach(kw => {
    if (descLower.includes(kw) && !keywords.includes(kw)) {
      keywords.push(kw);
    }
  });

  // Detectar tipo de produto
  if (descLower.includes('vape') || descLower.includes('cart')) {
    keywords.push('vape', 'cartucho');
  }
  if (descLower.includes('delta')) {
    keywords.push('delta 8', 'delta 9', 'delta 10');
  }
  if (descLower.includes('óleo') || descLower.includes('oil')) {
    keywords.push('óleo', 'tincture');
  }
  if (descLower.includes('flor') || descLower.includes('flower')) {
    keywords.push('flores', 'buds');
  }
  if (descLower.includes('sativa')) {
    keywords.push('sativa', 'energia');
  }
  if (descLower.includes('indica')) {
    keywords.push('indica', 'relaxamento');
  }
  if (descLower.includes('hybrid')) {
    keywords.push('híbrido', 'equilibrado');
  }

  // Remover duplicatas e limitar a 10 keywords
  const metaKeywords = [...new Set(keywords)]
    .slice(0, 10)
    .join(', ');

  return {
    metaTitle: metaTitle.substring(0, 60), // Limite de 60 caracteres
    metaDescription: metaDescription.substring(0, 160), // Limite de 160 caracteres
    metaKeywords: metaKeywords
  };
}

async function generateAllMetaTags() {
  try {
    console.log('📚 Buscando produtos do banco de dados...\n');

    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });

    console.log(`✅ Encontrados ${products.length} produtos\n`);
    console.log('🔧 Gerando meta tags SEO personalizadas...\n');

    let updated = 0;
    let errors = 0;
    const errorDetails = [];

    for (const product of products) {
      try {
        const metaTags = generateMetaTags(product);

        await prisma.product.update({
          where: { id: product.id },
          data: {
            metaTitle: metaTags.metaTitle,
            metaDescription: metaTags.metaDescription,
            metaKeywords: metaTags.metaKeywords
          }
        });

        updated++;

        if (updated % 10 === 0) {
          console.log(`✅ Processados ${updated}/${products.length}...`);
        }

        // Exibir exemplo dos primeiros 3
        if (updated <= 3) {
          console.log(`\n📝 Exemplo ${updated}: ${product.name.substring(0, 50)}...`);
          console.log(`   Title: ${metaTags.metaTitle}`);
          console.log(`   Description: ${metaTags.metaDescription}`);
          console.log(`   Keywords: ${metaTags.metaKeywords}`);
        }

      } catch (error) {
        errors++;
        errorDetails.push(`${product.id}: ${error.message}`);
        console.error(`❌ Erro ao processar ${product.name.substring(0, 30)}:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(70));
    console.log('✅ RESULTADO FINAL:');
    console.log('='.repeat(70));
    console.log(`✅ Meta tags geradas: ${updated}/${products.length}`);
    console.log(`❌ Erros: ${errors}`);
    console.log(`📊 Taxa de sucesso: ${((updated / products.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(70));

    if (errorDetails.length > 0) {
      console.log('\n⚠️  Detalhes dos erros:');
      errorDetails.forEach((err, i) => {
        console.log(`  ${i + 1}. ${err}`);
      });
    }

    console.log('\n✨ Meta tags SEO aplicadas com sucesso!');
    console.log('🚀 Próximo passo: Deploy para aplicar as mudanças\n');

  } catch (error) {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar
generateAllMetaTags();
