'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface GlobalBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export default function BeneficiosPage() {
  const router = useRouter();
  const [benefits, setBenefits] = useState<GlobalBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/benefits/global?tenantId=df192cfd-fb87-470a-8ea8-81784633409c');
      setBenefits(response.data);
    } catch (error: any) {
      console.error('Error fetching benefits:', error);
      if (error.response?.status === 401) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.icon.trim() || !formData.title.trim() || !formData.description.trim()) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    if (benefits.filter(b => b.isActive).length >= 10 && formData.isActive && !editingId) {
      alert('Você já tem 10 benefícios ativos. Desative um para adicionar outro.');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/api/benefits/global/${editingId}`, formData);
        alert('Benefício atualizado com sucesso!');
      } else {
        await api.post('/api/benefits/global', {
          ...formData,
          tenantId: 'df192cfd-fb87-470a-8ea8-81784633409c',
        });
        alert('Benefício criado com sucesso!');
      }

      setFormData({
        icon: '',
        title: '',
        description: '',
        isActive: true,
      });
      setEditingId(null);
      fetchBenefits();
    } catch (error: any) {
      console.error('Error saving benefit:', error);
      alert(error.response?.data?.error || 'Erro ao salvar benefício');
    }
  };

  const handleEdit = (benefit: GlobalBenefit) => {
    setEditingId(benefit.id);
    setFormData({
      icon: benefit.icon,
      title: benefit.title,
      description: benefit.description,
      isActive: benefit.isActive,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este benefício?')) return;

    try {
      await api.delete(`/api/benefits/global/${id}`);
      alert('Benefício excluído com sucesso!');
      fetchBenefits();
    } catch (error: any) {
      console.error('Error deleting benefit:', error);
      alert(error.response?.data?.error || 'Erro ao excluir benefício');
    }
  };

  const toggleActive = async (id: string) => {
    try {
      await api.put(`/api/benefits/global/${id}/toggle-active`);
      fetchBenefits();
    } catch (error: any) {
      console.error('Error toggling active:', error);
      alert(error.response?.data?.error || 'Erro ao alterar status');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      icon: '',
      title: '',
      description: '',
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

  const activeBenefitsCount = benefits.filter(b => b.isActive).length;
  const suggestedIcons = ['🚚', '💳', '🔒', '📦', '✅', '🎁', '⚡', '🏆', '💯', '🌟'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Benefícios Globais</h1>
        <p className="text-gray-300 mt-2">
          Configure benefícios que aparecerão em todos os produtos
        </p>
      </div>

      {/* Counter */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-900">
              <strong>Benefícios Ativos:</strong> {activeBenefitsCount} / 10
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Você pode ter até 10 benefícios ativos simultaneamente
            </p>
          </div>
          {activeBenefitsCount >= 10 && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              ⚠️ Limite Atingido
            </span>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? '✏️ Editar Benefício' : '➕ Novo Benefício'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Ícone (Emoji) *
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="input-field"
              placeholder="Ex: 🚚"
              maxLength={10}
              required
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs text-gray-300">Sugestões:</span>
              {suggestedIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className="text-2xl hover:scale-110 transition-transform"
                  title="Clique para usar este ícone"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="Ex: Frete Grátis"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Descrição *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              placeholder="Ex: Em compras acima de R$ 99"
              required
            />
          </div>

          <label className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-gray-200">
              Benefício Ativo (visível no site)
            </span>
          </label>

          <div className="flex gap-3">
            <button type="submit" className="btn-primary">
              {editingId ? '💾 Salvar Alterações' : '➕ Criar Benefício'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Benefícios */}
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            Benefícios Cadastrados ({benefits.length})
          </h2>
        </div>

        {benefits.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🎁</div>
            <p className="text-gray-300 mb-2">Nenhum benefício cadastrado</p>
            <p className="text-sm text-gray-500">
              Crie seu primeiro benefício usando o formulário acima
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className={`p-6 hover:bg-gray-800 ${
                  !benefit.isActive ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="text-4xl flex-shrink-0">{benefit.icon}</div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-lg">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-300 mt-1">{benefit.description}</p>
                      </div>

                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          benefit.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-700 text-gray-800'
                        }`}
                      >
                        {benefit.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleEdit(benefit)}
                        className="text-primary hover:text-primary-dark font-medium text-sm"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => toggleActive(benefit.id)}
                        className="text-gray-300 hover:text-gray-200 font-medium text-sm"
                      >
                        {benefit.isActive ? '👁️ Desativar' : '👁️‍🗨️ Ativar'}
                      </button>
                      <button
                        onClick={() => handleDelete(benefit.id)}
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
          <strong>💡 Exemplos de Benefícios Populares:</strong>
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800 mt-2">
          <li>🚚 Frete Grátis - Em compras acima de R$ 99</li>
          <li>💳 Parcelamento - Até 12x sem juros</li>
          <li>🔒 Compra Segura - Dados protegidos SSL</li>
          <li>📦 Entrega Rápida - Em até 7 dias úteis</li>
          <li>✅ Garantia - 30 dias de satisfação</li>
          <li>🎁 Brinde - Grátis na primeira compra</li>
        </ul>
        <p className="text-xs text-blue-700 mt-3">
          💡 Ative estes benefícios nas Configurações &gt; Social Proof
        </p>
      </div>
    </div>
  );
}
