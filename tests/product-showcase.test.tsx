import { useRef } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>()
  return {
    ...actual,
    useReducedMotion: () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }
})

import { showcaseChapters } from '../src/data/product-demo'
import ProductWindow from '../src/components/product-showcase/ProductWindow'
import { useProductShowcase } from '../src/components/product-showcase/use-product-showcase'

class ControlledIntersectionObserver {
  static instances: ControlledIntersectionObserver[] = []

  constructor(private callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
    ControlledIntersectionObserver.instances.push(this)
  }

  observe(_target: Element) {}
  unobserve() {}
  disconnect = vi.fn()
  takeRecords(): IntersectionObserverEntry[] { return [] }

  enter(target: Element) {
    this.callback([{ target, isIntersecting: true, intersectionRatio: 0.8 } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
  }
}

function Harness() {
  const storyRef = useRef<HTMLDivElement>(null)
  const demo = useProductShowcase(storyRef)
  return (
    <>
      <div ref={storyRef}>
        {showcaseChapters.map((chapter) => (
          <section key={chapter.id} data-showcase-chapter={chapter.id} />
        ))}
      </div>
      <ProductWindow
        chapter={demo.activeChapter}
        step={demo.step}
        phase={demo.phase}
        reducedMotion={demo.reducedMotion}
        collapsed={demo.collapsed}
        onSelectChapter={demo.activateChapter}
        onPlaybackToggle={demo.togglePlayback}
        onReplay={demo.replay}
        onToggleCollapsed={demo.toggleCollapsed}
      />
    </>
  )
}

beforeEach(() => {
  ControlledIntersectionObserver.instances = []
  vi.stubGlobal('IntersectionObserver', ControlledIntersectionObserver)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  vi.useRealTimers()
  if (originalHidden) Object.defineProperty(document, 'hidden', originalHidden)
})

const enter = (container: HTMLElement, chapter: string) => {
  const target = container.querySelector(`[data-showcase-chapter="${chapter}"]`)
  if (!target) throw new Error(`Missing showcase chapter: ${chapter}`)
  act(() => ControlledIntersectionObserver.instances[0]!.enter(target))
}

const originalHidden = Object.getOwnPropertyDescriptor(document, 'hidden')

describe('useProductShowcase', () => {
  it('selects the scene for the intersecting story chapter', () => {
    const { container } = render(<Harness />)
    enter(container, 'services')
    expect(screen.getByRole('button', { name: 'Service catalog' })).toHaveAttribute('aria-current', 'step')
    expect(screen.getByText('API Gateway')).toBeInTheDocument()
  })

  it('plays a chapter once, holds its final state on return, and replays on request', () => {
    vi.useFakeTimers()
    const { container } = render(<Harness />)
    for (let i = 0; i < 4; i += 1) act(() => vi.advanceTimersByTime(1000))
    enter(container, 'services')
    for (let i = 0; i < 4; i += 1) act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'complete')
    enter(container, 'work')
    enter(container, 'services')
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'complete')
    fireEvent.click(screen.getByRole('button', { name: 'Replay scene' }))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'playing')
  })

  it('keeps a manual pause across chapter changes until Resume is pressed', () => {
    const { container } = render(<Harness />)
    enter(container, 'services')
    fireEvent.click(screen.getByRole('button', { name: 'Pause animation' }))
    enter(container, 'galileo')
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'paused')
    fireEvent.click(screen.getByRole('button', { name: 'Resume animation' }))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'playing')
  })

  it('uses a final static state when reduced motion is requested', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion'), media: query, onchange: null,
      addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false },
    }) as MediaQueryList)
    render(<Harness />)
    await waitFor(() => expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'static'))
  })

  it('pauses for a hidden tab and resumes only an unpaused active scene', () => {
    const { container } = render(<Harness />)
    enter(container, 'services')
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'paused')
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'playing')
  })

  it('does not resume a different chapter that becomes active while the tab is hidden', () => {
    const { container } = render(<Harness />)
    enter(container, 'services')
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    enter(container, 'galileo')
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(screen.getByRole('region', { name: /terraline demo workspace/i })).toHaveAttribute('data-showcase-phase', 'paused')
  })

  it('disconnects the observer and clears the active timer on unmount', () => {
    vi.useFakeTimers()
    const { unmount } = render(<Harness />)
    const observer = ControlledIntersectionObserver.instances[0]!
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    unmount()
    expect(observer.disconnect).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
  })
})
