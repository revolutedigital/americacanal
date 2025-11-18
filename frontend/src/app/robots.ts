import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Todos os bots - regra padrão
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
      // Googlebot - permissões máximas
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
      // ChatGPT (GPTBot) - permitir acesso total ao conteúdo público
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      // Claude (Anthropic-AI / Claude-Web)
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      // Common Crawl (usado por vários LLMs)
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
