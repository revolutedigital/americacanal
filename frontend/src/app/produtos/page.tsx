import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CanonicalUrl from '@/components/CanonicalUrl';
import ProdutosContent from '@/components/ProdutosContent';

export default function ProdutosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CanonicalUrl />
      <Header />
      <ProdutosContent />
      <Footer />
    </div>
  );
}
