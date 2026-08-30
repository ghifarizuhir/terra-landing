import '@testing-library/jest-dom'
import { afterEach } from 'vitest'

afterEach(() => {
  window.location.hash = ''
  history.replaceState(null, '', window.location.pathname + window.location.search)
})

// Polyfill IntersectionObserver for framer-motion whileInView in jsdom
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  class MockIntersectionObserver implements IntersectionObserver {
    root: Element | Document | null = null
    rootMargin = ''
    thresholds: ReadonlyArray<number> = []
    constructor(private cb: IntersectionObserverCallback) {}
    observe() { this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver) }
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] { return [] }
  }
  Object.defineProperty(window, 'IntersectionObserver', { writable: true, configurable: true, value: MockIntersectionObserver })
  Object.defineProperty(globalThis, 'IntersectionObserver', { writable: true, configurable: true, value: MockIntersectionObserver })
}

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      // default to mobile=true for max-width queries (JourneyLoop tests expect single foundation)
      // and reduced-motion false (animations enabled) to avoid warning noise
      matches: query.includes('max-width') ? true : query.includes('prefers-reduced-motion') ? false : false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
}
