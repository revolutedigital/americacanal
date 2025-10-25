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

// Gerar metadata dinâmica para SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const response = await fetch(`${API_URL}/api/products/${params.id}`, {
      next: { revalidate: 3600 } // Revalidar a cada hora
    });

    if (!response.ok) {
      return {
        title: 'Produto não encontrado | America Cannabis',
        description: 'O produto que você procura não foi encontrado.'
      };
    }

    const product: Product = await response.json();

    // Usar meta tags do banco ou gerar fallback
    const title = product.metaTitle || `${product.name} | America Cannabis`;
    const description = product.metaDescription ||
      product.description?.substring(0, 160) ||
      `${product.name} - Produto premium de cannabis de alta qualidade.`;

    const keywords = product.metaKeywords?.split(',').map(k => k.trim()) || [
      'cannabis',
      'cbd',
      'premium',
      'brasil'
    ];

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/produtos/${params.id}`,
        siteName: 'America Cannabis',
        images: [
          {
            url: product.imageUrl,
            width: 800,
            height: 600,
            alt: product.name,
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
        canonical: `${SITE_URL}/produtos/${params.id}`
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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
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

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(params.id);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    ...(product.category ? [{ label: product.category.name, href: '/produtos' }] : []),
    { label: product.name, href: `/produtos/${product.id}` },
  ];

  // Schema.org para SEO
  const productSchema = generateProductSchema({
    product,
    averageRating: 0,
    reviewCount: 0,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Product Schema.org */}
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      {/* Breadcrumb Schema.org */}
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

      {/* Depoimentos de Clientes */}
      <ProductTestimonials />

      <Footer />
    </div>
  );
}
