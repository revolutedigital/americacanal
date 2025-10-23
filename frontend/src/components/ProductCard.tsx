'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasStock = product.stock > 0;
  const buttonText = hasStock ? 'Comprar Agora' : 'Consultar Disponibilidade';
  const buttonClass = hasStock
    ? 'bg-green-600 hover:bg-green-700'
    : 'bg-yellow-500 hover:bg-yellow-600';
  const whatsappUrl = hasStock
    ? getWhatsAppUrl(product.name, product.price)
    : getWhatsAppUrl(product.name);

  return (
    <div className="card group">
      <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!hasStock && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sob Encomenda
          </div>
        )}
        {hasStock && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Disponível
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {product.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </span>
        {hasStock && (
          <span className="text-sm text-gray-500">
            Estoque: {product.stock}
          </span>
        )}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full text-center text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${buttonClass}`}
      >
        {buttonText}
      </a>
    </div>
  );
}
