import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCardSSR from '@/components/ProductCardSSR';
import HeroBanners from '@/components/HeroBanners';
import TrustBadges from '@/components/TrustBadges';
import DefaultReviewsCarousel from '@/components/DefaultReviewsCarousel';
import { Product } from '@/lib/types';
import Link from 'next/link';
import { LabIcon, DeliveryIcon, SupportIcon } from '@/components/icons/Icons';

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      'http://localhost:4000/api/products?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c',
      {
        cache: 'no-store', // Revalidate on every request for fresh data
        next: { revalidate: 60 } // Or use ISR with 60 second revalidation
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch products');
      return [];
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Social Proof Banner */}
      <div className="bg-gradient-to-r from-green-50 via-purple-50 to-blue-50 py-3 border-b border-purple-100">
        <div className="container mx-auto px-4">
          <p className="text-xs md:text-sm text-center font-semibold text-gray-800 flex flex-wrap items-center justify-center gap-3 md:gap-6">
            <span className="flex items-center gap-1">
              ✅ <span className="text-primary">Mais de 5.000</span> clientes satisfeitos
            </span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="flex items-center gap-1">
              🔬 Produtos <span className="text-secondary">GMP Certificados</span>
            </span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="flex items-center gap-1">
              🚀 Entrega em <span className="text-primary">3-7 dias</span>
            </span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="flex items-center gap-1">
              ⭐ <span className="text-primary">4.9/5.0</span> avaliação média
            </span>
          </p>
        </div>
      </div>

      <main id="main-content" className="flex-grow">
        {/* Hero Banners */}
        <HeroBanners />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Products Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nossos Produtos
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-primary mx-auto rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra nossa seleção <span className="font-semibold text-primary">PREMIUM</span> de produtos de cannabis de alta qualidade fabricados em laboratório!
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl">
              <div className="text-8xl mb-6">😢</div>
              <p className="text-gray-600 text-2xl font-bold">Nenhum produto disponível no momento.</p>
              <p className="text-gray-500 text-lg mt-2">Volte em breve para conferir nossas novidades!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.slice(0, 8).map((product) => (
                  <ProductCardSSR key={product.id} product={product} />
                ))}
              </div>

              {products.length > 8 && (
                <div className="text-center mt-16">
                  <Link
                    href="/produtos"
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Ver Todos os {products.length} Produtos
                  </Link>
                </div>
              )}
            </>
          )}
        </section>

        {/* Default Reviews Carousel */}
        <DefaultReviewsCarousel />

        {/* Features Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por que escolher a America Cannabis?
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-primary mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LabIcon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tecnologia de Ponta</h3>
                <p className="text-gray-600 leading-relaxed">Produtos fabricados em laboratório com certificações GMP e COA</p>
              </div>

              <div className="group bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-secondary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DeliveryIcon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Entrega Rápida</h3>
                <p className="text-gray-600 leading-relaxed">Entrega rápida e totalmente discreta em todo o Brasil</p>
              </div>

              <div className="group bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <SupportIcon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Suporte Especializado</h3>
                <p className="text-gray-600 leading-relaxed">Equipe técnica para consultoria personalizada via WhatsApp</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
