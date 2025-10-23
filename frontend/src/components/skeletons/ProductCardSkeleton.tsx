export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 animate-pulse" role="status" aria-label="Carregando produto">
      {/* Imagem Skeleton */}
      <div className="relative w-full h-72 bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shimmer"></div>

        {/* Badge Skeleton */}
        <div className="absolute top-3 right-3 bg-gray-300 h-7 w-24 rounded-lg"></div>
      </div>

      {/* Conteúdo Skeleton */}
      <div className="p-5 space-y-4">
        {/* Nome do Produto */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-4/5"></div>
          <div className="h-5 bg-gray-200 rounded w-3/5"></div>
        </div>

        {/* Badges de Marca e Tipo */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-md w-20"></div>
          <div className="h-6 bg-gray-200 rounded-md w-16"></div>
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>

        {/* Preço e Estoque */}
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>

        {/* Botão */}
        <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
      </div>

      <span className="sr-only">Carregando informações do produto...</span>
    </div>
  );
}
