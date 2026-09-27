import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Footer from '../src/components/Footer'

describe('Footer', () => {
  it('keeps Plane attribution and contact', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /built on plane/i })).toHaveAttribute('href', 'https://plane.so')
    expect(screen.getByRole('link', { name: /learn/i })).toHaveAttribute('href', '/learn')
  })
})
