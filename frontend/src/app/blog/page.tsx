'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { BlogPost, blogCategories } from '@/lib/blog-types';
import blogPostsData from '@/data/blog-posts.json';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Carregar posts do JSON
    setPosts(blogPostsData as BlogPost[]);
    setFilteredPosts(blogPostsData as BlogPost[]);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category.id === selectedCategory);
    }

    // Filtrar por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery, posts]);

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-4">
                Blog Cannabis
              </h1>
              <p className="text-xl text-green-100">
                Guias completos, notícias e educação sobre cannabis medicinal, CBD e bem-estar.
                Conteúdo baseado em ciência e experiência.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Busca e Filtros */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Busca */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Categorias */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Todos ({posts.length})
              </button>
              {blogCategories.map(category => {
                const count = posts.filter(p => p.category.id === category.id).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${
                      selectedCategory === category.id
                        ? 'text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === category.id ? category.color : undefined
                    }}
                  >
                    {category.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Post em Destaque */}
          {featuredPost && selectedCategory === 'all' && !searchQuery && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📌 Artigo em Destaque</h2>
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Lista de Posts */}
          {filteredPosts.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {searchQuery ? `Resultados para "${searchQuery}"` : 'Últimos Artigos'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                Nenhum artigo encontrado com os filtros selecionados.
              </p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              📧 Receba Novos Artigos no seu Email
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Cadastre-se e receba semanalmente artigos exclusivos sobre cannabis medicinal,
              dicas de uso, novidades do mercado e promoções especiais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
