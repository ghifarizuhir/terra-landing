import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { product } from '../src/data/product'

describe('homepage landing page', () => {
  it('shows the product promise, access CTA and platform facts', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /Run services and delivery work in one system/ })).toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: /Terraline operational architecture schematic/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Request a demo/ })).toHaveAttribute('href', product.hero.primaryCta.href)
    const foundation = screen.getByRole('region', { name: 'Platform foundations' })
    for (const fact of product.facts) expect(within(foundation).getByText(fact)).toBeInTheDocument()
    const accessLinks = screen.getAllByRole('link', { name: /Request access/ })
    expect(accessLinks.length).toBeGreaterThan(0)
    for (const link of accessLinks) expect(link).toHaveAttribute('href', product.cta.href)
  })

  it('cycles product chapters via slide controls while keeping the demo window stationary', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Work management' })).toHaveAttribute('aria-current', 'step')
    fireEvent.click(screen.getByRole('button', { name: 'Next chapter slide' }))
    expect(screen.getByRole('button', { name: 'Service catalog' })).toHaveAttribute('aria-current', 'step')
    fireEvent.click(screen.getByRole('button', { name: 'Previous chapter slide' }))
    expect(screen.getByRole('button', { name: 'Work management' })).toHaveAttribute('aria-current', 'step')
  })

  it('shows one animated product window instead of product screenshots', () => {
    const { container } = render(<App />)

    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toBeInTheDocument()
    expect(screen.getByText('Demo workspace · Sample data')).toBeInTheDocument()
    for (const label of ['Work management', 'Service catalog', 'Knowledge & AI', 'Delivery & mobile']) {
      expect(screen.getAllByText(new RegExp(label)).length).toBeGreaterThan(0)
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    }
    expect(container.querySelector('.tour img[src^="/screenshots/"]')).toBeNull()
    expect(screen.getByRole('region', { name: 'Platform foundations' })).toBeInTheDocument()
  })

  it('includes the platform foundation, honest roadmap and FAQ', () => {
    render(<App />)

    for (const comparison of product.comparisons) {
      expect(screen.getByRole('heading', { level: 3, name: comparison.title })).toBeInTheDocument()
    }
    for (const item of product.roadmap.shipped) expect(screen.getByText(item)).toBeInTheDocument()
    for (const item of product.roadmap.next) expect(screen.getByText(item)).toBeInTheDocument()
    expect(screen.getByText('Can I run Terraline on my own infrastructure?')).toBeInTheDocument()
    expect(screen.getByText(/AI features send prompts to the configured LLM endpoint/)).toBeInTheDocument()
  })

  it('keeps anchor navigation and the Learn page reachable', () => {
    render(<App />)

    const navigation = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(within(navigation).getByRole('link', { name: 'Product' })).toHaveAttribute('href', '#product')
    expect(within(navigation).getByRole('link', { name: 'Platform' })).toHaveAttribute('href', '#platform')
    expect(within(navigation).getByRole('link', { name: 'Roadmap' })).toHaveAttribute('href', '#roadmap')
    expect(within(navigation).getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/learn')

    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobile navigation' })
    expect(within(mobileNavigation).getByRole('link', { name: 'Product' })).toHaveAttribute('href', '#product')
    expect(within(mobileNavigation).getByRole('link', { name: 'Platform' })).toHaveAttribute('href', '#platform')
    expect(within(mobileNavigation).getByRole('link', { name: 'Roadmap' })).toHaveAttribute('href', '#roadmap')
    expect(within(mobileNavigation).getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/learn')
  })
})
