import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductTestimonials from '@/components/ProductTestimonials';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { generateProductFAQs, generateFAQSchema } from '@/lib/faqs';
import ProductFAQ from '@/components/ProductFAQ';
import ProductReviews from '@/components/ProductReviews';
import Script from 'next/script';
import ProductPageClient from './ProductPageClient';
import ClientOnlyWrapper from '@/components/ClientOnlyWrapper';
import { FAQ } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5177';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';
const TENANT_ID = '0fb61585-3cb3-48b3-ae76-0a5358084a8c';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  imageUrl: string;
  images: string[];
  stock: number;
  lowStockAlert?: number;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    name: string;
  };
  faqs?: FAQ[];
  _count?: {
    reviews: number;
  };
}

// Verificar se é UUID (formato antigo)
function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

// Gerar metadata dinâmica para SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const isId = isUUID(params.slug);
    const endpoint = isId
      ? `${API_URL}/api/products/${params.slug}`
      : `${API_URL}/api/products/slug/${params.slug}?tenantId=${TENANT_ID}`;

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return {
        title: 'Produto não encontrado | America Cannabis',
        description: 'O produto que você procura não foi encontrado.'
      };
    }

    const product: Product = await response.json();

    const title = product.metaTitle || `${product.name} | America Cannabis`;
    const description = product.metaDescription ||
      product.description?.substring(0, 160) ||
      `${product.name} - Produto premium de cannabis. Entrega em todo Brasil ⚡`;

    const keywords = product.metaKeywords?.split(',').map(k => k.trim()) || [
      'cannabis', 'cbd', 'premium', 'brasil'
    ];

    const canonicalUrl = `${SITE_URL}/produtos/${product.slug}`;

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: 'America Cannabis',
        images: [
          {
            url: product.imageUrl,
            width: 800,
            height: 600,
            alt: `${product.name} | America Cannabis`,
          }
        ],
        locale: 'pt_BR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [product.imageUrl],
      },
      alternates: {
        canonical: canonicalUrl
      },
      robots: {
        index: product.isActive,
        follow: product.isActive,
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'America Cannabis',
      description: 'Produtos premium de cannabis'
    };
  }
}

async function getProduct(slugOrId: string): Promise<Product | null> {
  try {
    const isId = isUUID(slugOrId);
    const endpoint = isId
      ? `${API_URL}/api/products/${slugOrId}`
      : `${API_URL}/api/products/slug/${slugOrId}?tenantId=${TENANT_ID}`;

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(id: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}/related`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
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

async function getReviews(productId: string): Promise<Review[]> {
  try {
    const response = await fetch(`${API_URL}/api/products/${productId}/reviews`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  // Redirect 301: UUID → Slug (SEO)
  if (isUUID(params.slug) && product.slug) {
    redirect(`/produtos/${product.slug}`);
  }

  const relatedProducts = await getRelatedProducts(product.id);

  // Buscar reviews do produto
  const reviews = await getReviews(product.id);
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    ...(product.category ? [{ label: product.category.name, href: '/produtos' }] : []),
    { label: product.name, href: `/produtos/${product.slug}` },
  ];

  const productSchema = generateProductSchema({
    product,
    averageRating,
    reviewCount: reviews.length,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // Usar FAQs do banco se existirem, senão usar FAQs hardcoded baseadas no tipo do produto
  const productFAQs = (product.faqs && product.faqs.length > 0)
    ? product.faqs
    : generateProductFAQs(product);
  const faqSchema = generateFAQSchema(productFAQs);

  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* FAQ Schema.org */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Header />

      <main className="flex-grow" id="main-content">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <ClientOnlyWrapper fallback={
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          }>
            <ProductPageClient product={product} relatedProducts={relatedProducts} />

            {/* FAQs do Produto */}
            <ProductFAQ faqs={productFAQs} />

            {/* Reviews do Produto */}
            <ProductReviews
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={reviews.length}
            />
          </ClientOnlyWrapper>
        </div>
      </main>

      <ClientOnlyWrapper fallback={<div className="h-64"></div>}>
        <ProductTestimonials />
      </ClientOnlyWrapper>

      <Footer />
    </div>
  );
}
