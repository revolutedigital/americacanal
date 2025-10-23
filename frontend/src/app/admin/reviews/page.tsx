'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  isVerified: boolean;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  product: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

type FilterStatus = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('PENDING');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [reviews, filterStatus, searchTerm]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/reviews/admin');
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

  const filterReviews = () => {
    let filtered = reviews;

    // Filtrar por status
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter((r) => r.status === filterStatus);
    }

    // Filtrar por busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.comment.toLowerCase().includes(term) ||
          r.customer.name.toLowerCase().includes(term) ||
          r.product.name.toLowerCase().includes(term)
      );
    }

    setFilteredReviews(filtered);
  };

  const handleApprove = async (reviewId: string) => {
    try {
      await api.put(`/api/reviews/${reviewId}/approve`);
      setReviews(reviews.map((r) =>
        r.id === reviewId ? { ...r, status: 'APPROVED' as const } : r
      ));
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Erro ao aprovar avaliação');
    }
  };

  const handleReject = async (reviewId: string) => {
    if (!confirm('Tem certeza que deseja rejeitar esta avaliação?')) return;

    try {
      await api.put(`/api/reviews/${reviewId}/reject`);
      setReviews(reviews.map((r) =>
        r.id === reviewId ? { ...r, status: 'REJECTED' as const } : r
      ));
    } catch (error) {
      console.error('Error rejecting review:', error);
      alert('Erro ao rejeitar avaliação');
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Tem certeza que deseja excluir permanentemente esta avaliação?')) return;

    try {
      await api.delete(`/api/reviews/${reviewId}`);
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Erro ao excluir avaliação');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? '' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    const labels = {
      PENDING: 'Pendente',
      APPROVED: 'Aprovado',
      REJECTED: 'Rejeitado',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === 'PENDING').length,
    approved: reviews.filter((r) => r.status === 'APPROVED').length,
    rejected: reviews.filter((r) => r.status === 'REJECTED').length,
    averageRating: reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0',
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
          <h1 className="text-3xl font-bold text-white">Moderação de Avaliações</h1>
          <p className="text-gray-300 mt-2">
            Gerencie e modere as avaliações dos clientes
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gray-800 rounded-lg shadow p-4">
            <p className="text-sm text-gray-300">Total</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <p className="text-sm text-yellow-800">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <p className="text-sm text-green-800">Aprovadas</p>
            <p className="text-2xl font-bold text-green-900">{stats.approved}</p>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-4">
            <p className="text-sm text-red-800">Rejeitadas</p>
            <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <p className="text-sm text-blue-800">Média</p>
            <p className="text-2xl font-bold text-blue-900">{stats.averageRating} ★</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-gray-800 rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Busca */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Buscar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por produto, cliente ou comentário..."
                className="input-field"
              />
            </div>

            {/* Filtro de Status */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Status
              </label>
              <div className="flex gap-2">
                {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as FilterStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === status
                        ? 'bg-primary text-white'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'ALL' ? 'Todos' : status === 'PENDING' ? 'Pendentes' : status === 'APPROVED' ? 'Aprovados' : 'Rejeitados'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Reviews */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="bg-gray-800 rounded-lg shadow p-12 text-center">
              <p className="text-gray-300">Nenhuma avaliação encontrada</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-start gap-4">
                  {/* Imagem do Produto */}
                  <img
                    src={review.product.imageUrl}
                    alt={review.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Conteúdo */}
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {renderStars(review.rating)}
                          {getStatusBadge(review.status)}
                          {review.isVerified && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-semibold">
                              ✓ Compra Verificada
                            </span>
                          )}
                        </div>
                        {review.title && (
                          <h3 className="font-semibold text-white mb-1">
                            {review.title}
                          </h3>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    {/* Comentário */}
                    <p className="text-gray-200">{review.comment}</p>

                    {/* Info do Cliente e Produto */}
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>
                        <strong>Cliente:</strong> {review.customer.name}
                      </span>
                      <span>•</span>
                      <span>
                        <strong>Produto:</strong> {review.product.name}
                      </span>
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2 pt-3 border-t border-gray-700">
                      {review.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleApprove(review.id)}
                            className="btn-primary text-sm"
                          >
                            ✓ Aprovar
                          </button>
                          <button
                            onClick={() => handleReject(review.id)}
                            className="btn-secondary text-sm"
                          >
                            ✕ Rejeitar
                          </button>
                        </>
                      )}
                      {review.status === 'APPROVED' && (
                        <button
                          onClick={() => handleReject(review.id)}
                          className="btn-secondary text-sm"
                        >
                          ✕ Rejeitar
                        </button>
                      )}
                      {review.status === 'REJECTED' && (
                        <button
                          onClick={() => handleApprove(review.id)}
                          className="btn-primary text-sm"
                        >
                          ✓ Aprovar
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-sm text-red-600 hover:text-red-700 px-4 py-2"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
  );
}
