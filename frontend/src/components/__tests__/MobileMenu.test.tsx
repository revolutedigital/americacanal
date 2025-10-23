import { describe, it, expect, vi } from 'vitest'
import { render, screen, checkA11y, fireEvent } from '@/test/test-utils'
import MobileMenu from '../MobileMenu'

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => {
    return <a href={href}>{children}</a>
  },
}))

const mockCategories = [
  { id: '1', name: 'Flores', slug: 'flores' },
  { id: '2', name: 'Extratos', slug: 'extratos' },
]

const mockBrands = [
  { id: '1', name: 'Brand A', slug: 'brand-a' },
  { id: '2', name: 'Brand B', slug: 'brand-b' },
]

describe('MobileMenu Component - Accessibility Tests', () => {
  it('should not have accessibility violations when open', async () => {
    const { container } = render(
      <MobileMenu
        isOpen={true}
        onClose={vi.fn()}
        categories={mockCategories}
        brands={mockBrands}
      />
    )
    await checkA11y(container)
  })

  it('should have dialog role and aria-modal when open', () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={vi.fn()}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('should have accessible label for dialog', () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={vi.fn()}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    const dialog = screen.getByLabelText(/menu de navegação mobile/i)
    expect(dialog).toBeInTheDocument()
  })

  it('should have close button with accessible label', () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={vi.fn()}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    const closeButton = screen.getByLabelText(/fechar menu/i)
    expect(closeButton).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <MobileMenu
        isOpen={true}
        onClose={onClose}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    const closeButton = screen.getByLabelText(/fechar menu/i)
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(
      <MobileMenu
        isOpen={true}
        onClose={onClose}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    render(
      <MobileMenu
        isOpen={true}
        onClose={onClose}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    const backdrop = document.querySelector('.mobile-menu-backdrop')
    expect(backdrop).toBeInTheDocument()
    fireEvent.click(backdrop!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should render navigation links', () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={vi.fn()}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    expect(screen.getByText(/início/i)).toBeInTheDocument()
    expect(screen.getByText(/todos os produtos/i)).toBeInTheDocument()
  })

  it('should render categories', () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={vi.fn()}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    expect(screen.getByText('Flores')).toBeInTheDocument()
    expect(screen.getByText('Extratos')).toBeInTheDocument()
  })

  it('should render brands', () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={vi.fn()}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    expect(screen.getByText('Brand A')).toBeInTheDocument()
    expect(screen.getByText('Brand B')).toBeInTheDocument()
  })

  it('should not render when isOpen is false', () => {
    const { container } = render(
      <MobileMenu
        isOpen={false}
        onClose={vi.fn()}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should have navigation links for accessibility', () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={vi.fn()}
        categories={mockCategories}
        brands={mockBrands}
      />
    )

    const links = screen.getAllByRole('link')
    // Should have at least home and products links plus categories and brands
    expect(links.length).toBeGreaterThan(2)
  })
})
