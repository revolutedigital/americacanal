import { NextRequest, NextResponse } from 'next/server';

/**
 * Gerador local de imagens placeholder em SVG
 * Substitui via.placeholder.com que está frequentemente offline
 *
 * Uso: /api/placeholder?width=800&height=800&text=Produto&bg=10b981&color=ffffff
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const width = parseInt(searchParams.get('width') || '800');
  const height = parseInt(searchParams.get('height') || '800');
  const text = searchParams.get('text') || 'Sem Imagem';
  const bgColor = searchParams.get('bg') || '10b981'; // Verde da marca
  const textColor = searchParams.get('color') || 'ffffff';

  // Gerar SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect fill="#${bgColor}" width="${width}" height="${height}"/>
  <text
    fill="#${textColor}"
    font-size="${Math.floor(width / 10)}"
    font-family="Arial, sans-serif"
    font-weight="bold"
    text-anchor="middle"
    x="${width / 2}"
    y="${height / 2 + Math.floor(width / 30)}"
  >${text}</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable', // 1 ano
    },
  });
}
