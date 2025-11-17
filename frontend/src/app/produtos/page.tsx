import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import CanonicalUrl from '@/components/CanonicalUrl'; // TEMPORARIAMENTE REMOVIDO PARA DEBUG
import ProdutosContent from '@/components/ProdutosContent';
import ClientOnlyWrapper from '@/components/ClientOnlyWrapper';

// Force dynamic rendering - required for useSearchParams()
export const dynamic = 'force-dynamic';

export default function ProdutosPage() {
  // Fallback while client-side JavaScript loads
  const loadingFallback = (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-primary-vibrant to-primary bg-clip-text text-transparent mb-4">
            🌿 Nossos Produtos
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Descubra nossa seleção premium de produtos de cannabis de alta qualidade
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* CanonicalUrl temporariamente removido para debug */}
      <Header />
      <Suspense fallback={loadingFallback}>
        <ClientOnlyWrapper fallback={loadingFallback}>
          <ProdutosContent />
        </ClientOnlyWrapper>
      </Suspense>
      <Footer />
    </div>
  );
}
