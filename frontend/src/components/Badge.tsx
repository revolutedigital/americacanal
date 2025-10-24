import React from 'react';

export type BadgeVariant =
  | 'bestseller'   // Roxo vibrante - Mais vendido
  | 'new'          // Pink - Novo produto
  | 'discount'     // Roxo vibrante - Desconto %
  | 'lowstock'     // Amarelo urgente - Últimas unidades
  | 'available'    // Verde - Disponível
  | 'preorder'     // Amarelo - Sob encomenda
  | 'info'         // Cyan - Informativo
  | 'premium';     // Dourado - Premium

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function Badge({
  variant,
  children,
  className = '',
  size = 'md',
  animated = false
}: BadgeProps) {

  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variantClasses: Record<BadgeVariant, string> = {
    bestseller: 'bg-gradient-to-r from-primary-vibrant to-purple-600 text-white shadow-lg shadow-primary-vibrant/30 hover:shadow-xl hover:scale-105',

    new: 'bg-gradient-to-r from-new to-new-dark text-white shadow-lg shadow-new/30 hover:shadow-xl hover:scale-105',

    discount: 'bg-gradient-to-r from-primary-vibrant to-primary text-white shadow-lg shadow-primary-vibrant/40 hover:shadow-xl hover:scale-105 ring-2 ring-white/20',

    lowstock: 'bg-gradient-to-r from-urgent to-urgent-dark text-gray-900 font-extrabold shadow-lg shadow-urgent/30 hover:shadow-xl',

    available: 'bg-gradient-to-r from-accent-light to-accent text-white shadow-md shadow-accent/20',

    preorder: 'bg-gradient-to-r from-secondary-light to-secondary text-white shadow-md',

    info: 'bg-gradient-to-r from-info to-info-dark text-white shadow-md shadow-info/20 hover:shadow-lg',

    premium: 'bg-gradient-to-r from-gold-400 to-gold-600 text-gray-900 font-extrabold shadow-lg shadow-gold-400/30',
  };

  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${animationClass} ${className}`}>
      {children}
    </span>
  );
}

// Componente de Badge de Desconto com porcentagem
interface DiscountBadgeProps {
  percentage: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function DiscountBadge({ percentage, className = '', size = 'md' }: DiscountBadgeProps) {
  return (
    <Badge variant="discount" size={size} className={className}>
      -{percentage}% OFF
    </Badge>
  );
}

// Componente de Badge de Estoque Baixo
interface LowStockBadgeProps {
  quantity: number;
  className?: string;
}

export function LowStockBadge({ quantity, className = '' }: LowStockBadgeProps) {
  return (
    <Badge variant="lowstock" size="md" className={className} animated>
      ⚡ Últimas {quantity} unidades!
    </Badge>
  );
}

// Componente de Badge Best Seller
export function BestSellerBadge({ className = '' }: { className?: string }) {
  return (
    <Badge variant="bestseller" size="md" className={className}>
      ⭐ Mais Vendido
    </Badge>
  );
}

// Componente de Badge Novo
export function NewBadge({ className = '' }: { className?: string }) {
  return (
    <Badge variant="new" size="sm" className={className} animated>
      🆕 NOVO
    </Badge>
  );
}
