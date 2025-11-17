const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('src/data/blog-posts.json', 'utf-8'));

// Mapeamento de posts educacionais para produtos apropriados
// Usando imagens de produtos reais que já sabemos que existem
const educationalProductImages = {
  // Posts sobre CBD/Óleo - usar produtos de óleo CBD
  'o-que-e-cbd-guia-completo': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg', // Cactus (produto CBD)
  'cbd-para-ansiedade-funciona': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg',
  'oleo-cbd-como-usar': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg',
  'dosagem-cbd-guia-completo': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg',
  'cbd-para-dormir-insonia': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg',
  'cbd-dor-cronica': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg',
  'cbd-efeitos-colaterais': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg',
  'cbd-epilepsia-estudos': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg',
  'cbd-idosos-terceira-idade': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg',

  // Posts sobre THC/diferenças - usar produtos de vape/gummies
  'diferenca-cbd-thc': 'https://backend-production1.up.railway.app/uploads/images/products/698b2f7c-fe3f-4f9c-ac0e-c916d30d9ae7.jpg', // Chapo

  // Posts educacionais/guia - usar gummies populares
  'como-escolher-cbd-qualidade': 'https://backend-production1.up.railway.app/uploads/images/products/1e13712f-d2db-481f-a77d-6a1d335c4f8b.jpg', // Gummy
  'full-spectrum-vs-isolado-cbd': 'https://backend-production1.up.railway.app/uploads/images/products/1e13712f-d2db-481f-a77d-6a1d335c4f8b.jpg',
  'coa-certificado-analise-cbd': 'https://backend-production1.up.railway.app/uploads/images/products/1e13712f-d2db-481f-a77d-6a1d335c4f8b.jpg',

  // Posts sobre cannabis medicinal/lei - usar produto genérico de qualidade
  'cannabis-medicinal-brasil-lei': 'https://backend-production1.up.railway.app/uploads/images/products/0120f7a2-46c3-4be6-a438-1b4ccb4122a7.jpg', // Ignite
  'anvisa-cannabis-2025': 'https://backend-production1.up.railway.app/uploads/images/products/0120f7a2-46c3-4be6-a438-1b4ccb4122a7.jpg',
  'cultivo-cannabis-medicinal-brasil': 'https://backend-production1.up.railway.app/uploads/images/products/0120f7a2-46c3-4be6-a438-1b4ccb4122a7.jpg',

  // Posts sobre cannabis/câncer/estudos - usar produto medicinal
  'cannabis-cancer-estudos': 'https://backend-production1.up.railway.app/uploads/images/products/9dfac6ce-50bf-465c-9486-b96fb49296c0.jpg',

  // Posts sobre terpenos - usar vape
  'terpenos-cannabis-efeitos': 'https://backend-production1.up.railway.app/uploads/images/products/8df54376-2352-48f9-8eb9-aec87017c5cb.jpg', // Jetter Juice (vape)

  // Posts sobre pets - usar gummy (produto suave)
  'cbd-pets-caes-gatos': 'https://backend-production1.up.railway.app/uploads/images/products/1e13712f-d2db-481f-a77d-6a1d335c4f8b.jpg',

  // Posts sobre indica/sativa/híbrida - usar produtos de flower/vape apropriados
  'cannabis-indica': 'https://backend-production1.up.railway.app/uploads/images/products/698b2f7c-fe3f-4f9c-ac0e-c916d30d9ae7.jpg', // Chapo
  'cannabis-sativa': 'https://backend-production1.up.railway.app/uploads/images/products/8df54376-2352-48f9-8eb9-aec87017c5cb.jpg', // Jetter Juice
  'cannabis-hibrida': 'https://backend-production1.up.railway.app/uploads/images/products/0120f7a2-46c3-4be6-a438-1b4ccb4122a7.jpg' // Ignite
};

console.log('🖼️  Atualizando imagens dos posts educacionais...\n');

let updated = 0;

posts.forEach(post => {
  if (educationalProductImages[post.slug]) {
    const oldImage = post.imageUrl.substring(0, 60);
    post.imageUrl = educationalProductImages[post.slug];

    console.log(`✅ ${post.title}`);
    console.log(`   Antiga: ${oldImage}...`);
    console.log(`   Nova: ${post.imageUrl}`);
    console.log();

    updated++;
  }
});

// Salvar
fs.writeFileSync('src/data/blog-posts.json', JSON.stringify(posts, null, 2), 'utf-8');

console.log(`\n✅ ${updated} posts atualizados com imagens de produtos reais!`);
