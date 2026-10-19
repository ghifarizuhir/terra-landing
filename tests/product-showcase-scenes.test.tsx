import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SceneView from '../src/components/product-showcase/SceneView'
import { showcaseChapters } from '../src/data/product-demo'

describe('product showcase scenes', () => {
  it('shows the sample work item in the workflow board', () => {
    render(<SceneView chapter="work" step={2} reducedMotion={false} />)
    expect(screen.getByText('TERRA-42')).toBeInTheDocument()
    expect(screen.getByText('API latency spike')).toBeInTheDocument()
    expect(screen.getByText('In progress')).toBeInTheDocument()
  })

  it('shows service names and a labeled dependency graph', () => {
    render(<SceneView chapter="services" step={2} reducedMotion={false} />)
    expect(screen.getByText('API Gateway')).toBeInTheDocument()
    expect(screen.getByText('Payment Gateway')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /service dependency graph/i })).toBeInTheDocument()
  })

  it('reveals the simulated service-health change as the graph resolves', () => {
    const { rerender } = render(<SceneView chapter="services" step={1} reducedMotion={false} />)
    expect(screen.getAllByText('Healthy').length).toBeGreaterThan(0)
    rerender(<SceneView chapter="services" step={2} reducedMotion={false} />)
    expect(screen.getByText('Degraded · 1 incident')).toBeInTheDocument()
  })

  it('shows a fixed Galileo answer without a live request', () => {
    render(<SceneView chapter="galileo" step={2} reducedMotion={false} />)
    expect(screen.getByText('What is affected?')).toBeInTheDocument()
    expect(screen.getByText(/depends on API Gateway/)).toBeInTheDocument()
  })

  it('shows cycle progress and the mobile update', () => {
    render(<SceneView chapter="delivery" step={2} reducedMotion={false} />)
    expect(screen.getByText('Week 2: Triage and response')).toBeInTheDocument()
    expect(screen.getByText('Added an incident response update')).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /mobile work item/i })).toBeInTheDocument()
  })

  it('renders every scene without screenshot image elements', () => {
    for (const chapter of showcaseChapters) {
      const { container, unmount } = render(<SceneView chapter={chapter.id} step={chapter.steps - 1} reducedMotion />)
      expect(container.querySelector('img')).toBeNull()
      unmount()
    }
  })
})
