'use client'

/**
 * SkipLink Component
 *
 * Allows keyboard users to skip directly to main content
 * Improves accessibility for screen reader and keyboard users
 *
 * WCAG 2.1 Guideline 2.4.1: Bypass Blocks (Level A)
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-accent focus:text-primary-dark focus:font-bold focus:rounded-lg focus:shadow-2xl focus:ring-4 focus:ring-accent-dark focus:outline-none transition-all"
      tabIndex={0}
    >
      Pular para o conteúdo principal
    </a>
  )
}
