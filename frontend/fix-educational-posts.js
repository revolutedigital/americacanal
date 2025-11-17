const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('src/data/blog-posts.json', 'utf-8'));

// 1. Corrigir categoria dos 3 posts
const postsToRecategorize = [
  'full-spectrum-vs-isolado-cbd',
  'como-escolher-cbd-qualidade',
  'coa-certificado-analise-cbd'
];

console.log('📝 PARTE 1: Corrigindo categorias\n');

let recategorized = 0;
posts.forEach(post => {
  if (postsToRecategorize.includes(post.slug)) {
    const oldCategory = typeof post.category === 'string' ? post.category : post.category.name;

    // Mudar para Guia do Iniciante
    post.category = {
      id: 'guia-iniciante',
      name: 'Guia do Iniciante',
      slug: 'guia-iniciante',
      description: 'Guias completos para quem está começando no mundo da cannabis',
      color: '#10b981'
    };

    console.log(`✅ ${post.title}`);
    console.log(`   ${oldCategory} → Guia do Iniciante`);
    console.log();
    recategorized++;
  }
});

console.log(`Total recategorizados: ${recategorized}/3\n\n`);

// 2. Identificar posts educacionais e top 10 que precisam de produtos
console.log('📝 PARTE 2: Posts educacionais e Top 10\n');

// Posts educacionais que não são reviews/marcas
const educationalPosts = posts.filter(p => {
  return !p.slug.startsWith('review-') &&
         !p.slug.startsWith('marca-') &&
         (p.slug.includes('guia') ||
          p.slug.includes('top-') ||
          p.slug.includes('melhor') ||
          p.slug.includes('cannabis-') ||
          p.slug.includes('cbd-') ||
          p.slug.includes('thc-') ||
          p.slug.includes('como-') ||
          p.slug.includes('beneficios') ||
          p.slug.includes('efeitos'));
});

console.log(`Encontrados ${educationalPosts.length} posts educacionais/top 10:\n`);

educationalPosts.slice(0, 20).forEach(p => {
  console.log(`- ${p.title}`);
  console.log(`  Slug: ${p.slug}`);
  console.log(`  Imagem atual: ${p.imageUrl.substring(0, 60)}...`);
  console.log();
});

// Salvar
fs.writeFileSync('src/data/blog-posts.json', JSON.stringify(posts, null, 2), 'utf-8');

console.log('\n✅ Arquivo salvo!');
