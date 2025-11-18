/**
 * Script para submeter todos os posts do blog ao IndexNow
 * Isso notifica o Bing imediatamente sobre todo o conteúdo
 *
 * Uso: npx ts-node scripts/submit-all-to-indexnow.ts
 */

import blogPosts from '../src/data/blog-posts.json' with { type: 'json' };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://americacannabisbr.com';
const INDEXNOW_KEY = 'ccafe3cc-5370-4247-8792-1726f0a9d32f';

async function submitToIndexNow() {
  console.log('🚀 Iniciando submissão ao IndexNow...\n');

  // Gerar todas as URLs dos posts
  const blogUrls = blogPosts.map(post => `${SITE_URL}/blog/${post.slug}`);

  // Adicionar páginas importantes
  const staticUrls = [
    SITE_URL,
    `${SITE_URL}/blog`,
    `${SITE_URL}/produtos`,
    `${SITE_URL}/blog/categoria/produtos`,
    `${SITE_URL}/blog/categoria/guia-iniciante`,
    `${SITE_URL}/blog/categoria/saude-bem-estar`,
    `${SITE_URL}/blog/categoria/ciencia-pesquisa`,
    `${SITE_URL}/blog/categoria/legislacao-regulamentacao`,
    `${SITE_URL}/blog/categoria/guias-compras`,
    `${SITE_URL}/blog/categoria/cultivo-producao`,
  ];

  const allUrls = [...staticUrls, ...blogUrls];

  console.log(`📊 Total de URLs a submeter: ${allUrls.length}`);
  console.log(`   - Páginas estáticas: ${staticUrls.length}`);
  console.log(`   - Posts do blog: ${blogUrls.length}\n`);

  // IndexNow aceita até 10.000 URLs por request
  const batchSize = 10000;
  const batches = [];

  for (let i = 0; i < allUrls.length; i += batchSize) {
    batches.push(allUrls.slice(i, i + batchSize));
  }

  console.log(`📦 Dividido em ${batches.length} lote(s)\n`);

  // Submeter cada lote
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`🔄 Submetendo lote ${i + 1}/${batches.length} (${batch.length} URLs)...`);

    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          host: SITE_URL.replace('https://', '').replace('http://', ''),
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      });

      if (response.status === 200 || response.status === 202) {
        console.log(`✅ Lote ${i + 1} submetido com sucesso! Status: ${response.status}\n`);
      } else {
        const errorText = await response.text();
        console.error(`❌ Erro ao submeter lote ${i + 1}. Status: ${response.status}`);
        console.error(`   Resposta: ${errorText}\n`);
      }

      // Aguardar 1 segundo entre lotes para não sobrecarregar a API
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`❌ Exceção ao submeter lote ${i + 1}:`, error, '\n');
    }
  }

  console.log('\n🎉 Processo concluído!');
  console.log('\n📌 Próximos passos:');
  console.log('   1. Aguarde 5-60 minutos para o Bing indexar');
  console.log('   2. Verifique no Bing Webmaster Tools: https://www.bing.com/webmasters');
  console.log('   3. Use o sitemap para Google: https://search.google.com/search-console');
}

submitToIndexNow().catch(console.error);
