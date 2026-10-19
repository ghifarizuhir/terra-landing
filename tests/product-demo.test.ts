import { describe, expect, it } from 'vitest'
import { productDemo, showcaseChapters } from '../src/data/product-demo'

describe('product showcase fixtures', () => {
  it('defines the four scenes in product-story order', () => {
    expect(showcaseChapters.map((chapter) => chapter.id)).toEqual([
      'work',
      'services',
      'galileo',
      'delivery',
    ])
  })

  it('labels all scenario content as sample data and uses valid graph endpoints', () => {
    expect(productDemo.label).toBe('Demo workspace · Sample data')
    const serviceIds = new Set(productDemo.services.map((service) => service.id))
    expect(productDemo.dependencies.length).toBeGreaterThan(0)
    for (const edge of productDemo.dependencies) {
      expect(serviceIds.has(edge.from)).toBe(true)
      expect(serviceIds.has(edge.to)).toBe(true)
    }
    expect(productDemo.assistant.response.length).toBeGreaterThan(20)
  })
})
