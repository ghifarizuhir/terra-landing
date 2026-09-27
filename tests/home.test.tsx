import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { product } from '../src/data/product'
import { chapters, totalChapters } from '../src/data/tour'

const status = (index: number) => `Chapter ${index + 1} of ${totalChapters}: ${chapters[index].title}`

const controls = () => screen.getByRole('button', { name: 'Next chapter' }).closest('footer') as HTMLElement

describe('homepage tour', () => {
  it('opens on the cover with the headline, CTA and platform facts', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: product.hero.title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: product.hero.primaryCta.label })).toHaveAttribute(
      'href',
      product.hero.primaryCta.href,
    )
    for (const fact of product.facts) expect(screen.getByText(fact)).toBeInTheDocument()
    expect(within(controls()).getByText('00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous chapter' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next chapter' })).toBeEnabled()
  })

  it('walks chapters with the arrow keys and reports position for screen readers', async () => {
    render(<App />)
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(screen.getByText(status(1))).toBeInTheDocument()
    expect(await screen.findByRole('heading', { level: 1, name: chapters[1].title })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous chapter' })).toBeEnabled()
  })

  it('steps through screenshots before leaving a chapter', async () => {
    render(<App />)
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    await screen.findByRole('heading', { level: 1, name: chapters[1].title })

    const beats = chapters[1].beats.length
    const ticks = screen.getByRole('group', { name: 'Screenshots in this chapter' })
    expect(within(ticks).getAllByRole('button')).toHaveLength(beats)
    expect(within(ticks).getByRole('button', { name: `Screenshot 1 of ${beats}` })).toHaveAttribute(
      'aria-current',
      'true',
    )

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(screen.getByText(status(1))).toBeInTheDocument()
    expect(within(ticks).getByRole('button', { name: `Screenshot 2 of ${beats}` })).toHaveAttribute(
      'aria-current',
      'true',
    )
  })

  it('jumps straight to a chapter from the top bar', async () => {
    render(<App />)
    const last = totalChapters - 1
    fireEvent.click(screen.getByRole('button', { name: `Chapter ${last + 1} of ${totalChapters}: ${chapters[last].title}` }))
    expect(screen.getByText(status(last))).toBeInTheDocument()
    expect(await screen.findByRole('heading', { level: 2, name: chapters[last].title })).toBeInTheDocument()
    const ctas = screen.getAllByRole('link', { name: product.cta.label })
    expect(ctas.length).toBeGreaterThan(0)
    for (const cta of ctas) expect(cta).toHaveAttribute('href', product.cta.href)
    expect(within(controls()).getByText('11')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next chapter' })).toBeDisabled()
  })

  it('renders the why chapter with comparisons and stack facts', async () => {
    render(<App />)
    fireEvent.keyDown(window, { key: 'Home' })
    fireEvent.click(screen.getByRole('button', { name: `Chapter 11 of ${totalChapters}: ${chapters[10].title}` }))
    expect(await screen.findByRole('heading', { level: 2, name: chapters[10].title })).toBeInTheDocument()
    for (const card of product.comparisons) {
      expect(screen.getByRole('heading', { level: 3, name: card.title })).toBeInTheDocument()
    }
    for (const fact of product.architecture.facts) expect(screen.getByText(fact)).toBeInTheDocument()
  })

  it('returns to the cover from the End key with Home', async () => {
    render(<App />)
    fireEvent.keyDown(window, { key: 'End' })
    expect(screen.getByText(status(totalChapters - 1))).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Home' })
    await waitFor(() => expect(screen.getByText(status(0))).toBeInTheDocument())
    expect(await screen.findByRole('heading', { level: 1, name: product.hero.title })).toBeInTheDocument()
  })

  it('links to /learn and request access', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/learn')
    expect(screen.getByRole('link', { name: 'Request access' })).toHaveAttribute('href', product.cta.href)
  })
})
