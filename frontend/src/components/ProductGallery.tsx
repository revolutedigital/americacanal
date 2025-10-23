'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Se não houver imagens, usar a primeira como fallback
  const imageList = images.length > 0 ? images : [images[0] || ''];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Imagem Principal com Zoom */}
      <div
        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={imageList[selectedImage]}
          alt={`${productName} - Imagem ${selectedImage + 1}`}
          className={`w-full h-full object-cover transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }
              : undefined
          }
        />

        {/* Indicador de Zoom */}
        {!isZoomed && imageList.length > 0 && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            🔍 Passe o mouse para ampliar
          </div>
        )}
      </div>

      {/* Thumbnails - Só mostra se tiver mais de 1 imagem */}
      {imageList.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={image}
                alt={`${productName} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Contador de Imagens */}
      {imageList.length > 1 && (
        <div className="text-center text-sm text-gray-600">
          Imagem {selectedImage + 1} de {imageList.length}
        </div>
      )}
    </div>
  );
}
