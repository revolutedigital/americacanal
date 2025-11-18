import { MetadataRoute } from 'next';
import blogPosts from '@/data/blog-posts.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5177';
  const tenantId = '0fb61585-3cb3-48b3-ae76-0a5358084a8c';

  // Fetch products from API
  let products: any[] = [];
  try {
    const response = await fetch(`${apiUrl}/api/products?tenantId=${tenantId}`, {
      next: { revalidate: 3600 }
    });
    if (response.ok) {
      products = await response.json();
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  // Fetch categories from API
  let categories: any[] = [];
  try {
    const response = await fetch(`${apiUrl}/api/categories?tenantId=${tenantId}`, {
      next: { revalidate: 3600 }
    });
    if (response.ok) {
      categories = await response.json();
    }
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Páginas dinâmicas de produtos
  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => product.isActive)
    .map((product) => ({
      url: `${baseUrl}/produtos/${product.slug || product.id}`,
      lastModified: new Date(product.updatedAt || product.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Páginas de categorias
  const categoryPages: MetadataRoute.Sitemap = categories
    .map((category) => ({
      url: `${baseUrl}/categorias/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));

  // Blog article pages (Enterprise SEO)
  const blogPages: MetadataRoute.Sitemap = (blogPosts as any[]).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: post.slug.startsWith('review-') ? 0.8 : 0.7, // Product reviews higher priority
  }));

  // Blog category pages
  const blogCategoryPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog/categoria/produtos`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.75 },
    { url: `${baseUrl}/blog/categoria/guia-iniciante`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/blog/categoria/saude-bem-estar`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/blog/categoria/ciencia-pesquisa`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/blog/categoria/legislacao-regulamentacao`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/blog/categoria/guias-compras`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${baseUrl}/blog/categoria/cultivo-producao`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.75 },
  ];

  return [...staticPages, ...categoryPages, ...productPages, ...blogCategoryPages, ...blogPages];
}
