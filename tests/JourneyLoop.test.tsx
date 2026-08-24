import { render, screen } from '@testing-library/react'
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
})
