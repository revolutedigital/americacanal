'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  _count?: {
    products: number;
  };
}

export default function CategoriasPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/categories?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c');
      setCategories(response.data);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      if (error.response?.status === 401) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Nome da categoria é obrigatório');
      return;
    }

    try {
      if (editingId) {
        // Update
        await api.put(`/api/categories/${editingId}`, formData);
        alert('Categoria atualizada com sucesso!');
      } else {
        // Create
        await api.post('/api/categories', {
          ...formData,
          tenantId: '0fb61585-3cb3-48b3-ae76-0a5358084a8c',
        });
        alert('Categoria criada com sucesso!');
      }

      setFormData({ name: '', description: '', isActive: true });
      setEditingId(null);
      fetchCategories();
    } catch (error: any) {
      console.error('Error saving category:', error);
      alert(error.response?.data?.error || 'Erro ao salvar categoria');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description || '',
      isActive: category.isActive,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

    try {
      await api.delete(`/api/categories/${id}`);
      alert('Categoria excluída com sucesso!');
      fetchCategories();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      alert(error.response?.data?.error || 'Erro ao excluir categoria');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', isActive: true });
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
        <h1 className="text-3xl font-bold text-white">Categorias</h1>
        <p className="text-gray-300 mt-2">
          Organize seus produtos em categorias
        </p>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? '✏️ Editar Categoria' : '➕ Nova Categoria'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Nome da Categoria *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="Ex: Óleos, Flores, Comestíveis..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Status
              </label>
              <label className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-200">
                  Categoria Ativa (visível no site)
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Descrição (Opcional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              rows={3}
              placeholder="Breve descrição da categoria..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="btn-primary"
            >
              {editingId ? '💾 Salvar Alterações' : '➕ Criar Categoria'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Categorias */}
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            Categorias Cadastradas ({categories.length})
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-gray-300 mb-2">Nenhuma categoria cadastrada</p>
            <p className="text-sm text-gray-500">
              Crie sua primeira categoria usando o formulário acima
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produtos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {category.name}
                        </div>
                        {category.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {category.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-mono text-gray-300 bg-gray-700 px-2 py-1 rounded">
                        {category.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">
                        {category._count?.products || 0} {category._count?.products === 1 ? 'produto' : 'produtos'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          category.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-700 text-gray-800'
                        }`}
                      >
                        {category.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-primary hover:text-primary-dark font-medium"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-700 font-medium"
                          disabled={(category._count?.products || 0) > 0}
                          title={
                            (category._count?.products || 0) > 0
                              ? 'Não é possível excluir categoria com produtos'
                              : 'Excluir categoria'
                          }
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dicas */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>💡 Dicas:</strong>
        </p>
        <ul className="list-disc list-inside text-sm text-blue-800 mt-2 space-y-1">
          <li>Categorias ajudam os clientes a encontrar produtos mais facilmente</li>
          <li>Você pode desativar uma categoria temporariamente sem excluí-la</li>
          <li>Categorias com produtos não podem ser excluídas</li>
          <li>O slug é gerado automaticamente a partir do nome</li>
        </ul>
      </div>
    </div>
  );
}
