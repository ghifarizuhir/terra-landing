import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { product } from '../src/data/product'

describe('homepage landing page', () => {
  it('shows the product promise, access CTA and platform facts', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /Run services and delivery work in one system/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Request a demo/ })).toHaveAttribute('href', product.hero.primaryCta.href)
    const foundation = screen.getByRole('region', { name: 'Platform foundations' })
    for (const fact of product.facts) expect(within(foundation).getByText(fact)).toBeInTheDocument()
    const accessLinks = screen.getAllByRole('link', { name: /Request access/ })
    expect(accessLinks.length).toBeGreaterThan(0)
    for (const link of accessLinks) expect(link).toHaveAttribute('href', product.cta.href)
  })

  it('presents the product capabilities with real product screenshots', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Bring your service work into one system.' })).toBeInTheDocument()
    for (const label of ['Work management', 'Service catalog', 'Knowledge & AI', 'Delivery & mobile']) {
      expect(screen.getAllByText(new RegExp(label)).length).toBeGreaterThan(0)
    }
    expect(screen.getAllByRole('img', { name: product.hero.screenshot.alt })).toHaveLength(2)
    expect(screen.getByRole('img', { name: product.features.find((item) => item.id === 'services')!.screenshots[1].alt })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: product.features.find((item) => item.id === 'mobile')!.screenshots[0].alt })).toBeInTheDocument()
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
