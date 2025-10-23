import { LucideIcon, LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon
  className?: string
}

/**
 * Icon wrapper component for lucide-react icons
 * Provides consistent sizing and styling across the app
 *
 * @example
 * import { ShoppingCart } from 'lucide-react'
 * <Icon icon={ShoppingCart} className="w-5 h-5" />
 */
export function Icon({ icon: LucideIcon, className, ...props }: IconProps) {
  return (
    <LucideIcon
      className={cn('w-5 h-5', className)}
      {...props}
    />
  )
}

export default Icon
