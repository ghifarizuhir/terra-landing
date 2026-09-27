import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Nav from '../src/components/Nav'
import Footer from '../src/components/Footer'
import Hero from '../src/components/Hero'
import FactsStrip from '../src/components/FactsStrip'
import FeatureBlock from '../src/components/FeatureBlock'
import CompareCards from '../src/components/CompareCards'
import RoadmapColumns from '../src/components/RoadmapColumns'
import CTABand from '../src/components/CTABand'
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

describe('FeatureBlock', () => {
  it('renders eyebrow, title, bullets and every screenshot', () => {
    const feature = product.features[2]
    render(<FeatureBlock feature={feature} index={2} />)
    expect(screen.getByRole('heading', { level: 3, name: feature.title })).toBeInTheDocument()
    expect(screen.getByText(feature.eyebrow)).toBeInTheDocument()
    for (const bullet of feature.bullets) expect(screen.getByText(bullet)).toBeInTheDocument()
    for (const s of feature.screenshots) expect(screen.getByAltText(s.alt)).toBeInTheDocument()
  })
})

describe('CompareCards', () => {
  it('renders both comparisons with their points', () => {
    render(<CompareCards />)
    for (const c of product.comparisons) {
      expect(screen.getByRole('heading', { level: 3, name: c.title })).toBeInTheDocument()
      for (const point of c.points) expect(screen.getByText(point)).toBeInTheDocument()
    }
  })
})

describe('RoadmapColumns', () => {
  it('renders shipped and next columns', () => {
    render(<RoadmapColumns />)
    expect(screen.getByRole('heading', { level: 3, name: /shipped today/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /^next$/i })).toBeInTheDocument()
    expect(screen.getByText(product.roadmap.next[0])).toBeInTheDocument()
  })
})

describe('CTABand', () => {
  it('renders the request-access CTA', () => {
    render(<CTABand />)
    expect(screen.getByRole('heading', { level: 2, name: product.cta.title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: product.cta.label })).toHaveAttribute('href', product.cta.href)
  })
})
