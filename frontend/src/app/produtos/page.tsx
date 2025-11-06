import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CanonicalUrl from '@/components/CanonicalUrl';
import ProdutosContent from '@/components/ProdutosContent';

export default function ProdutosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CanonicalUrl />
      <Header />

      <Suspense fallback={
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
      }>
        <ProdutosContent />
      </Suspense>

      <Footer />
    </div>
  );
}
