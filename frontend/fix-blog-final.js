const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('src/data/blog-posts.json', 'utf-8'));

console.log('🔧 Correções finais no blog...\n');

// PARTE 1: Corrigir categorias dos posts Top 10
console.log('📝 PARTE 1: Corrigindo categorias dos Top 10\n');

const top10Posts = posts.filter(p => p.slug.includes('top-10') || p.title.includes('Top 10'));

console.log(`Encontrados ${top10Posts.length} posts Top 10:\n`);

top10Posts.forEach(p => {
  const oldCategory = p.category.name;

  // Mudar para categoria "Guia de Compras"
  p.category = {
    id: 'guia-compras',
    name: 'Guia de Compras',
    slug: 'guia-compras',
    description: 'Rankings e recomendações de produtos',
    color: '#f59e0b'
  };

  console.log(`✅ ${p.title}`);
  console.log(`   ${oldCategory} → Guia de Compras`);
  console.log();
});

// PARTE 2: Diversificar imagens de produtos CBD
console.log('\n📝 PARTE 2: Diversificando imagens de produtos\n');

// Lista de produtos CBD e educacionais com IMAGENS DIFERENTES
const diverseProductImages = {
  // Posts sobre CBD - CADA UM COM PRODUTO DIFERENTE
  'o-que-e-cbd-guia-completo': 'https://backend-production1.up.railway.app/uploads/images/products/c5c27fea-cfdc-40a3-8d41-31a50c679513.jpg', // Natyva CBD Gummy
  'cbd-para-ansiedade-funciona': 'https://backend-production1.up.railway.app/uploads/images/products/b3002fb3-1b49-428f-9d31-63c74cd287ea.jpg', // Hallu Monkey Sativa
  'oleo-cbd-como-usar': 'https://backend-production1.up.railway.app/uploads/images/products/2cc4bfe8-29d5-414d-a8c5-dd0e877ed535.jpg', // Hallu Monkey Indica
  'dosagem-cbd-guia-completo': 'https://backend-production1.up.railway.app/uploads/images/products/6fea17b8-c8f2-41f9-b4e9-c0b3ff610813.jpg', // Hallu Monkey Hibrida
  'cbd-para-dormir-insonia': 'https://backend-production1.up.railway.app/uploads/images/products/da4c99b8-5904-4d65-a67b-531110c9708b.jpg', // Hallu Monkey 2ml Indica
  'cbd-dor-cronica': 'https://backend-production1.up.railway.app/uploads/images/products/8749acc7-f928-4913-a40b-241abd065985.jpg', // Hallu Monkey 2ml Sativa
  'cbd-efeitos-colaterais': 'https://backend-production1.up.railway.app/uploads/images/products/ac496ec4-5c92-497c-aa68-19a0ecc03493.jpg', // Hallu Monkey 2ml Hibrida
  'cbd-epilepsia-estudos': 'https://backend-production1.up.railway.app/uploads/images/products/49fd6035-127b-4eea-b068-3c1f3bdd6b5e.jpg', // EigthSix Sativa
  'cbd-idosos-terceira-idade': 'https://backend-production1.up.railway.app/uploads/images/products/6bec1270-d377-4eaa-8022-9961299b09dc.jpg', // EigthSix Indica

  // Posts sobre THC/diferenças
  'diferenca-cbd-thc': 'https://backend-production1.up.railway.app/uploads/images/products/698b2f7c-fe3f-4f9c-ac0e-c916d30d9ae7.jpg', // Chapo

  // Posts educacionais/guia
  'como-escolher-cbd-qualidade': 'https://backend-production1.up.railway.app/uploads/images/products/1e13712f-d2db-481f-a77d-6a1d335c4f8b.jpg', // Tree House Hibrida
  'full-spectrum-vs-isolado-cbd': 'https://backend-production1.up.railway.app/uploads/images/products/b412b301-8b21-4305-a05d-a080b23d8994.jpg', // Tree House Sativa
  'coa-certificado-analise-cbd': 'https://backend-production1.up.railway.app/uploads/images/products/1448dc20-7d5c-4b6c-9504-afe8fac0530b.jpg', // Tree House Indica

  // Posts sobre cannabis medicinal/lei
  'cannabis-medicinal-brasil-lei': 'https://backend-production1.up.railway.app/uploads/images/products/0120f7a2-46c3-4be6-a438-1b4ccb4122a7.jpg', // Torch Diamont Sativa
  'anvisa-cannabis-2025': 'https://backend-production1.up.railway.app/uploads/images/products/8df54376-2352-48f9-8eb9-aec87017c5cb.jpg', // Torch Diamont Indica
  'cultivo-cannabis-medicinal-brasil': 'https://backend-production1.up.railway.app/uploads/images/products/40e3f042-628a-4aea-a600-548f455f66ca.jpg', // Torch Diamont Hibrida

  // Posts sobre cannabis/câncer/estudos
  'cannabis-cancer-estudos': 'https://backend-production1.up.railway.app/uploads/images/products/347d0652-bd3a-4dec-9c03-c839fe0370c1.jpg', // Ignite Sativa

  // Posts sobre terpenos
  'terpenos-cannabis-efeitos': 'https://backend-production1.up.railway.app/uploads/images/products/22ee7e5c-9c8b-415b-aeee-06cd8e47acdb.jpg', // Jetter Juice Sativa

  // Posts sobre pets
  'cbd-pets-caes-gatos': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg', // Cactus Amanita (mais suave)

  // Posts sobre indica/sativa/híbrida
  'cannabis-indica': 'https://backend-production1.up.railway.app/uploads/images/products/4712af36-0748-4ee6-9044-cce780fd66da.jpg', // Snoop Dogg Sativa
  'cannabis-sativa': 'https://backend-production1.up.railway.app/uploads/images/products/d405732a-cac7-457e-810a-4593e5cf4a47.jpg', // Snoop Dogg Indica
  'cannabis-hibrida': 'https://backend-production1.up.railway.app/uploads/images/products/e83e9939-c443-4ca3-a153-4a6125a9ad72.jpg', // Snoop Dogg Hibrida

  // Posts TOP 10 - usar produtos variados
  'top-10-indica-2025': 'https://backend-production1.up.railway.app/uploads/images/products/5ebb43c9-2ea7-4b8c-ab97-b1f6a0022f9e.jpg', // Pulse Indica
  'top-10-sativa-2025': 'https://backend-production1.up.railway.app/uploads/images/products/70d99c2e-aba0-44f8-ad73-d6148621f5fb.jpg', // Pressure Sativa
  'top-10-hibrida-2025': 'https://backend-production1.up.railway.app/uploads/images/products/154a3864-ed9b-4037-a576-6d14723062c9.jpg' // Pulse Hibrida
};

let updated = 0;

posts.forEach(post => {
  if (diverseProductImages[post.slug]) {
    const oldImage = post.imageUrl.substring(post.imageUrl.lastIndexOf('/') + 1, post.imageUrl.lastIndexOf('.'));
    const newImage = diverseProductImages[post.slug].substring(diverseProductImages[post.slug].lastIndexOf('/') + 1, diverseProductImages[post.slug].lastIndexOf('.'));

    if (oldImage !== newImage) {
      post.imageUrl = diverseProductImages[post.slug];

      console.log(`✅ ${post.title}`);
      console.log(`   Trocou imagem do produto`);
      console.log();

      updated++;
    }
  }
});

// Salvar
fs.writeFileSync('src/data/blog-posts.json', JSON.stringify(posts, null, 2), 'utf-8');

console.log(`\n✅ Total de categorias corrigidas: ${top10Posts.length}`);
console.log(`✅ Total de imagens atualizadas: ${updated}`);
console.log('\n✅ Arquivo salvo!');
