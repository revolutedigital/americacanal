import { describe, it, expect, vi } from 'vitest'
import { render, screen, checkA11y } from '@/test/test-utils'
import ErrorBoundary from '../ErrorBoundary'

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary Component - Accessibility Tests', () => {
  // Suppress console.error for these tests
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should not have accessibility violations in error state', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    )

    await checkA11y(container)
  })

  it('should display error UI when error is caught', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    )

    expect(screen.getByText(/algo deu errado/i)).toBeInTheDocument()
    expect(
      screen.getByText(/desculpe, ocorreu um erro inesperado/i)
    ).toBeInTheDocument()
  })

  it('should have retry button with proper label', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /tentar novamente/i })
    expect(retryButton).toBeInTheDocument()
  })

  it('should have home button with proper label', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    )

    const homeButton = screen.getByRole('button', {
      name: /voltar para a página inicial/i,
    })
    expect(homeButton).toBeInTheDocument()
  })

  it('should have focus indicators on buttons', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /tentar novamente/i })
    const homeButton = screen.getByRole('button', {
      name: /voltar para a página inicial/i,
    })

    expect(retryButton.className).toContain('focus-visible')
    expect(homeButton.className).toContain('focus-visible')
  })

  it('should render custom fallback when provided', () => {
    const customFallback = <div>Custom error UI</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error UI')).toBeInTheDocument()
    expect(screen.queryByText(/algo deu errado/i)).not.toBeInTheDocument()
  })

  it('should show error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    )

    expect(
      screen.getByText(/detalhes do erro \(desenvolvimento\)/i)
    ).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('should reset error state when retry button is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /tentar novamente/i })
    retryButton.click()

    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })
})
