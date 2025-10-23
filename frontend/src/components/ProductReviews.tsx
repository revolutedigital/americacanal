'use client';

interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  customer: {
    name: string;
  };
  isVerified: boolean;
  createdAt: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ProductReviews({ reviews, averageRating, totalReviews }: ProductReviewsProps) {
  if (totalReviews === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Este produto ainda não possui avaliações.</p>
        <p className="text-sm text-gray-500 mt-2">Seja o primeiro a avaliar!</p>
      </div>
    );
  }

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'text-2xl' : 'text-base';
    return (
      <div className={`flex ${sizeClass}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calcular distribuição de estrelas
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="space-y-8">
      {/* Resumo de Avaliações */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Avaliações dos Clientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Média */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            {renderStars(Math.round(averageRating), 'lg')}
            <p className="text-gray-600 mt-2">
              Baseado em {totalReviews} {totalReviews === 1 ? 'avaliação' : 'avaliações'}
            </p>
          </div>

          {/* Distribuição */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 w-12">
                  {rating} ★
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  {renderStars(review.rating)}
                  {review.isVerified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      ✓ Compra Verificada
                    </span>
                  )}
                </div>
                {review.title && (
                  <h3 className="font-semibold text-gray-900">{review.title}</h3>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(review.createdAt)}
              </span>
            </div>

            <p className="text-gray-700 mb-3">{review.comment}</p>

            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">{review.customer.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
