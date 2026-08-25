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
    expect(screen.getByText(/Assets & configuration as the foundation/i)).toBeInTheDocument()
  })
  it('shows cycle strip for Incident, workflow strip for Asset', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Incident Management/ }))
    expect(screen.getByText(/Full lifecycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Detect & log').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('07 · Reporting & records').length).toBeGreaterThanOrEqual(1)

    fireEvent.click(screen.getByRole('button', { name: '← All practices' }))
    fireEvent.click(screen.getByRole('button', { name: /Asset Management/ }))
    const astHeading = screen.getByRole('heading', { level: 2, name: /Asset Management/ })
    const overlay = astHeading.closest('.fixed') as HTMLElement
    expect(overlay).toBeTruthy()
    expect(within(overlay).getByText(/Always-on foundation — one skill per stage/i)).toBeInTheDocument()
  })
  it('shows workflow strip for Service Configuration too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Service Configuration/ }))
    expect(screen.getByText(/Always-on foundation — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Register & describe').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('07 · Reporting & records').length).toBeGreaterThanOrEqual(1)
  })
  it('shows cycle strip for Problem too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Problem Management/ }))
    expect(screen.getByText(/Full lifecycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Detect & cluster').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('07 · Reporting & records').length).toBeGreaterThanOrEqual(1)
  })
  it('shows cycle strip for Change too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Change Management/ }))
    expect(screen.getByText(/Full lifecycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Log & plan').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('07 · Reporting & records').length).toBeGreaterThanOrEqual(1)
  })
  it('shows cycle strip for Service Request too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Service Request Management/ }))
    expect(screen.getByText(/Full lifecycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Intake & classify').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('07 · Reporting & records').length).toBeGreaterThanOrEqual(1)
  })
  it('shows cycle strip for Knowledge too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Knowledge Management/ }))
    expect(screen.getByText(/Full lifecycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Capture').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('07 · Reporting & records').length).toBeGreaterThanOrEqual(1)
  })
  it('shows cycle strip for Continual Improvement too', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Continual Improvement/ }))
    expect(screen.getByText(/Full lifecycle coverage — one skill per stage/i)).toBeInTheDocument()
    expect(screen.getAllByText('01 · Detect signal').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('07 · Reporting & records').length).toBeGreaterThanOrEqual(1)
  })
  it('rail switches skill in reader (detail A)', () => {
    render(<JourneyLoop />)
    fireEvent.click(screen.getByRole('button', { name: /Incident Management/ }))
    expect(screen.getAllByText('Incident records pack').length).toBeGreaterThanOrEqual(1)
    const railBtn = screen.getAllByText('01 · Detect & log')[0].closest('button')!
    fireEvent.click(railBtn)
    expect(screen.getAllByText('Auto-log enrichment').length).toBeGreaterThanOrEqual(1)
  })
})
