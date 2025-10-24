'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGallery from '@/components/ProductGallery';
import QuantitySelector from '@/components/QuantitySelector';
// import ProductReviews from '@/components/ProductReviews'; // COMENTADO - Usando apenas depoimentos
import ProductCardSSR from '@/components/ProductCardSSR';
import ProductBenefits from '@/components/ProductBenefits';
import ProductTestimonials from '@/components/ProductTestimonials';
import ProductDetailSkeleton from '@/components/skeletons/ProductDetailSkeleton';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/schema';
import api from '@/lib/api';
import Script from 'next/script';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  imageUrl: string;
  images: string[];
  stock: number;
  lowStockAlert?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: {
    name: string;
  };
  _count?: {
    reviews: number;
  };
}

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

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchRelatedProducts();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/api/products/${id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await api.get(`/api/products/${id}/related`);
      setRelatedProducts(response.data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <ProductDetailSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const hasStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= (product.lowStockAlert || 5);
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  // Calcular média de avaliações
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  // Preparar galeria de imagens
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.imageUrl];

  const whatsappUrl = getWhatsAppUrl(
    `${product.name} (${quantity}x)`,
    product.price * quantity
  );

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    ...(product.category ? [{ label: product.category.name, href: '/produtos' }] : []),
    { label: product.name, href: `/produtos/${product.id}` },
  ];

  // Schema.org para SEO
  const productSchema = generateProductSchema({
    product,
    averageRating,
    reviewCount: reviews.length,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Product Schema.org */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      {/* Breadcrumb Schema.org */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            {/* Galeria de Imagens */}
            <div>
              <ProductGallery images={galleryImages} productName={product.name} />
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {hasStock && (
                  <span className="bg-gradient-to-r from-accent to-accent-dark text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:scale-105 transition-transform">
                    ✓ Disponível
                  </span>
                )}
                {!hasStock && (
                  <span className="bg-gradient-to-r from-urgent to-urgent-dark text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:scale-105 transition-transform">
                    Sob Encomenda
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-gradient-to-r from-primary-vibrant to-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-md ring-2 ring-white/20 hover:scale-105 transition-transform">
                    -{discountPercentage}% OFF
                  </span>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Avaliações - COMENTADO */}
              {/* <div className="flex items-center gap-3">
                <div className="flex text-yellow-400 text-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= Math.round(averageRating) ? '' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {averageRating > 0 ? averageRating.toFixed(1) : 'Sem avaliações'}
                </span>
                {reviews.length > 0 && (
                  <a href="#reviews" className="text-primary hover:underline text-sm">
                    ({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})
                  </a>
                )}
              </div> */}

              {/* Preço */}
              <div className="space-y-2">
                {hasDiscount && (
                  <div className="text-2xl text-gray-400 line-through">
                    De: {formatPrice(product.comparePrice!)}
                  </div>
                )}
                <div className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-primary via-primary-vibrant to-primary bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </div>
                {hasDiscount && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-dark text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md">
                    <span>💰</span>
                    Economize {formatPrice(product.comparePrice! - product.price)}
                  </div>
                )}
              </div>

              {/* Urgência/Escassez */}
              {isLowStock && (
                <div className="bg-gradient-to-r from-urgent/20 to-urgent/10 border-2 border-urgent rounded-xl p-5 animate-pulse">
                  <div className="flex items-center gap-3">
                    <span className="text-urgent text-3xl">⚡</span>
                    <div>
                      <p className="font-bold text-urgent text-lg">
                        Apenas {product.stock} {product.stock === 1 ? 'unidade restante' : 'unidades restantes'}!
                      </p>
                      <p className="text-sm text-urgent-dark font-semibold">
                        🔥 Garanta o seu antes que acabe
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {hasStock && !isLowStock && (
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-3 text-accent-dark font-bold flex items-center gap-2">
                  <span className="text-accent text-xl">✓</span>
                  <span>Em estoque ({product.stock} unidades disponíveis)</span>
                </div>
              )}

              {/* Descrição */}
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-primary-vibrant">📋 Sobre o Produto</h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Seletor de Quantidade */}
              {hasStock && (
                <QuantitySelector
                  quantity={quantity}
                  max={Math.min(product.stock, 99)}
                  onChange={setQuantity}
                />
              )}

              {/* Botão de Compra */}
              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center font-bold py-5 px-8 rounded-xl text-xl transition-all duration-300 ${
                    hasStock
                      ? 'btn-gradient-accent hover:scale-105'
                      : 'bg-gradient-to-r from-urgent to-urgent-dark text-white hover:scale-105 shadow-lg shadow-urgent/30'
                  }`}
                >
                  {hasStock ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Comprar Agora via WhatsApp
                      {quantity > 1 && ` (${quantity} un)`}
                    </span>
                  ) : (
                    '📞 Consultar Disponibilidade'
                  )}
                </a>

                {hasStock && (
                  <p className="text-center text-sm text-info font-semibold">
                    ⚡ Atendimento instantâneo pelo WhatsApp
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Product Benefits */}
          <div className="mt-12">
            <ProductBenefits productId={product.id} />
          </div>

          {/* Reviews - COMENTADO - Usando apenas depoimentos abaixo */}
          {/* <div id="reviews" className="mt-16">
            <ProductReviews
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={reviews.length}
            />
          </div> */}

          {/* Produtos Relacionados */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-primary-vibrant to-primary bg-clip-text text-transparent mb-8">
                ✨ Você Também Pode Gostar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCardSSR key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Depoimentos de Clientes */}
      <ProductTestimonials />

      <Footer />
    </div>
  );
}
