'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

export default function ProdutosPage() {
  const searchParams = useSearchParams();
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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    // Aplicar busca da URL se existir
    const searchQuery = searchParams.get('search');
    const categorySlug = searchParams.get('categoria');
    const brandSlug = searchParams.get('marca');
    const typeParam = searchParams.get('tipo');

    if (searchQuery) {
      filterAndSortProducts(searchQuery);
    } else {
      filterAndSortProducts();
    }

    if (categorySlug && categories.length > 0) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);
      }
    }

    if (brandSlug && brands.length > 0) {
      const brand = brands.find(b => b.slug === brandSlug);
      if (brand) {
        setSelectedBrand(brand.id);
      }
    }

    if (typeParam) {
      setSelectedType(typeParam);
    }
  }, [products, selectedCategory, selectedBrand, selectedType, priceRange, sortBy, searchParams, categories, brands]);

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

  const filterAndSortProducts = (searchQuery?: string) => {
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
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedType('');
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('relevance');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nossos Produtos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Limpar
                    </button>
                  </div>

                  {/* Filtro por Categoria */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">📁 Categorias</h3>
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
                      <h3 className="font-semibold text-gray-900 mb-3">🏷️ Marcas</h3>
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
                    <h3 className="font-semibold text-gray-900 mb-3">🌿 Tipo</h3>
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
                    <h3 className="font-semibold text-gray-900 mb-3">💰 Faixa de Preço</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Mínimo: R$ {priceRange.min}</label>
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          step="50"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Máximo: R$ {priceRange.max}</label>
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          step="50"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>✅</span>
                      <span>Produtos Certificados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🚚</span>
                      <span>Entrega Rápida</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🔒</span>
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
                      className="lg:hidden bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      🎛️ Filtros
                    </button>

                    {/* Ordenação */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                    >
                      <option value="relevance">Relevância</option>
                      <option value="price-asc">Menor Preço</option>
                      <option value="price-desc">Maior Preço</option>
                      <option value="name-asc">Nome A-Z</option>
                      <option value="newest">Mais Recentes</option>
                    </select>
                  </div>
                </div>

                {/* Grid de Produtos */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="text-6xl mb-4">😔</div>
                    <p className="text-gray-600 text-lg font-semibold mb-2">
                      Nenhum produto encontrado
                    </p>
                    <p className="text-gray-500">
                      Tente ajustar os filtros ou limpar a busca
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
                    >
                      Limpar Filtros
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

      <Footer />
    </div>
  );
}
