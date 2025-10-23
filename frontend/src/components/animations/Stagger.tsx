'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

/**
 * Stagger Animation Component
 *
 * Animates children elements with a staggered delay
 * Creates a cascading effect for lists and grids
 *
 * @example
 * <Stagger staggerDelay={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stagger>
 */
export function Stagger({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Stagger
