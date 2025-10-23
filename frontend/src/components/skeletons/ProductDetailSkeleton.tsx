export default function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse" role="status" aria-label="Carregando detalhes do produto">
      {/* Breadcrumbs Skeleton */}
      <div className="flex gap-2 mb-8">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-1"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-1"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galeria de Imagens Skeleton */}
        <div className="space-y-4">
          {/* Imagem Principal */}
          <div className="relative w-full h-96 bg-gray-200 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shimmer"></div>
          </div>

          {/* Miniaturas */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative h-20 bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shimmer"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Informações do Produto Skeleton */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex gap-2">
            <div className="h-7 bg-gray-200 rounded-full w-24"></div>
            <div className="h-7 bg-gray-200 rounded-full w-20"></div>
          </div>

          {/* Título */}
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded w-4/5"></div>
            <div className="h-10 bg-gray-200 rounded w-3/5"></div>
          </div>

          {/* Avaliações */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-5 w-5 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-5 bg-gray-200 rounded w-24"></div>
          </div>

          {/* Preço */}
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded w-48"></div>
            <div className="h-5 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Alerta de Estoque */}
          <div className="h-20 bg-gray-100 border border-gray-200 rounded-lg"></div>

          {/* Descrição */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>

          {/* Seletor de Quantidade */}
          <div className="h-12 bg-gray-200 rounded-lg w-32"></div>

          {/* Botões */}
          <div className="space-y-3">
            <div className="h-14 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Seções Adicionais */}
      <div className="mt-16 space-y-8">
        {/* Benefícios */}
        <div className="h-40 bg-gray-100 rounded-xl"></div>

        {/* Reviews */}
        <div className="h-64 bg-gray-100 rounded-xl"></div>

        {/* Produtos Relacionados */}
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>

      <span className="sr-only">Carregando detalhes completos do produto...</span>
    </div>
  );
}
