import { Product } from './types';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';

export interface ProductSchemaProps {
  product: Product & {
    brand?: { name: string };
    category?: { name: string };
  };
  averageRating?: number;
  reviewCount?: number;
}

export function generateProductSchema({ product, averageRating, reviewCount }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.imageUrl.startsWith('http')
      ? product.imageUrl
      : `${siteUrl}${product.imageUrl}`,
    description: product.description || `${product.name} - Produto premium de cannabis de alta qualidade`,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand?.name || 'America Cannabis',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/produtos/${product.id}`,
      priceCurrency: 'BRL',
      price: Number(product.price).toFixed(2),
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 dias
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'America Cannabis',
      },
    },
    ...(averageRating && reviewCount && reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: averageRating.toFixed(1),
            reviewCount: reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(product.category
      ? {
          category: product.category.name,
        }
      : {}),
  };

  return schema;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : `${siteUrl}${item.href}`,
    })),
  };

  return schema;
}

export interface ReviewSchemaProps {
  reviews: Array<{
    id: string;
    rating: number;
    title?: string;
    comment: string;
    customer: {
      name: string;
    };
    isVerified: boolean;
    createdAt: string;
  }>;
  productName: string;
}

export function generateReviewsSchema({ reviews, productName }: ReviewSchemaProps) {
  if (reviews.length === 0) return null;

  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: productName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: review.customer.name,
    },
    datePublished: new Date(review.createdAt).toISOString(),
    reviewBody: review.comment,
    ...(review.title ? { headline: review.title } : {}),
  }));
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'America Cannabis',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Produtos de cannabis premium de alta qualidade. CBD Oil, Hemp Flowers, extratos e muito mais.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+595-98-257-4068',
      contactType: 'customer service',
      availableLanguage: ['Portuguese', 'Spanish', 'English'],
      areaServed: 'BR',
    },
    sameAs: [
      // Adicionar redes sociais quando disponível
      // 'https://www.facebook.com/americacannabis',
      // 'https://www.instagram.com/americacannabis',
    ],
  };
}
