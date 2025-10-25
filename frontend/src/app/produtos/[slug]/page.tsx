import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductTestimonials from '@/components/ProductTestimonials';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Script from 'next/script';
import ProductPageClient from './ProductPageClient';

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

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    ...(product.category ? [{ label: product.category.name, href: '/produtos' }] : []),
    { label: product.name, href: `/produtos/${product.slug}` },
  ];

  const productSchema = generateProductSchema({
    product,
    averageRating: 0,
    reviewCount: 0,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

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

      <Header />

      <main className="flex-grow" id="main-content">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <ProductPageClient product={product} relatedProducts={relatedProducts} />
        </div>
      </main>

      <ProductTestimonials />

      <Footer />
    </div>
  );
}
