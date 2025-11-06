'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

export default function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const categories = [
    { name: 'Todos', slug: '' },
    { name: '⭐ Reviews de Produtos', slug: 'produtos' },
    { name: 'Guia do Iniciante', slug: 'guia-iniciante' },
    { name: 'Saúde & Bem-Estar', slug: 'saude-bem-estar' },
    { name: 'Ciência', slug: 'ciencia' },
    { name: 'Legislação', slug: 'legislacao' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar Editorial */}
      <div className="bg-gradient-to-r from-primary to-primary-vibrant text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <span className="font-medium">📚 Blog America Cannabis</span>
              <span className="hidden md:inline text-white/90">Educação e Informação sobre Cannabis</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/americacannabis" target="_blank" rel="noopener" className="hover:text-white/80 transition">
                Instagram
              </a>
              <a href="https://twitter.com/americacannabis" target="_blank" rel="noopener" className="hover:text-white/80 transition">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/blog" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-vibrant rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-2xl">🌿</span>
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-bold text-gray-900">America Cannabis</div>
              <div className="text-xs text-gray-600 -mt-1">BLOG & REVISTA</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug || 'todos'}
                href={cat.slug ? `/blog/categoria/${cat.slug}` : '/blog'}
                className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg font-medium transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            {/* Search Desktop */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artigos..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            {/* CTA Button */}
            <Link
              href="/produtos"
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent/90 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md"
            >
              <span>🛍️</span>
              <span>Loja</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artigos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug || 'todos'}
                href={cat.slug ? `/blog/categoria/${cat.slug}` : '/blog'}
                className="block px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg font-medium transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/produtos"
              className="block px-4 py-3 bg-gradient-to-r from-accent to-accent/90 text-white rounded-lg font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              🛍️ Visitar Loja
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
