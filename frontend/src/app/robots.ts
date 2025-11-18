import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://americacannabisbr.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ========================================
      // REGRA PADRÃO - Todos os bots
      // ========================================
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

      // ========================================
      // MOTORES DE BUSCA TRADICIONAIS
      // ========================================
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Bravebot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // ========================================
      // BOTS DE IA - LLMS E ASSISTENTES
      // ========================================

      // OpenAI (ChatGPT, GPT-4)
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Google AI (Bard/Gemini)
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Anthropic (Claude)
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Meta AI (Facebook/Instagram AI)
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Apple Intelligence (Siri, Spotlight)
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Amazon (Alexa)
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // You.com
      {
        userAgent: 'YouBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Common Crawl (usado por múltiplos LLMs)
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // AI2Bot (Allen Institute for AI)
      {
        userAgent: 'AI2Bot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Diffbot (Knowledge Graph usado por IAs)
      {
        userAgent: 'Diffbot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // ========================================
      // BOTS DE REDES SOCIAIS E PLATAFORMAS
      // ========================================

      // ByteDance/TikTok
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Twitter/X
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // LinkedIn
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Pinterest
      {
        userAgent: 'Pinterestbot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // WhatsApp
      {
        userAgent: 'WhatsApp',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Telegram
      {
        userAgent: 'TelegramBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // ========================================
      // BOTS DE AGREGAÇÃO E ANÁLISE
      // ========================================

      // Omgili (usado por ferramentas de IA)
      {
        userAgent: 'omgili',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
      {
        userAgent: 'omgilibot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Webz.io
      {
        userAgent: 'Webzio-Extended',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Timpibot
      {
        userAgent: 'Timpibot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // Kangaroo
      {
        userAgent: 'Kangaroo Bot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },

      // ImagesiftBot (análise de imagens)
      {
        userAgent: 'ImagesiftBot',
        allow: '/',
        disallow: ['/admin/', '/conta/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
