import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { axe } from 'vitest-axe'

/**
 * Custom render function that wraps components with common providers
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { ...options })
}

/**
 * Utility function to test accessibility violations using axe-core
 * @param container - The container element to test
 * @returns Promise that resolves with axe results
 */
export const checkA11y = async (container: HTMLElement) => {
  const results = await axe(container)
  // Check if there are no violations
  if (results.violations.length > 0) {
    const violationMessages = results.violations.map(
      (violation) =>
        `${violation.id}: ${violation.description}\n  ${violation.nodes
          .map((node) => node.html)
          .join('\n  ')}`
    )
    throw new Error(
      `Accessibility violations found:\n${violationMessages.join('\n\n')}`
    )
  }
  return results
}

/**
 * Utility to check if an element has proper ARIA attributes
 */
export const hasProperARIA = (element: HTMLElement) => {
  const ariaLabel = element.getAttribute('aria-label')
  const ariaLabelledBy = element.getAttribute('aria-labelledby')
  const ariaDescribedBy = element.getAttribute('aria-describedby')

  return {
    hasLabel: !!(ariaLabel || ariaLabelledBy),
    hasDescription: !!ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
  }
}

/**
 * Utility to check if element has proper focus indicators
 */
export const hasFocusIndicator = (element: HTMLElement) => {
  const classList = Array.from(element.classList)
  return classList.some(className =>
    className.includes('focus-visible') ||
    className.includes('focus:')
  )
}

export * from '@testing-library/react'
export { customRender as render }
