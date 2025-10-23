'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGallery from '@/components/ProductGallery';
import QuantitySelector from '@/components/QuantitySelector';
import ProductReviews from '@/components/ProductReviews';
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
              <div className="flex flex-wrap gap-2">
                {hasStock && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Disponível
                  </span>
                )}
                {!hasStock && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Sob Encomenda
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    -{discountPercentage}% OFF
                  </span>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Avaliações */}
              <div className="flex items-center gap-3">
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
              </div>

              {/* Preço */}
              <div className="space-y-2">
                {hasDiscount && (
                  <div className="text-2xl text-gray-500 line-through">
                    {formatPrice(product.comparePrice!)}
                  </div>
                )}
                <div className="text-4xl lg:text-5xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
                {hasDiscount && (
                  <div className="text-green-600 font-semibold">
                    Economize {formatPrice(product.comparePrice! - product.price)}
                  </div>
                )}
              </div>

              {/* Urgência/Escassez */}
              {isLowStock && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600 text-xl">⚡</span>
                    <div>
                      <p className="font-semibold text-yellow-900">
                        Apenas {product.stock} {product.stock === 1 ? 'unidade restante' : 'unidades restantes'}!
                      </p>
                      <p className="text-sm text-yellow-700">
                        Garanta o seu antes que acabe
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {hasStock && !isLowStock && (
                <div className="text-green-600 font-semibold flex items-center gap-2">
                  <span>✓</span>
                  <span>Em estoque ({product.stock} unidades disponíveis)</span>
                </div>
              )}

              {/* Descrição */}
              <div className="prose max-w-none">
                <h2 className="text-xl font-bold mb-3">Sobre o Produto</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
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
                  className={`block w-full text-center text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl ${
                    hasStock
                      ? 'bg-secondary hover:bg-secondary-dark'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
                >
                  {hasStock ? (
                    <>
                      Comprar Agora via WhatsApp
                      {quantity > 1 && ` (${quantity} unidades)`}
                    </>
                  ) : (
                    'Consultar Disponibilidade'
                  )}
                </a>

                {hasStock && (
                  <p className="text-center text-sm text-gray-600">
                    Atendimento instantâneo pelo WhatsApp
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Product Benefits */}
          <div className="mt-12">
            <ProductBenefits productId={product.id} />
          </div>

          {/* Reviews */}
          <div id="reviews" className="mt-16">
            <ProductReviews
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={reviews.length}
            />
          </div>

          {/* Produtos Relacionados */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Você Também Pode Gostar
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
