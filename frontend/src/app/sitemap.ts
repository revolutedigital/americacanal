import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';

  // Fetch products from API
  let products: any[] = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5177';
    // Adicionar tenantId do America Cannabis
    const response = await fetch(`${apiUrl}/api/products?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c`, {
      next: { revalidate: 3600 } // Revalidar a cada hora
    });
    if (response.ok) {
      products = await response.json();
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
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

  return [...staticPages, ...productPages];
}
