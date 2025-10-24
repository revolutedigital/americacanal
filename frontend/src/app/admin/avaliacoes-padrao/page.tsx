'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Image from 'next/image';

interface DefaultReview {
  id: string;
  customerName: string;
  customerPhoto?: string;
  rating: number;
  comment: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
}

export default function AvaliacoesPadraoPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<DefaultReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhoto: '',
    rating: 5,
    comment: '',
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/default-reviews?tenantId=df192cfd-fb87-470a-8ea8-81784633409c');
      setReviews(response.data);
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      if (error.response?.status === 401) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.comment.trim()) {
      alert('Nome e comentário são obrigatórios');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/api/default-reviews/${editingId}`, formData);
        alert('Avaliação atualizada com sucesso!');
      } else {
        await api.post('/api/default-reviews', {
          ...formData,
          tenantId: 'df192cfd-fb87-470a-8ea8-81784633409c',
        });
        alert('Avaliação criada com sucesso!');
      }

      setFormData({
        customerName: '',
        customerPhoto: '',
        rating: 5,
        comment: '',
        isActive: true,
        isFeatured: false,
      });
      setEditingId(null);
      fetchReviews();
    } catch (error: any) {
      console.error('Error saving review:', error);
      alert(error.response?.data?.error || 'Erro ao salvar avaliação');
    }
  };

  const handleEdit = (review: DefaultReview) => {
    setEditingId(review.id);
    setFormData({
      customerName: review.customerName,
      customerPhoto: review.customerPhoto || '',
      rating: review.rating,
      comment: review.comment,
      isActive: review.isActive,
      isFeatured: review.isFeatured,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return;

    try {
      await api.delete(`/api/default-reviews/${id}`);
      alert('Avaliação excluída com sucesso!');
      fetchReviews();
    } catch (error: any) {
      console.error('Error deleting review:', error);
      alert(error.response?.data?.error || 'Erro ao excluir avaliação');
    }
  };

  const toggleActive = async (id: string) => {
    try {
      await api.put(`/api/default-reviews/${id}/toggle-active`);
      fetchReviews();
    } catch (error: any) {
      console.error('Error toggling active:', error);
      alert(error.response?.data?.error || 'Erro ao alterar status');
    }
  };

  const toggleFeatured = async (id: string) => {
    try {
      await api.put(`/api/default-reviews/${id}/toggle-featured`);
      fetchReviews();
    } catch (error: any) {
      console.error('Error toggling featured:', error);
      alert(error.response?.data?.error || 'Erro ao alterar destaque');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      customerName: '',
      customerPhoto: '',
      rating: 5,
      comment: '',
      isActive: true,
      isFeatured: false,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Avaliações Padrão</h1>
        <p className="text-gray-300 mt-2">
          Configure avaliações padrão para exibir em seus produtos
        </p>
      </div>

      {/* Warning Box */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Aviso Legal</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                A exibição de avaliações falsas pode violar leis de proteção ao consumidor em muitos países.
                Use este recurso por sua conta e risco. Recomendamos fortemente coletar avaliações reais de clientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? '✏️ Editar Avaliação' : '➕ Nova Avaliação'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Nome do Cliente *
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="input-field"
                placeholder="Ex: Maria Silva"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Foto do Cliente (URL)
              </label>
              <input
                type="url"
                value={formData.customerPhoto}
                onChange={(e) => setFormData({ ...formData, customerPhoto: e.target.value })}
                className="input-field"
                placeholder="https://exemplo.com/foto.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Use fotos de banco de imagens ou avatares genéricos
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Avaliação (Estrelas) *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`text-3xl ${
                    star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:scale-110 transition-transform`}
                >
                  ★
                </button>
              ))}
              <span className="ml-3 text-gray-300 self-center">
                {formData.rating} estrela{formData.rating > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Comentário *
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="input-field"
              rows={4}
              placeholder="Produto excelente! Recomendo..."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              💡 Escreva comentários realistas e naturais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-200">
                Avaliação Ativa (visível no site)
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-200">
                Destacar na Home (carrossel)
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="btn-primary">
              {editingId ? '💾 Salvar Alterações' : '➕ Criar Avaliação'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Avaliações */}
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            Avaliações Cadastradas ({reviews.length})
          </h2>
        </div>

        {reviews.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-gray-300 mb-2">Nenhuma avaliação cadastrada</p>
            <p className="text-sm text-gray-500">
              Crie sua primeira avaliação usando o formulário acima
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {review.customerPhoto ? (
                      <Image
                        src={review.customerPhoto}
                        alt={review.customerName}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-300 font-bold text-lg">
                          {review.customerName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{review.customerName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm text-gray-500">
                            {review.rating}.0
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {review.isFeatured && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                            ⭐ Destaque
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            review.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-700 text-gray-800'
                          }`}
                        >
                          {review.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-200 mt-3">{review.comment}</p>

                    {/* Actions */}
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleEdit(review)}
                        className="text-primary hover:text-primary-dark font-medium text-sm"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => toggleActive(review.id)}
                        className="text-gray-300 hover:text-gray-200 font-medium text-sm"
                      >
                        {review.isActive ? '👁️ Desativar' : '👁️‍🗨️ Ativar'}
                      </button>
                      <button
                        onClick={() => toggleFeatured(review.id)}
                        className="text-gray-300 hover:text-gray-200 font-medium text-sm"
                      >
                        {review.isFeatured ? '⭐ Remover Destaque' : '⭐ Destacar'}
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
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
          <strong>💡 Dicas para Avaliações Convincentes:</strong>
        </p>
        <ul className="list-disc list-inside text-sm text-blue-800 mt-2 space-y-1">
          <li>Use nomes brasileiros comuns e realistas</li>
          <li>Varie as pontuações (nem tudo precisa ser 5 estrelas)</li>
          <li>Escreva comentários detalhados e específicos sobre os produtos</li>
          <li>Inclua fotos de perfil genéricas ou avatares</li>
          <li>Ative estas avaliações nas Configurações &gt; Social Proof</li>
        </ul>
      </div>
    </div>
  );
}
