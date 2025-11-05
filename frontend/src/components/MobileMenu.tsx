'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  brands: Brand[];
}

export default function MobileMenu({ isOpen, onClose, categories, brands }: MobileMenuProps) {
  // Prevenir scroll do body quando menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fechar com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 mobile-menu-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 mobile-menu-panel overflow-y-auto shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação mobile"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary via-secondary to-primary-dark p-4 flex items-center justify-between shadow-md">
          <h2 className="text-white font-bold text-lg">Menu</h2>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="text-white hover:text-accent transition-colors p-2 hover:bg-white/10 rounded-full focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {/* Home */}
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-primary transition-colors font-medium focus-visible:bg-purple-50 focus-visible:outline-none"
          >
            <span className="text-xl" aria-hidden="true">🏠</span>
            <span>Início</span>
          </Link>

          {/* Produtos */}
          <Link
            href="/produtos"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-primary transition-colors font-medium focus-visible:bg-purple-50 focus-visible:outline-none"
          >
            <span className="text-xl" aria-hidden="true">🛍️</span>
            <span>Todos os Produtos</span>
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-primary transition-colors font-medium focus-visible:bg-purple-50 focus-visible:outline-none"
          >
            <span className="text-xl" aria-hidden="true">📚</span>
            <span>Blog</span>
          </Link>

          {/* Categorias Section */}
          {categories.length > 0 && (
            <div className="pt-4">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Categorias
              </h3>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/produtos?categoria=${category.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-primary transition-colors focus-visible:bg-purple-50 focus-visible:outline-none"
                >
                  <span className="text-lg" aria-hidden="true">📁</span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Marcas Section */}
          {brands.length > 0 && (
            <div className="pt-4">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Marcas
              </h3>
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/produtos?marca=${brand.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-primary transition-colors focus-visible:bg-purple-50 focus-visible:outline-none"
                >
                  <span className="text-lg" aria-hidden="true">🏷️</span>
                  <span>{brand.name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Tipos Section */}
          <div className="pt-4">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Tipos de Produto
            </h3>
            <Link
              href="/produtos?tipo=INDICA"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-primary transition-colors focus-visible:bg-purple-50 focus-visible:outline-none"
            >
              <span className="text-lg" aria-hidden="true">🌙</span>
              <span>Indica</span>
            </Link>
            <Link
              href="/produtos?tipo=SATIVA"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-primary transition-colors focus-visible:bg-purple-50 focus-visible:outline-none"
            >
              <span className="text-lg" aria-hidden="true">☀️</span>
              <span>Sativa</span>
            </Link>
            <Link
              href="/produtos?tipo=HIBRIDA"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-primary transition-colors focus-visible:bg-purple-50 focus-visible:outline-none"
            >
              <span className="text-lg" aria-hidden="true">🌓</span>
              <span>Híbrida</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="py-4">
            <div className="border-t border-gray-200"></div>
          </div>

          {/* Admin Access */}
          <Link
            href="/admin/login"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors font-semibold focus-visible:bg-primary focus-visible:text-white focus-visible:outline-none"
          >
            <span className="text-xl" aria-hidden="true">⚙️</span>
            <span>Área Administrativa</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 mt-4">
          <a
            href="https://wa.me/595982574068"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-green-400"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Fale Conosco no WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
