'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Image from 'next/image';

interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
  _count?: {
    products: number;
  };
  createdAt: string;
}

export default function MarcasPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    imageUrl: '',
    isActive: true,
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/brands?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c');
      setBrands(response.data);
    } catch (error: any) {
      console.error('Error fetching brands:', error);
      if (error.response?.status === 401) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await api.post('/api/upload', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({ ...formData, imageUrl: response.data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem');
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.slug.trim()) {
      alert('Nome e Slug são obrigatórios');
      return;
    }

    try {
      const payload = {
        tenantId: '0fb61585-3cb3-48b3-ae76-0a5358084a8c',
        ...formData,
      };

      if (editingId) {
        await api.put(`/api/brands/${editingId}`, formData);
      } else {
        await api.post('/api/brands', payload);
      }

      resetForm();
      fetchBrands();
    } catch (error: any) {
      console.error('Error saving brand:', error);
      alert(error.response?.data?.error || 'Erro ao salvar marca');
    }
  };

  const handleEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setFormData({
      name: brand.name,
      slug: brand.slug,
      description: brand.description || '',
      imageUrl: brand.imageUrl || '',
      isActive: brand.isActive,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta marca?')) return;

    try {
      await api.delete(`/api/brands/${id}`);
      fetchBrands();
    } catch (error: any) {
      console.error('Error deleting brand:', error);
      alert(error.response?.data?.error || 'Erro ao excluir marca');
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      await api.put(`/api/brands/${id}/toggle-active`);
      fetchBrands();
    } catch (error) {
      console.error('Error toggling active:', error);
      alert('Erro ao alterar status');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      imageUrl: '',
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
        <h1 className="text-3xl font-bold text-white">Marcas</h1>
        <p className="text-gray-300 mt-2">
          Gerencie as marcas de produtos do seu e-commerce
        </p>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? '✏️ Editar Marca' : '➕ Nova Marca'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Nome da Marca *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="input-field"
                placeholder="Ex: Tree House"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="input-field"
                placeholder="tree-house"
                required
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Descrição (Opcional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              rows={3}
              placeholder="Descrição da marca"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Logo da Marca (Opcional)
            </label>
            <div className="flex items-center gap-4">
              {formData.imageUrl && (
                <div className="relative w-24 h-24">
                  <Image
                    src={formData.imageUrl}
                    alt="Logo"
                    fill
                    className="object-contain rounded border"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                className="text-sm"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-200">
              Marca Ativa
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button type="submit" className="btn-primary">
              {editingId ? 'Atualizar Marca' : 'Criar Marca'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Marcas */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            Marcas Cadastradas ({brands.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Produtos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-200">
              {brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {brand.imageUrl && (
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src={brand.imageUrl}
                            alt={brand.name}
                            fill
                            className="object-contain rounded"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">{brand.name}</div>
                        {brand.description && (
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {brand.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {brand.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {brand._count?.products || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(brand.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        brand.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {brand.isActive ? 'Ativa' : 'Inativa'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="text-primary hover:text-primary-dark"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {brands.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Nenhuma marca cadastrada ainda
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
