import { NextResponse } from 'next/server';

/**
 * API Route para configuração do tenant
 * Retorna configurações de tracking, trust badges, etc.
 */
export async function GET() {
  try {
    // Configuração padrão do tenant
    const config = {
      // Tracking IDs (adicionar os reais quando disponíveis)
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
      googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
      googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || '',

      // Trust Badges padrão
      trustBadges: [
        {
          icon: '🚚',
          title: 'Entrega Rápida',
          text: 'Todo o Brasil',
        },
        {
          icon: '🔒',
          title: 'Compra Segura',
          text: 'Pagamento protegido',
        },
        {
          icon: '⭐',
          title: 'Qualidade Premium',
          text: 'Produtos selecionados',
        },
        {
          icon: '💬',
          title: 'Suporte 24/7',
          text: 'Sempre disponível',
        },
      ],

      // Benefícios padrão
      benefits: [
        {
          icon: '✓',
          title: 'Entrega Rápida',
          description: 'Receba em até 5 dias úteis',
        },
        {
          icon: '✓',
          title: 'Pagamento Seguro',
          description: '100% protegido com SSL',
        },
        {
          icon: '✓',
          title: 'Produtos Premium',
          description: 'Apenas as melhores marcas',
        },
        {
          icon: '✓',
          title: 'Suporte Dedicado',
          description: 'Atendimento personalizado',
        },
      ],
    };

    return NextResponse.json(config, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error fetching tenant config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tenant configuration' },
      { status: 500 }
    );
  }
}
