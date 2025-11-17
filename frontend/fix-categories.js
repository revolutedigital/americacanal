const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('src/data/blog-posts.json', 'utf-8'));

console.log('🔧 Corrigindo categorias duplicadas...\n');

let fixed = 0;

// Padronizar "Guia de Compras" para "Guias de Compras"
posts.forEach(post => {
  if (post.category.name === 'Guia de Compras') {
    console.log(`✅ Corrigindo: ${post.title.substring(0, 60)}...`);
    console.log(`   "${post.category.name}" → "Guias de Compras"\n`);

    post.category = {
      id: 'guias-compras',
      name: 'Guias de Compras',
      slug: 'guias-compras',
      description: 'Comparativos, rankings e guias para escolher os melhores produtos',
      color: '#f59e0b'
    };

    fixed++;
  }
});

// Salvar
fs.writeFileSync('src/data/blog-posts.json', JSON.stringify(posts, null, 2), 'utf-8');

console.log(`\n✅ Total de posts corrigidos: ${fixed}`);
console.log('✅ Arquivo salvo!\n');

// Mostrar distribuição final
const categories = {};
posts.forEach(p => {
  const cat = p.category.name;
  categories[cat] = (categories[cat] || 0) + 1;
});

console.log('=== DISTRIBUIÇÃO FINAL ===\n');
Object.entries(categories).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} posts (${Math.round(count/posts.length*100)}%)`);
});
console.log(`\nTotal: ${posts.length} posts`);
