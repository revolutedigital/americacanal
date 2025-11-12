'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCardSSR from '@/components/ProductCardSSR';
import { Product } from '@/lib/types';
import api from '@/lib/api';

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

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'name-asc' | 'newest';

export default function ProdutosContent() {
  const searchParams = useSearchParams();

  // Estado para controlar hydration - evita erros de SSR/Client mismatch
  const [isMounted, setIsMounted] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Ref para controlar se já inicializou filtros da URL
  const hasInitializedFilters = useRef(false);

  // Garantir que componente só renderiza após hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Função para filtrar e ordenar produtos - declarada antes dos useEffects
  const filterAndSortProducts = useCallback((searchQuery?: string) => {
    let filtered = [...products];

    // Filtrar por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Filtrar por categoria
    if (selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }

    // Filtrar por marca
    if (selectedBrand) {
      filtered = filtered.filter(p => p.brandId === selectedBrand);
    }

    // Filtrar por tipo
    if (selectedType) {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    // Filtrar por faixa de preço
    filtered = filtered.filter(p => {
      const price = Number(p.price);
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Ordenar
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a: Product, b: Product) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        filtered.sort((a: Product, b: Product) => Number(b.price) - Number(a.price));
        break;
      case 'name-asc':
        filtered.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a: Product, b: Product) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // relevance - sem ordenação específica
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedBrand, selectedType, priceRange, sortBy]);

  // Fetch functions
  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Effects
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  // Aplicar filtros da URL apenas UMA VEZ quando dados carregarem
  useEffect(() => {
    // Só roda se ainda não inicializou e os dados estão prontos
    if (hasInitializedFilters.current || categories.length === 0 || brands.length === 0) {
      return;
    }

    const categorySlug = searchParams.get('categoria');
    const brandSlug = searchParams.get('marca');
    const typeParam = searchParams.get('tipo');

    // Aplicar filtros da URL
    if (categorySlug) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);
      }
    }

    if (brandSlug) {
      const brand = brands.find(b => b.slug === brandSlug);
      if (brand) {
        setSelectedBrand(brand.id);
      }
    }

    if (typeParam) {
      setSelectedType(typeParam);
    }

    // Marcar como inicializado
    hasInitializedFilters.current = true;
  }, [categories, brands, searchParams]);

  // Aplicar filtros e ordenação
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      filterAndSortProducts(searchQuery);
    } else {
      filterAndSortProducts();
    }
  }, [filterAndSortProducts, searchParams]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedType('');
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('relevance');
  };

  // Prevenir hydration mismatch - renderizar loading até mounted
  if (!isMounted) {
    return (
      <main className="flex-grow" suppressHydrationWarning>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-primary-vibrant to-primary bg-clip-text text-transparent mb-4">
              🌿 Nossos Produtos
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Descubra nossa seleção premium de produtos de cannabis de alta qualidade
            </p>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-12">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-primary-vibrant to-primary bg-clip-text text-transparent mb-4">
            🌿 Nossos Produtos
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Descubra nossa seleção premium de produtos de cannabis de alta qualidade
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar de Filtros */}
            <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 sticky top-4 border-2 border-accent/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-primary-vibrant bg-clip-text text-transparent">🎛️ Filtros</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm font-semibold text-info hover:text-info-dark hover:scale-110 transition-all"
                  >
                    Limpar
                  </button>
                </div>

                {/* Filtro por Categoria */}
                <div className="mb-6">
                  <h3 className="font-bold text-primary-vibrant mb-3 text-lg">📁 Categorias</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Todas</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por Marca */}
                {brands.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-accent mb-3 text-lg">🏷️ Marcas</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === ''}
                          onChange={() => setSelectedBrand('')}
                          className="mr-2"
                        />
                        <span className="text-gray-700">Todas</span>
                      </label>
                      {brands.map((brand) => (
                        <label key={brand.id} className="flex items-center">
                          <input
                            type="radio"
                            name="brand"
                            checked={selectedBrand === brand.id}
                            onChange={() => setSelectedBrand(brand.id)}
                            className="mr-2"
                          />
                          <span className="text-gray-700">{brand.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Filtro por Tipo */}
                <div className="mb-6">
                  <h3 className="font-bold text-info mb-3 text-lg">🌿 Tipo</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === ''}
                        onChange={() => setSelectedType('')}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Todos</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === 'INDICA'}
                        onChange={() => setSelectedType('INDICA')}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Indica</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === 'SATIVA'}
                        onChange={() => setSelectedType('SATIVA')}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Sativa</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === 'HIBRIDA'}
                        onChange={() => setSelectedType('HIBRIDA')}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Híbrida</span>
                    </label>
                  </div>
                </div>

                {/* Filtro por Preço */}
                <div className="mb-6">
                  <h3 className="font-bold text-urgent mb-3 text-lg">💰 Faixa de Preço</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Mínimo</label>
                      <input
                        type="number"
                        min="0"
                        max="10000"
                        step="50"
                        value={priceRange.min}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPriceRange({ ...priceRange, min: Math.max(0, Math.min(val, priceRange.max)) });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-urgent"
                        placeholder="R$ 0"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Máximo</label>
                      <input
                        type="number"
                        min="0"
                        max="10000"
                        step="50"
                        value={priceRange.max}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPriceRange({ ...priceRange, max: Math.max(priceRange.min, Math.min(10000, val)) });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-urgent"
                        placeholder="R$ 10000"
                      />
                    </div>
                    {(priceRange.min > 0 || priceRange.max < 10000) && (
                      <button
                        onClick={() => setPriceRange({ min: 0, max: 10000 })}
                        className="text-xs text-urgent hover:underline w-full text-left"
                      >
                        ✕ Limpar filtro de preço
                      </button>
                    )}
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="border-t-2 border-accent/20 pt-6 space-y-3 text-sm font-semibold">
                  <div className="flex items-center gap-2 text-accent">
                    <span className="text-lg">✅</span>
                    <span>Produtos Certificados</span>
                  </div>
                  <div className="flex items-center gap-2 text-info">
                    <span className="text-lg">🚚</span>
                    <span>Entrega Rápida</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-vibrant">
                    <span className="text-lg">🔒</span>
                    <span>Compra Segura</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Produtos */}
            <div className="lg:col-span-3">
              {/* Barra de Ordenação e Filtros Mobile */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="text-gray-600">
                  <span className="font-semibold">{filteredProducts.length}</span> produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </div>

                <div className="flex items-center gap-4">
                  {/* Botão Filtros Mobile */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden bg-gradient-to-r from-primary-vibrant to-primary text-white px-5 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:scale-105 transition-transform"
                  >
                    🎛️ Filtros
                  </button>

                  {/* Ordenação */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="border-2 border-accent/30 rounded-xl px-4 py-3 bg-white font-semibold text-gray-700 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  >
                    <option value="relevance">📊 Relevância</option>
                    <option value="price-asc">💰 Menor Preço</option>
                    <option value="price-desc">💎 Maior Preço</option>
                    <option value="name-asc">🔤 Nome A-Z</option>
                    <option value="newest">🆕 Mais Recentes</option>
                  </select>
                </div>
              </div>

              {/* Grid de Produtos */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                  <div className="text-7xl mb-4">😔</div>
                  <p className="text-gray-800 text-2xl font-bold mb-2">
                    Nenhum produto encontrado
                  </p>
                  <p className="text-gray-600 text-lg mb-6">
                    Tente ajustar os filtros ou limpar a busca
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-gradient-accent hover:scale-105 transition-transform"
                  >
                    🔄 Limpar Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCardSSR key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
