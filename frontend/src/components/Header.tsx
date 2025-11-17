'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/lib/api';
import MobileMenu from './MobileMenu';

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

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showBrandsMenu, setShowBrandsMenu] = useState(false);
  const [showTypesMenu, setShowTypesMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs para click-outside-to-close
  const categoriesRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    fetchCategories();
    fetchBrands();
  }, [isMounted]);

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Click-outside-to-close para menus dropdown
  useEffect(() => {
    if (!isMounted) return;

    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setShowCategoriesMenu(false);
      }
      if (brandsRef.current && !brandsRef.current.contains(event.target as Node)) {
        setShowBrandsMenu(false);
      }
      if (typesRef.current && !typesRef.current.contains(event.target as Node)) {
        setShowTypesMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMounted]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await api.get('/api/brands/active?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c');
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produtos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-primary via-primary-vibrant to-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Top Row: Logo, Search, User */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu de navegação"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden text-white hover:text-accent transition-colors p-2 hover:bg-white/10 rounded-lg focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
            <div className="relative w-36 sm:w-48 md:w-60 lg:w-72 h-10 sm:h-12 md:h-14 lg:h-16 flex items-center justify-center">
              <Image
                src="/brand.webp"
                alt="America Cannabis"
                width={416}
                height={104}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </Link>

          {/* Search Bar - Hidden on small screens */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-2xl" role="search">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar produtos"
                className="w-full px-6 py-3 pr-32 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus-visible:ring-2 focus-visible:ring-accent shadow-lg"
              />
              <button
                type="submit"
                aria-label="Realizar busca"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent-dark text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Admin Access */}
          <nav className="flex items-center space-x-4 flex-shrink-0">
            <Link
              href="/admin/login"
              aria-label="Acessar área administrativa"
              className="hover:text-info hover:scale-110 transition-all duration-200 flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-full focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2"
            >
              <span className="hidden lg:inline">Admin</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Row: Categories Navigation - Hidden on mobile */}
        <nav className="hidden md:block border-t border-white/20 pt-3" aria-label="Navegação principal">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link
              href="/"
              prefetch={false}
              aria-label="Ir para página inicial"
              className="text-white/90 hover:text-accent-light font-semibold transition-all duration-200 px-5 py-3 hover:bg-white/10 rounded-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:scale-105"
            >
              Início
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                aria-expanded={showCategoriesMenu}
                aria-haspopup="true"
                aria-label="Menu de categorias"
                className="text-white/90 hover:text-accent-light font-semibold transition-all duration-200 px-5 py-3 hover:bg-white/10 rounded-full flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:scale-105"
              >
                Categorias
                <span className="text-xs" aria-hidden="true">▼</span>
              </button>

              {isMounted && showCategoriesMenu && categories.length > 0 && (
                <div
                  role="menu"
                  aria-label="Categorias de produtos"
                  className="absolute top-full left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-2xl py-3 min-w-[220px] z-[100] border-2 border-accent/20"
                >
                  <Link
                    href="/produtos"
                    role="menuitem"
                    prefetch={false}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowCategoriesMenu(false);
                      window.location.href = '/produtos';
                    }}
                    className="block px-6 py-3 hover:bg-accent/10 hover:text-accent transition-all font-medium focus-visible:bg-accent/10 focus-visible:outline-none"
                  >
                    Todos os Produtos
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/produtos?categoria=${category.slug}`}
                      role="menuitem"
                      prefetch={false}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCategoriesMenu(false);
                        window.location.href = `/produtos?categoria=${category.slug}`;
                      }}
                      className="block px-6 py-3 hover:bg-accent/10 hover:text-accent transition-all focus-visible:bg-accent/10 focus-visible:outline-none"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Brands Dropdown */}
            <div className="relative" ref={brandsRef}>
              <button
                onClick={() => setShowBrandsMenu(!showBrandsMenu)}
                aria-expanded={showBrandsMenu}
                aria-haspopup="true"
                aria-label="Menu de marcas"
                className="text-white/90 hover:text-accent-light font-semibold transition-all duration-200 px-5 py-3 hover:bg-white/10 rounded-full flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:scale-105"
              >
                Marcas
                <span className="text-xs" aria-hidden="true">▼</span>
              </button>

              {isMounted && showBrandsMenu && brands.length > 0 && (
                <div
                  role="menu"
                  aria-label="Marcas de produtos"
                  className="absolute top-full left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-2xl py-3 min-w-[220px] z-[100] border-2 border-accent/20"
                >
                  <Link
                    href="/produtos"
                    role="menuitem"
                    prefetch={false}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowBrandsMenu(false);
                      window.location.href = '/produtos';
                    }}
                    className="block px-6 py-3 hover:bg-accent/10 hover:text-accent transition-all font-medium focus-visible:bg-accent/10 focus-visible:outline-none"
                  >
                    Todas as Marcas
                  </Link>
                  {brands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/produtos?marca=${brand.slug}`}
                      role="menuitem"
                      prefetch={false}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowBrandsMenu(false);
                        window.location.href = `/produtos?marca=${brand.slug}`;
                      }}
                      className="block px-6 py-3 hover:bg-accent/10 hover:text-accent transition-all focus-visible:bg-accent/10 focus-visible:outline-none"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Types Dropdown */}
            <div className="relative" ref={typesRef}>
              <button
                onClick={() => setShowTypesMenu(!showTypesMenu)}
                aria-expanded={showTypesMenu}
                aria-haspopup="true"
                aria-label="Menu de tipos de produto"
                className="text-white/90 hover:text-accent-light font-semibold transition-all duration-200 px-5 py-3 hover:bg-white/10 rounded-full flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:scale-105"
              >
                Tipo
                <span className="text-xs" aria-hidden="true">▼</span>
              </button>

              {isMounted && showTypesMenu && (
                <div
                  role="menu"
                  aria-label="Tipos de produto"
                  className="absolute top-full left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-2xl py-3 min-w-[220px] z-[100] border-2 border-accent/20"
                >
                  <Link
                    href="/produtos?tipo=INDICA"
                    role="menuitem"
                    prefetch={false}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTypesMenu(false);
                      window.location.href = '/produtos?tipo=INDICA';
                    }}
                    className="block px-6 py-3 hover:bg-blue-50 hover:text-blue-700 transition-all focus-visible:bg-blue-50 focus-visible:outline-none"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Indica
                    </span>
                  </Link>
                  <Link
                    href="/produtos?tipo=SATIVA"
                    role="menuitem"
                    prefetch={false}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTypesMenu(false);
                      window.location.href = '/produtos?tipo=SATIVA';
                    }}
                    className="block px-6 py-3 hover:bg-green-50 hover:text-green-700 transition-all focus-visible:bg-green-50 focus-visible:outline-none"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Sativa
                    </span>
                  </Link>
                  <Link
                    href="/produtos?tipo=HIBRIDA"
                    role="menuitem"
                    prefetch={false}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTypesMenu(false);
                      window.location.href = '/produtos?tipo=HIBRIDA';
                    }}
                    className="block px-6 py-3 hover:bg-yellow-50 hover:text-yellow-700 transition-all focus-visible:bg-yellow-50 focus-visible:outline-none"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Híbrida
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              prefetch={false}
              aria-label="Blog sobre cannabis e CBD"
              className="text-white/90 hover:text-accent-light font-semibold transition-all duration-200 px-5 py-3 hover:bg-white/10 rounded-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:scale-105"
            >
              📚 Blog
            </Link>

            <Link
              href="/produtos"
              prefetch={false}
              aria-label="Ver todos os produtos"
              className="text-white/90 hover:text-accent-light font-semibold transition-all duration-200 px-5 py-3 hover:bg-white/10 rounded-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:scale-105"
            >
              Produtos
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMounted && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          categories={categories}
          brands={brands}
        />
      )}
    </header>
  );
}
