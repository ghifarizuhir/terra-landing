import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Nav from '../src/components/Nav'
import Footer from '../src/components/Footer'
import Hero from '../src/components/Hero'
import FactsStrip from '../src/components/FactsStrip'
import { product } from '../src/data/product'

describe('Nav', () => {
  it('links to product sections, learn and request access', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Terraline' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/learn')
    expect(screen.getAllByRole('link', { name: /request access/i }).length).toBeGreaterThan(0)
  })
})

describe('Footer', () => {
  it('keeps Plane attribution and contact', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /built on plane/i })).toHaveAttribute('href', 'https://plane.so')
    expect(screen.getByRole('link', { name: /learn/i })).toHaveAttribute('href', '/learn')
  })
})

describe('Hero', () => {
  it('renders the headline, both CTAs and the hero screenshot', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: /run services and delivery work/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: product.hero.primaryCta.label })).toHaveAttribute('href', product.hero.primaryCta.href)
    expect(screen.getByRole('link', { name: product.hero.secondaryCta.label })).toHaveAttribute('href', '#product')
    expect(screen.getByAltText(/work items board/i)).toBeInTheDocument()
  })
})

describe('FactsStrip', () => {
  it('renders every platform fact', () => {
    render(<FactsStrip />)
    for (const fact of product.facts) expect(screen.getByText(fact)).toBeInTheDocument()
  })
})
