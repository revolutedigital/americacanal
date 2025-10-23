'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface ScaleInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
  duration?: number
  scale?: number
  className?: string
}

/**
 * ScaleIn Animation Component
 *
 * Scales element from small to normal size with fade
 * Perfect for cards, images, and interactive elements
 *
 * @example
 * <ScaleIn delay={0.1}>
 *   <Card />
 * </ScaleIn>
 */
export function ScaleIn({
  children,
  delay = 0,
  duration = 0.4,
  scale = 0.9,
  className,
  ...props
}: ScaleInProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default ScaleIn
