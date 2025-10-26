'use client';

import { FormEvent, useState, useEffect } from 'react';
import { ProductFormData } from '@/lib/types';
import MultipleImageUpload from './MultipleImageUpload';
import ProductFAQManager from './ProductFAQManager';
import RelatedProductsSelector from './RelatedProductsSelector';
import api from '@/lib/api';

interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

interface Brand {
  id: string;
  name: string;
  isActive: boolean;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => Promise<void>;
  submitLabel: string;
}

type TabType = 'basic' | 'images' | 'faqs' | 'related';

export default function ProductForm({
  initialData,
  onSubmit,
  submitLabel,
}: ProductFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: '',
      description: '',
      price: 0,
      comparePrice: undefined,
      imageUrl: '',
      images: [],
      stock: 0,
      lowStockAlert: 5,
      isActive: true,
      categoryId: undefined,
      brandId: undefined,
      type: undefined,
      faqs: [],
      relatedProductIds: [],
      metaTitle: undefined,
      metaDescription: undefined,
      metaKeywords: undefined,
    }
  );
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c');
      setCategories(response.data.filter((cat: Category) => cat.isActive));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await api.get('/api/brands?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c');
      setBrands(response.data.filter((brand: Brand) => brand.isActive));
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    if (!formData.name || formData.name.trim() === '') {
      alert('Por favor, preencha o nome do produto');
      setActiveTab('basic');
      return;
    }

    if (!formData.description || formData.description.trim() === '') {
      alert('Por favor, preencha a descrição do produto');
      setActiveTab('basic');
      return;
    }

    if (!formData.price || formData.price <= 0) {
      alert('Por favor, informe um preço válido');
      setActiveTab('basic');
      return;
    }

    if (formData.comparePrice && formData.comparePrice <= formData.price) {
      alert('O preço de comparação deve ser maior que o preço de venda');
      setActiveTab('basic');
      return;
    }

    if (!formData.stock || formData.stock < 0) {
      alert('Por favor, informe o estoque');
      setActiveTab('basic');
      return;
    }

    if (!formData.imageUrl || formData.imageUrl.trim() === '') {
      alert('Por favor, adicione pelo menos uma imagem para o produto');
      setActiveTab('images');
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesChange = (images: string[], mainImage: string) => {
    setFormData({
      ...formData,
      images: images,
      imageUrl: mainImage,
    });
  };

  const generateMetaTags = () => {
    if (!formData.name || !formData.description) {
      alert('Preencha o nome e descrição primeiro');
      return;
    }

    const categoryName = categories.find(c => c.id === formData.categoryId)?.name || '';
    const brandName = brands.find(b => b.id === formData.brandId)?.name || '';

    // Gerar meta title
    const metaTitle = `${formData.name} | America Cannabis`;

    // Gerar meta description (primeiros 150 caracteres da descrição + call to action)
    const shortDesc = formData.description.substring(0, 140).trim();
    const metaDescription = `${shortDesc}... Compre agora com entrega rápida! 🚀`;

    // Gerar keywords
    const keywords: string[] = [
      formData.name.toLowerCase(),
      'cannabis',
      'cbd',
      'thc',
      'america cannabis',
    ];

    if (categoryName) keywords.push(categoryName.toLowerCase());
    if (brandName) keywords.push(brandName.toLowerCase());
    if (formData.type) keywords.push(formData.type.toLowerCase());

    // Adicionar termos comuns baseados no nome
    if (formData.name.toLowerCase().includes('vape')) keywords.push('vape', 'vaporizador');
    if (formData.name.toLowerCase().includes('goma')) keywords.push('goma', 'edible', 'comestível');
    if (formData.name.toLowerCase().includes('óleo')) keywords.push('óleo', 'tinturas');

    const metaKeywords = [...new Set(keywords)].join(', ');

    setFormData({
      ...formData,
      metaTitle,
      metaDescription,
      metaKeywords,
    });

    alert('✅ Meta tags geradas automaticamente!');
  };

  const tabs = [
    { id: 'basic' as TabType, label: 'Informações Básicas', icon: '📋' },
    { id: 'images' as TabType, label: 'Imagens', icon: '📸', badge: formData.images?.length || 0 },
    { id: 'faqs' as TabType, label: 'FAQs', icon: '❓', badge: formData.faqs?.length || 0 },
    { id: 'related' as TabType, label: 'Produtos Relacionados', icon: '🔗', badge: formData.relatedProductIds?.length || 0 },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs Navigation */}
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-700">
          <nav className="flex -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2
                  ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Tab: Informações Básicas */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  Informações do Produto
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Nome do Produto *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="input-field"
                      placeholder="Ex: Óleo de CBD 1000mg"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Descrição Completa *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="input-field"
                      rows={6}
                      placeholder="Descreva os benefícios, ingredientes, modo de uso, certificações..."
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      💡 Quanto mais detalhada a descrição, maior a taxa de conversão
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Categoria
                    </label>
                    <select
                      value={formData.categoryId || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          categoryId: e.target.value || undefined,
                        })
                      }
                      className="input-field"
                    >
                      <option value="">Selecione uma categoria (opcional)</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      💡 Categorias ajudam clientes a filtrar produtos. {categories.length === 0 && (
                        <a href="/admin/categorias" className="text-primary hover:underline">
                          Criar primeira categoria
                        </a>
                      )}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Marca
                    </label>
                    <select
                      value={formData.brandId || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brandId: e.target.value || undefined,
                        })
                      }
                      className="input-field"
                    >
                      <option value="">Selecione uma marca (opcional)</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      🏷️ {brands.length === 0 && (
                        <a href="/admin/marcas" className="text-primary hover:underline">
                          Criar primeira marca
                        </a>
                      )}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Tipo
                    </label>
                    <select
                      value={formData.type || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value || undefined,
                        })
                      }
                      className="input-field"
                    >
                      <option value="">Selecione o tipo (opcional)</option>
                      <option value="INDICA">Indica</option>
                      <option value="SATIVA">Sativa</option>
                      <option value="HIBRIDA">Híbrida</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      🌿 Tipo de cannabis do produto
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Preço de Venda (R$) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                      }
                      className="input-field"
                      required
                      min="0.01"
                      placeholder="149.90"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Preço de Comparação (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.comparePrice || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          comparePrice: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                      }
                      className="input-field"
                      min="0.01"
                      placeholder="199.90"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      💡 Preço "de" para mostrar desconto (deve ser maior que o preço de venda)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Estoque Disponível *
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })
                      }
                      className="input-field"
                      required
                      min="0"
                      placeholder="50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Alerta de Estoque Baixo
                    </label>
                    <input
                      type="number"
                      value={formData.lowStockAlert || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lowStockAlert: e.target.value ? parseInt(e.target.value) : undefined,
                        })
                      }
                      className="input-field"
                      min="1"
                      placeholder="5"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      💡 Mostra "Últimas unidades!" quando o estoque atingir este valor
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({ ...formData, isActive: e.target.checked })
                        }
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-200 block">
                          Produto Ativo
                        </span>
                        <span className="text-xs text-gray-500">
                          Quando ativo, o produto ficará visível na loja
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* SEO Section */}
              <div className="pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">SEO & Meta Tags</h3>
                    <p className="text-sm text-gray-300">
                      Otimize para mecanismos de busca (Google, Bing)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={generateMetaTags}
                    className="btn-secondary text-sm"
                    disabled={!formData.name || !formData.description}
                  >
                    ✨ Gerar Automaticamente
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, metaTitle: e.target.value })
                      }
                      className="input-field"
                      placeholder="Ex: Vape Delta 8 Premium 2ml | America Cannabis"
                      maxLength={60}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.metaTitle?.length || 0}/60 caracteres - Aparece nos resultados do Google
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metaDescription || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, metaDescription: e.target.value })
                      }
                      className="input-field"
                      rows={3}
                      placeholder="Descrição curta que aparece no Google (140-160 caracteres)"
                      maxLength={160}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.metaDescription?.length || 0}/160 caracteres - Descrição nos resultados de busca
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={formData.metaKeywords || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, metaKeywords: e.target.value })
                      }
                      className="input-field"
                      placeholder="vape, cannabis, cbd, delta 8, thc (separados por vírgula)"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Palavras-chave separadas por vírgula para SEO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Imagens */}
          {activeTab === 'images' && (
            <div>
              <MultipleImageUpload
                images={formData.images || []}
                mainImage={formData.imageUrl}
                onImagesChange={handleImagesChange}
                maxImages={10}
              />
            </div>
          )}

          {/* Tab: FAQs */}
          {activeTab === 'faqs' && (
            <div>
              <ProductFAQManager
                faqs={formData.faqs || []}
                onChange={(faqs) => setFormData({ ...formData, faqs })}
              />
            </div>
          )}

          {/* Tab: Produtos Relacionados */}
          {activeTab === 'related' && (
            <div>
              <RelatedProductsSelector
                currentProductId={initialData?.name ? 'editing' : undefined}
                selectedProductIds={formData.relatedProductIds || []}
                onChange={(productIds) =>
                  setFormData({ ...formData, relatedProductIds: productIds })
                }
                maxRelated={8}
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300">
            {!formData.imageUrl && (
              <p className="text-red-600">⚠️ Adicione pelo menos uma imagem antes de salvar</p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !formData.imageUrl}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : submitLabel}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
