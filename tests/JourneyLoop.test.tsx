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
    fireEvent.click(screen.getByRole('button', { name: /Service Request Management/ }))
    const reqHeading = screen.getAllByText('Service Request Management').find((el) => el.tagName === 'H2')!
    const overlay = reqHeading.closest('.fixed') as HTMLElement
    expect(overlay).toBeTruthy()
    expect(within(overlay).queryByText(/Cycle coverage — one skill per stage/i)).not.toBeInTheDocument()
  })
})
