import '@testing-library/jest-dom'

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      // default to mobile=false (desktop) but JourneyLoop tests expect single foundation
      // For desktop the subtitle contains 'foundation' causing duplicate with heading,
      // so we default to mobile (true) to ensure getByText(/foundation/i) finds single element.
      // Tests that need desktop can override window.matchMedia per-test.
      matches: true,
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
