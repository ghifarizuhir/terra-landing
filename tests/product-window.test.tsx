import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProductWindow from '../src/components/product-showcase/ProductWindow'

const makeProps = () => ({
  chapter: 'work' as const,
  step: 0,
  phase: 'playing' as const,
  reducedMotion: false,
  collapsed: false,
  onSelectChapter: vi.fn(),
  onPlaybackToggle: vi.fn(),
  onReplay: vi.fn(),
  onToggleCollapsed: vi.fn(),
})

describe('ProductWindow', () => {
  it('labels the sample app and forwards chapter and playback actions', () => {
    const props = makeProps()
    render(<ProductWindow {...props} />)

    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toBeInTheDocument()
    expect(screen.getByText('Demo workspace · Sample data')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pause animation' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Replay scene' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Work management' })).toHaveAttribute('aria-current', 'step')
    expect(screen.getByRole('button', { name: 'Service catalog' })).not.toHaveAttribute('aria-current')

    fireEvent.click(screen.getByRole('button', { name: 'Pause animation' }))
    fireEvent.click(screen.getByRole('button', { name: 'Replay scene' }))
    fireEvent.click(screen.getByRole('button', { name: 'Service catalog' }))
    expect(props.onPlaybackToggle).toHaveBeenCalledTimes(1)
    expect(props.onReplay).toHaveBeenCalledTimes(1)
    expect(props.onSelectChapter).toHaveBeenCalledWith('services')
  })

  it('shows Resume when paused and lets mobile visitors reopen a collapsed window', () => {
    const props = { ...makeProps(), phase: 'paused' as const, collapsed: true }
    const { rerender } = render(<ProductWindow {...props} />)
    fireEvent.click(screen.getByRole('button', { name: 'Show product demo' }))
    expect(props.onToggleCollapsed).toHaveBeenCalledTimes(1)
    rerender(<ProductWindow {...props} collapsed={false} />)
    expect(screen.getByRole('button', { name: 'Resume animation' })).toBeInTheDocument()
  })
})
