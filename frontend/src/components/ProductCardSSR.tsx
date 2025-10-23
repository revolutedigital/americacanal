'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ProductCardSSRProps {
  product: Product;
}

export default function ProductCardSSR({ product }: ProductCardSSRProps) {
  const hasStock = product.stock > 0;
  const lowStock = hasStock && product.stock <= 5;
  const buttonText = hasStock ? 'Comprar Agora' : 'Consultar Disponibilidade';
  const whatsappUrl = hasStock
    ? getWhatsAppUrl(product.name, product.price)
    : getWhatsAppUrl(product.name);

  // Simular "pessoas visualizando" (número aleatório mas consistente por produto)
  const viewersCount = (parseInt(product.id.slice(-2), 16) % 8) + 2; // 2-9 pessoas

  // Determinar se é "Mais vendido" baseado em hash do ID
  const isBestSeller = parseInt(product.id.slice(0, 2), 16) % 3 === 0;

  // Verificar se é novo (criado nos últimos 30 dias)
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (product.createdAt) {
      const createdDate = new Date(product.createdAt);
      const now = new Date();
      const daysDiff = (now.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
      setIsNew(daysDiff <= 30);
    }
  }, [product.createdAt]);

  return (
    <article className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/30">
      <Link href={`/produtos/${product.id}`} className="block">
        {/* Container da Imagem */}
        <div className="relative w-full h-72 overflow-hidden bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay no hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Top Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {/* Badge Sob Encomenda */}
            {!hasStock && (
              <div className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md">
                Sob Encomenda
              </div>
            )}

            {/* Badge Últimas Unidades */}
            {lowStock && (
              <div className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md animate-pulse">
                🔥 Últimas {product.stock} un.
              </div>
            )}

            {/* Badge Disponível */}
            {hasStock && !lowStock && (
              <div className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md">
                ✓ Em Estoque
              </div>
            )}

            {/* Badge Novo */}
            {isNew && (
              <div className="bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md">
                ✨ Novo
              </div>
            )}

            {/* Badge Mais Vendido */}
            {isBestSeller && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md">
                ⭐ Mais Vendido
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo do Card */}
        <div className="p-5">
          {/* Indicador de Pessoas Visualizando */}
          {hasStock && (
            <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>{viewersCount} pessoas visualizando agora</span>
            </div>
          )}

          {/* Nome do Produto */}
          <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h2>

          {/* Badges de Marca e Tipo */}
          {(product.brand || product.type) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {product.brand && (
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-medium">
                  {product.brand.name}
                </span>
              )}
              {product.type && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${
                  product.type === 'INDICA'
                    ? 'bg-blue-100 text-blue-700'
                    : product.type === 'SATIVA'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {product.type === 'INDICA' ? 'Indica' : product.type === 'SATIVA' ? 'Sativa' : 'Híbrida'}
                </span>
              )}
            </div>
          )}

          {/* Descrição */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description?.substring(0, 100)}...
          </p>

          {/* Preço e Estoque */}
          <div className="flex items-end justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">A partir de</span>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>
            {hasStock && !lowStock && (
              <div className="text-right">
                <span className="text-xs text-gray-500">Estoque</span>
                <p className="text-sm font-semibold text-green-600">{product.stock} un.</p>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Botão WhatsApp */}
      <div className="px-5 pb-5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          onClick={(e) => e.stopPropagation()}
        >
          {buttonText}
        </a>
      </div>
    </article>
  );
}
