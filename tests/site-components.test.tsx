import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Nav from '../src/components/Nav'
import Footer from '../src/components/Footer'

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
