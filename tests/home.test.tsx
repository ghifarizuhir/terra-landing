import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { product } from '../src/data/product'

describe('homepage landing page', () => {
  it('shows the incident record promise, pilot CTA and platform facts', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /Run the incident. Keep the evidence./ })).toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: /Sample incident record/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Apply for a design partner pilot/ })[0]).toHaveAttribute('href', product.hero.primaryCta.href)
    const foundation = screen.getByRole('region', { name: 'Pilot and platform facts' })
    for (const fact of product.facts) expect(within(foundation).getByText(fact)).toBeInTheDocument()
    const pilotLinks = screen.getAllByRole('link', { name: /Apply for a design partner pilot/ })
    expect(pilotLinks.length).toBeGreaterThan(0)
    for (const link of pilotLinks) expect(link).toHaveAttribute('href', product.cta.href)
  })

  it('cycles product chapters via slide controls while keeping the demo window stationary', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Intake & triage' })).toHaveAttribute('aria-current', 'step')
    fireEvent.click(screen.getByRole('button', { name: 'Next chapter slide' }))
    expect(screen.getByRole('button', { name: 'Service context' })).toHaveAttribute('aria-current', 'step')
    fireEvent.click(screen.getByRole('button', { name: 'Previous chapter slide' }))
    expect(screen.getByRole('button', { name: 'Intake & triage' })).toHaveAttribute('aria-current', 'step')
  })

  it('shows one animated product window instead of product screenshots', () => {
    const { container } = render(<App />)

    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toBeInTheDocument()
    expect(screen.getByText('Demo workspace · Sample data')).toBeInTheDocument()
    for (const label of ['Intake & triage', 'Service context', 'Evidence & AI', 'Reports & delivery']) {
      expect(screen.getAllByText(new RegExp(label)).length).toBeGreaterThan(0)
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    }
    expect(container.querySelector('.tour img[src^="/screenshots/"]')).toBeNull()
    expect(screen.getByRole('region', { name: 'Pilot and platform facts' })).toBeInTheDocument()
  })

  it('includes the shipped record, explicit pilot scope and FAQ', () => {
    render(<App />)

    for (const comparison of product.comparisons) {
      expect(screen.getByRole('heading', { level: 3, name: comparison.title })).toBeInTheDocument()
    }
    for (const item of product.roadmap.shipped) expect(screen.getAllByText(item).length).toBeGreaterThan(0)
    for (const item of product.roadmap.pilot) expect(screen.getAllByText(item).length).toBeGreaterThan(0)
    for (const item of product.roadmap.outOfScope) expect(screen.getAllByText(item).length).toBeGreaterThan(0)
    expect(screen.getByText('Is Terraline ITIL-certified?')).toBeInTheDocument()
    expect(screen.getByText(/We do not claim certification/)).toBeInTheDocument()
    expect(screen.getByText('Which regulator pack comes first?')).toBeInTheDocument()
    expect(screen.getByText(/BNM RMiT and the Cyber Security Act 2024/)).toBeInTheDocument()
    expect(screen.getByText('Can we self-host?')).toBeInTheDocument()
    expect(screen.getByText(/AI requests follow the LLM endpoint you configure/)).toBeInTheDocument()
  })

  it('shows the reporting problem and the design partner pilot', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 2, name: product.problem.title })).toBeInTheDocument()
    for (const card of product.problem.cards) {
      expect(screen.getByRole('heading', { level: 3, name: card.title })).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { level: 2, name: product.pilot.title })).toBeInTheDocument()
    for (const item of product.pilot.scope) {
      expect(screen.getAllByText(item.title).length).toBeGreaterThan(0)
    }
    expect(screen.getByRole('heading', { level: 2, name: product.cta.title })).toBeInTheDocument()
  })

  it('keeps anchor navigation and the Learn page reachable', () => {
    render(<App />)

    const navigation = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(within(navigation).getByRole('link', { name: 'Record' })).toHaveAttribute('href', '#product')
    expect(within(navigation).getByRole('link', { name: 'Pilot' })).toHaveAttribute('href', '#pilot')
    expect(within(navigation).getByRole('link', { name: 'Platform' })).toHaveAttribute('href', '#platform')
    expect(within(navigation).getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/learn')

    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobile navigation' })
    expect(within(mobileNavigation).getByRole('link', { name: 'Record' })).toHaveAttribute('href', '#product')
    expect(within(mobileNavigation).getByRole('link', { name: 'Pilot' })).toHaveAttribute('href', '#pilot')
    expect(within(mobileNavigation).getByRole('link', { name: 'Platform' })).toHaveAttribute('href', '#platform')
    expect(within(mobileNavigation).getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/learn')
  })

  it('links to the source repository', () => {
    render(<App />)

    const repoLinks = screen.getAllByRole('link', { name: /GitHub/ })
    expect(repoLinks.some((link) => link.getAttribute('href') === product.footer.repoUrl)).toBe(true)
  })
})
