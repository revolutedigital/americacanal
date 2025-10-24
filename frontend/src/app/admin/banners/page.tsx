'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Banner {
  id: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  imageMobile?: string;
  linkUrl?: string;
  linkText?: string;
  type: 'HOME' | 'CATEGORY' | 'PRODUCT';
  categoryId?: string;
  category?: Category;
  isActive: boolean;
  order: number;
  impressions: number;
  clicks: number;
  createdAt: string;
}

type BannerType = 'HOME' | 'CATEGORY';

export default function BannersPage() {
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<BannerType>('HOME');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    imageMobile: '',
    linkUrl: '',
    linkText: '',
    type: 'HOME' as BannerType,
    categoryId: '',
    isActive: true,
  });

  useEffect(() => {
    fetchBanners();
    fetchCategories();
  }, [selectedType]);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/banners?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c&type=${selectedType}`);
      setBanners(response.data);
    } catch (error: any) {
      console.error('Error fetching banners:', error);
      if (error.response?.status === 401) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c');
      setCategories(response.data.filter((cat: Category) => cat));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageUpload = async (file: File, isMobile: boolean = false) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.url;
      if (isMobile) {
        setFormData(prev => ({ ...prev, imageMobile: imageUrl }));
      } else {
        setFormData(prev => ({ ...prev, imageUrl }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl.trim()) {
      alert('Imagem é obrigatória');
      return;
    }

    if (formData.type === 'CATEGORY' && !formData.categoryId) {
      alert('Selecione uma categoria para banners do tipo CATEGORIA');
      return;
    }

    try {
      const payload = {
        ...formData,
        categoryId: formData.type === 'CATEGORY' ? formData.categoryId : undefined,
      };

      if (editingId) {
        await api.put(`/api/banners/${editingId}`, payload);
        alert('Banner atualizado com sucesso!');
      } else {
        await api.post('/api/banners', {
          ...payload,
          tenantId: '0fb61585-3cb3-48b3-ae76-0a5358084a8c',
        });
        alert('Banner criado com sucesso!');
      }

      setFormData({
        title: '',
        subtitle: '',
        imageUrl: '',
        imageMobile: '',
        linkUrl: '',
        linkText: '',
        type: selectedType,
        categoryId: '',
        isActive: true,
      });
      setEditingId(null);
      fetchBanners();
    } catch (error: any) {
      console.error('Error saving banner:', error);
      alert(error.response?.data?.error || 'Erro ao salvar banner');
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingId(banner.id);
    setFormData({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      imageUrl: banner.imageUrl,
      imageMobile: banner.imageMobile || '',
      linkUrl: banner.linkUrl || '',
      linkText: banner.linkText || '',
      type: banner.type as BannerType,
      categoryId: banner.categoryId || '',
      isActive: banner.isActive,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este banner?')) return;

    try {
      await api.delete(`/api/banners/${id}`);
      alert('Banner excluído com sucesso!');
      fetchBanners();
    } catch (error: any) {
      console.error('Error deleting banner:', error);
      alert(error.response?.data?.error || 'Erro ao excluir banner');
    }
  };

  const toggleActive = async (id: string) => {
    try {
      await api.put(`/api/banners/${id}/toggle-active`);
      fetchBanners();
    } catch (error: any) {
      console.error('Error toggling active:', error);
      alert(error.response?.data?.error || 'Erro ao alterar status');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      subtitle: '',
      imageUrl: '',
      imageMobile: '',
      linkUrl: '',
      linkText: '',
      type: selectedType,
      categoryId: '',
      isActive: true,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Banners</h1>
        <p className="text-gray-300 mt-2">
          Gerencie os banners da home e das páginas de categoria
        </p>
      </div>

      {/* Type Selector */}
      <div className="bg-gray-800 rounded-lg shadow p-4">
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSelectedType('HOME');
              setFormData(prev => ({ ...prev, type: 'HOME', categoryId: '' }));
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedType === 'HOME'
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-200'
            }`}
          >
            🏠 Banners da Home
          </button>
          <button
            onClick={() => {
              setSelectedType('CATEGORY');
              setFormData(prev => ({ ...prev, type: 'CATEGORY' }));
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedType === 'CATEGORY'
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-200'
            }`}
          >
            📁 Banners de Categoria
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? '✏️ Editar Banner' : '➕ Novo Banner'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Desktop Image */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Imagem Desktop * (Recomendado: 1920x600px)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {formData.imageUrl ? (
                  <div className="relative">
                    <Image
                      src={formData.imageUrl}
                      alt="Banner"
                      width={400}
                      height={150}
                      className="rounded-lg object-cover w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: '' })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-4xl mb-2">📸</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, false);
                      }}
                      className="hidden"
                      id="desktop-upload"
                    />
                    <label htmlFor="desktop-upload" className="btn-secondary cursor-pointer inline-block">
                      Escolher Imagem
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      JPG, PNG ou WEBP (máx. 5MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Imagem Mobile (Opcional - Recomendado: 800x800px)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {formData.imageMobile ? (
                  <div className="relative">
                    <Image
                      src={formData.imageMobile}
                      alt="Banner Mobile"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageMobile: '' })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-4xl mb-2">📱</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, true);
                      }}
                      className="hidden"
                      id="mobile-upload"
                    />
                    <label htmlFor="mobile-upload" className="btn-secondary cursor-pointer inline-block">
                      Escolher Imagem
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Versão otimizada para mobile
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Título (Opcional)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="Ex: Promoção de Verão"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Subtítulo (Opcional)
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="input-field"
                placeholder="Ex: Até 50% OFF"
              />
            </div>
          </div>

          {/* Category (if CATEGORY type) */}
          {formData.type === 'CATEGORY' && (
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Categoria *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Nenhuma categoria encontrada. <a href="/admin/categorias" className="text-primary hover:underline">Criar categoria</a>
                </p>
              )}
            </div>
          )}

          {/* Link URL and Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Link do Banner (Opcional)
              </label>
              <input
                type="url"
                value={formData.linkUrl}
                onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                className="input-field"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Texto do Botão (Opcional)
              </label>
              <input
                type="text"
                value={formData.linkText}
                onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                className="input-field"
                placeholder="Ex: Ver Ofertas"
              />
            </div>
          </div>

          {/* Active */}
          <label className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-gray-200">
              Banner Ativo (visível no site)
            </span>
          </label>

          <div className="flex gap-3">
            <button type="submit" className="btn-primary">
              {editingId ? '💾 Salvar Alterações' : '➕ Criar Banner'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Banners */}
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {selectedType === 'HOME' ? 'Banners da Home' : 'Banners de Categoria'} ({banners.length})
          </h2>
        </div>

        {banners.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-gray-300 mb-2">Nenhum banner cadastrado</p>
            <p className="text-sm text-gray-500">
              Crie seu primeiro banner usando o formulário acima
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`p-6 hover:bg-gray-800 ${
                  !banner.isActive ? 'opacity-60' : ''
                }`}
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title || 'Banner'}
                      width={200}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        {banner.title ? (
                          <h3 className="font-semibold text-white text-lg">
                            {banner.title}
                          </h3>
                        ) : (
                          <h3 className="font-semibold text-gray-500 text-lg italic">
                            Banner sem título
                          </h3>
                        )}
                        {banner.subtitle && (
                          <p className="text-gray-300 mt-1">{banner.subtitle}</p>
                        )}
                        {banner.category && (
                          <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                            📁 {banner.category.name}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 items-end">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            banner.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-700 text-gray-800'
                          }`}
                        >
                          {banner.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                        <div className="text-xs text-gray-500">
                          👁️ {banner.impressions} | 🖱️ {banner.clicks}
                        </div>
                      </div>
                    </div>

                    {banner.linkUrl && (
                      <p className="text-sm text-gray-500 mt-2">
                        🔗 {banner.linkUrl}
                        {banner.linkText && ` - "${banner.linkText}"`}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="text-primary hover:text-primary-dark font-medium text-sm"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => toggleActive(banner.id)}
                        className="text-gray-300 hover:text-gray-200 font-medium text-sm"
                      >
                        {banner.isActive ? '👁️ Desativar' : '👁️‍🗨️ Ativar'}
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dicas */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>💡 Dicas para Banners Eficientes:</strong>
        </p>
        <ul className="list-disc list-inside text-sm text-blue-800 mt-2 space-y-1">
          <li>Use imagens de alta qualidade (1920x600px para desktop)</li>
          <li>Crie versão mobile separada para melhor exibição (800x800px)</li>
          <li>Adicione CTA (Call-to-Action) claro com texto do botão</li>
          <li>Teste diferentes banners e acompanhe impressões e clicks</li>
          <li>Mantenha no máximo 3-5 banners ativos na home</li>
        </ul>
      </div>
    </div>
  );
}
