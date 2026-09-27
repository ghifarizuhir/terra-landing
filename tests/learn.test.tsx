import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LearnApp from '../src/LearnApp'

describe('learn page', () => {
  it('keeps the knowledge content and links back to the product', () => {
    render(<LearnApp />)
    expect(screen.getByText('Incident Management')).toBeInTheDocument()
    expect(screen.getByText(/Assets & configuration as the foundation/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /why records stay trustworthy/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /← product/i })).toHaveAttribute('href', '/')
  })
})
