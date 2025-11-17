'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string;
  fallbackSrc?: string;
}

/**
 * Componente de imagem com fallback automático
 * Se a imagem falhar ao carregar, usa um fallback (SVG ou imagem padrão)
 */
export default function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  // Gerar SVG placeholder baseado na URL e alt text
  const generatePlaceholder = (text: string) => {
    const initials = text
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const bgColor = '#10b981'; // verde da marca
    const textColor = '#ffffff';

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'%3E%3Crect fill='${encodeURIComponent(bgColor)}' width='800' height='800'/%3E%3Ctext fill='${encodeURIComponent(textColor)}' font-size='200' font-family='Arial, sans-serif' font-weight='bold' text-anchor='middle' x='400' y='450'%3E${initials}%3C/text%3E%3C/svg%3E`;
  };

  const handleError = () => {
    if (!error) {
      setError(true);
      // Usar fallback customizado ou gerar SVG
      const placeholder = fallbackSrc || generatePlaceholder(alt);
      setImgSrc(placeholder);
    }
  };

  // Determinar se precisa de unoptimized
  // IMPORTANTE: Railway tem problemas com otimização de imagens externas
  // Desabilitar otimização para evitar erros 500
  const shouldUnoptimize =
    imgSrc.includes('unsplash.com') ||
    imgSrc.includes('bigcommerce.com') ||
    imgSrc.includes('backend-production1.up.railway.app') ||
    imgSrc.includes('data:image/svg') ||
    imgSrc.startsWith('http'); // Todas as imagens externas

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      unoptimized={shouldUnoptimize}
    />
  );
}
