import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { product } from '../src/data/product'

describe('homepage', () => {
  it('renders the full proof-led tour', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: product.hero.title })).toBeInTheDocument()
    const facts = within(screen.getByLabelText('Platform facts'))
    for (const fact of product.facts) expect(facts.getByText(fact)).toBeInTheDocument()
    for (const feature of product.features) {
      expect(screen.getByRole('heading', { level: 3, name: feature.title })).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { level: 3, name: /shipped today/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: product.cta.title })).toBeInTheDocument()
  })

  it('links to /learn and request access', () => {
    render(<App />)
    const learnLinks = screen.getAllByRole('link', { name: 'Learn' })
    expect(learnLinks.length).toBeGreaterThan(0)
    for (const link of learnLinks) expect(link).toHaveAttribute('href', '/learn')
    expect(screen.getAllByRole('link', { name: /request (access|a demo)/i }).length).toBeGreaterThan(0)
  })
})
