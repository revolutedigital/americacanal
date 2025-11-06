import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/conta/',
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
      // Googlebot específico - permissões máximas
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      // Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
