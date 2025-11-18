import { MetadataRoute } from 'next';
import blogPosts from '@/data/blog-posts.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://americacannabisbr.com';
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

  // ========================================
  // PÁGINAS ESTÁTICAS DE ALTA PRIORIDADE
  // ========================================
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const, // Homepage muda com produtos/posts
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const, // Catálogo atualiza frequentemente
      priority: 0.95, // Maior prioridade - página de conversão
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9, // Alta prioridade para SEO
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // ========================================
  // PÁGINAS DE PRODUTOS (Alta Conversão)
  // ========================================
  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => product.isActive)
    .map((product) => ({
      url: `${baseUrl}/produtos/${product.slug || product.id}`,
      lastModified: new Date(product.updatedAt || product.createdAt),
      changeFrequency: 'weekly' as const, // Produtos podem mudar estoque/preço
      priority: 0.85, // Alta prioridade - páginas de conversão
    }));

  // ========================================
  // PÁGINAS DE CATEGORIAS (Navegação Principal)
  // ========================================
  const categoryPages: MetadataRoute.Sitemap = categories
    .map((category) => ({
      url: `${baseUrl}/categorias/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const, // Categorias mudam com novos produtos
      priority: 0.9, // Muito importante para navegação e SEO
    }));

  // ========================================
  // BLOG POSTS (SEO Content - 201 posts)
  // ========================================
  const blogPages: MetadataRoute.Sitemap = (blogPosts as any[]).map((post) => {
    // Calcular idade do post para ajustar prioridade
    const publishDate = new Date(post.publishedAt);
    const daysSincePublish = Math.floor((Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24));
    const isRecent = daysSincePublish < 30; // Posts dos últimos 30 dias
    const isFeatured = post.featured === true;
    const isReview = post.slug.startsWith('review-');

    // Prioridade baseada em tipo e frescor do conteúdo
    let priority = 0.7; // Padrão
    if (isFeatured) priority = 0.85;
    else if (isReview) priority = 0.8; // Reviews têm alta conversão
    else if (isRecent) priority = 0.75; // Conteúdo fresco

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
      changeFrequency: isRecent ? 'weekly' as const : 'monthly' as const,
      priority,
    };
  });

  // ========================================
  // CATEGORIAS DO BLOG (Páginas de Agregação)
  // ========================================
  const blogCategoryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/categoria/produtos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const, // Reviews frequentes
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog/categoria/guia-iniciante`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const, // Conteúdo evergreen
      priority: 0.75
    },
    {
      url: `${baseUrl}/blog/categoria/saude-bem-estar`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75
    },
    {
      url: `${baseUrl}/blog/categoria/ciencia-pesquisa`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75
    },
    {
      url: `${baseUrl}/blog/categoria/legislacao-regulamentacao`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const, // Legislação muda frequentemente
      priority: 0.75
    },
    {
      url: `${baseUrl}/blog/categoria/guias-compras`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75
    },
    {
      url: `${baseUrl}/blog/categoria/cultivo-producao`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const, // Conteúdo evergreen
      priority: 0.7
    },
  ];

  // ========================================
  // RETURN: Ordem otimizada para crawling
  // Páginas mais importantes primeiro
  // ========================================
  return [
    ...staticPages,      // 1. Páginas principais (homepage, produtos, blog)
    ...categoryPages,    // 2. Categorias de produtos (navegação)
    ...productPages,     // 3. Produtos individuais (conversão)
    ...blogCategoryPages,// 4. Categorias do blog (agregação SEO)
    ...blogPages,        // 5. Posts do blog (long-tail SEO)
  ];
}
