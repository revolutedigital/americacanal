const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('src/data/blog-posts.json', 'utf-8'));

console.log('🔧 Corrigindo IDs de categorias...\\n');

let fixed = 0;

posts.forEach(post => {
  let updated = false;

  // Corrigir "legislacao" para "legislacao-regulamentacao"
  if (post.category.id === 'legislacao') {
    console.log(`✅ ${post.title.substring(0, 60)}...`);
    console.log(`   "${post.category.id}" → "legislacao-regulamentacao"\\n`);

    post.category = {
      id: 'legislacao-regulamentacao',
      name: 'Legislação & Regulamentação',
      slug: 'legislacao-regulamentacao',
      description: 'Leis, regulamentos e novidades legais sobre cannabis',
      color: '#ef4444'
    };

    updated = true;
  }

  // Corrigir "ciencia" para "ciencia-pesquisa"
  if (post.category.id === 'ciencia') {
    console.log(`✅ ${post.title.substring(0, 60)}...`);
    console.log(`   "${post.category.id}" → "ciencia-pesquisa"\\n`);

    post.category = {
      id: 'ciencia-pesquisa',
      name: 'Ciência & Pesquisa',
      slug: 'ciencia-pesquisa',
      description: 'Estudos científicos e pesquisas sobre cannabis',
      color: '#f59e0b'
    };

    updated = true;
  }

  if (updated) fixed++;
});

// Salvar
fs.writeFileSync('src/data/blog-posts.json', JSON.stringify(posts, null, 2), 'utf-8');

console.log(`\\n✅ Total de posts corrigidos: ${fixed}`);
console.log('✅ Arquivo salvo!\\n');

// Mostrar distribuição final
const categories = {};
posts.forEach(p => {
  const cat = p.category.name;
  categories[cat] = (categories[cat] || 0) + 1;
});

console.log('=== DISTRIBUIÇÃO FINAL ===\\n');
Object.entries(categories).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} posts (${Math.round(count/posts.length*100)}%)`);
});
console.log(`\\nTotal: ${posts.length} posts`);
