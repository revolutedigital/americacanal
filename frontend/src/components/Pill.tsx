import React from 'react';

export type PillVariant =
  | 'primary'    // Roxo - Principal
  | 'accent'     // Verde - Ativo/Selecionado
  | 'info'       // Cyan - Informativo
  | 'secondary'  // Dourado - Secundário
  | 'neutral';   // Cinza - Neutro

interface PillProps {
  variant?: PillVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

export default function Pill({
  variant = 'neutral',
  children,
  className = '',
  onClick,
  active = false,
  removable = false,
  onRemove
}: PillProps) {

  const baseClasses = 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300';

  const variantClasses: Record<PillVariant, string> = {
    primary: active
      ? 'bg-gradient-to-r from-primary-vibrant to-primary text-white shadow-lg shadow-primary-vibrant/30'
      : 'bg-primary/10 text-primary-vibrant hover:bg-primary/20 border border-primary/30',

    accent: active
      ? 'bg-gradient-to-r from-accent to-accent-dark text-white shadow-lg shadow-accent/30'
      : 'bg-accent/10 text-accent-dark hover:bg-accent/20 border border-accent/30',

    info: active
      ? 'bg-gradient-to-r from-info to-info-dark text-white shadow-lg shadow-info/30'
      : 'bg-info/10 text-info-dark hover:bg-info/20 border border-info/30',

    secondary: active
      ? 'bg-gradient-to-r from-secondary-light to-secondary text-white shadow-md'
      : 'bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/30',

    neutral: active
      ? 'bg-gray-700 text-white shadow-md'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300',
  };

  const interactiveClasses = onClick ? 'cursor-pointer hover:scale-105' : '';

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-white/80 transition-colors"
          aria-label="Remover"
        >
          ✕
        </button>
      )}
    </span>
  );
}

// Componente de Tag (menor que Pill, para filtros)
interface TagProps {
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
  onClick?: () => void;
  onRemove?: () => void;
}

export function Tag({ children, variant = 'neutral', className = '', onClick, onRemove }: TagProps) {
  const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200';

  const variantClasses: Record<PillVariant, string> = {
    primary: 'bg-primary-vibrant/20 text-primary-vibrant hover:bg-primary-vibrant/30 border border-primary-vibrant/40',
    accent: 'bg-accent/20 text-accent-dark hover:bg-accent/30 border border-accent/40',
    info: 'bg-info/20 text-info-dark hover:bg-info/30 border border-info/40',
    secondary: 'bg-secondary/20 text-secondary-dark hover:bg-secondary/30 border border-secondary/40',
    neutral: 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300',
  };

  const interactiveClasses = onClick ? 'cursor-pointer hover:scale-105' : '';

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-70 transition-opacity"
          aria-label="Remover filtro"
        >
          ✕
        </button>
      )}
    </span>
  );
}

// Componente de Label (para inputs, formulários)
interface LabelBadgeProps {
  children: React.ReactNode;
  variant?: PillVariant;
  icon?: React.ReactNode;
  className?: string;
}

export function LabelBadge({ children, variant = 'info', icon, className = '' }: LabelBadgeProps) {
  const variantClasses: Record<PillVariant, string> = {
    primary: 'bg-primary-vibrant/10 text-primary-vibrant border-primary-vibrant/30',
    accent: 'bg-accent/10 text-accent-dark border-accent/30',
    info: 'bg-info/10 text-info-dark border-info/30',
    secondary: 'bg-secondary/10 text-secondary-dark border-secondary/30',
    neutral: 'bg-gray-100 text-gray-600 border-gray-300',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${variantClasses[variant]} ${className}`}>
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </span>
  );
}
