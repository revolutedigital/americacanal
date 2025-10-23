'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

/**
 * FadeIn Animation Component
 *
 * Provides smooth fade-in animations with optional directional movement
 * Uses framer-motion for performance-optimized animations
 *
 * @example
 * <FadeIn direction="up" delay={0.2}>
 *   <YourContent />
 * </FadeIn>
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'none',
  className,
  ...props
}: FadeInProps) {
  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
