import { render, screen, fireEvent, within } from '@testing-library/react'
import JourneyLoop from '../src/components/JourneyLoop'
import { describe, it, expect } from 'vitest'
describe('JourneyLoop', () => {
  it('renders all 8 managements', () => {
    render(<JourneyLoop />)
    expect(screen.getByText('Incident Management')).toBeInTheDocument()
    expect(screen.getByText(/Service Configuration/)).toBeInTheDocument()
  })
  it('renders foundation section', () => {
    render(<JourneyLoop />)
    expect(screen.getByText(/Foundation — always visible/i)).toBeInTheDocument()
  })
  it('shows cycle strip for Incident (all stages covered), none for non-staged management', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Incident Management/ }))
    expect(screen.getByText(/Cycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Detect & log').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText('06 · Close & learn').length).toBeGreaterThanOrEqual(2)

    fireEvent.click(screen.getByRole('button', { name: '← Back to grid' }))
    fireEvent.click(screen.getByRole('button', { name: /Asset Management/ }))
    const reqHeading = screen.getAllByText('Asset Management').find((el) => el.tagName === 'H2')!
    const overlay = reqHeading.closest('.fixed') as HTMLElement
    expect(overlay).toBeTruthy()
    expect(within(overlay).queryByText(/Cycle coverage — one skill per stage/i)).not.toBeInTheDocument()
  })
  it('shows cycle strip for Problem too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Problem Management/ }))
    expect(screen.getByText(/Cycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Detect & cluster').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText('06 · Close & watch').length).toBeGreaterThanOrEqual(2)
  })
  it('shows cycle strip for Change too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Change Management/ }))
    expect(screen.getByText(/Cycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Log & plan').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText('06 · Close & learn').length).toBeGreaterThanOrEqual(2)
  })
  it('shows cycle strip for Service Request too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Service Request Management/ }))
    expect(screen.getByText(/Cycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Intake & classify').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText('06 · Close & mine demand').length).toBeGreaterThanOrEqual(2)
  })
  it('shows cycle strip for Knowledge too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Knowledge Management/ }))
    expect(screen.getByText(/Cycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Capture').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText('06 · Maintain & retire').length).toBeGreaterThanOrEqual(2)
  })
})
