import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { product } from '../src/data/product'

const publicDir = resolve(process.cwd(), 'public')

describe('product data', () => {
  it('has hero, facts, features, comparisons, roadmap and cta', () => {
    expect(product.hero.title.length).toBeGreaterThan(10)
    expect(product.facts.length).toBeGreaterThanOrEqual(4)
    expect(product.features).toHaveLength(9)
    expect(product.comparisons).toHaveLength(2)
    expect(product.roadmap.shipped.length).toBeGreaterThan(0)
    expect(product.roadmap.next.length).toBeGreaterThan(0)
    expect(product.cta.href.startsWith('mailto:')).toBe(true)
  })

  it('has unique feature ids and meaningful screenshots', () => {
    const ids = product.features.map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const f of product.features) {
      expect(f.screenshots.length).toBeGreaterThan(0)
      for (const s of f.screenshots) {
        expect(s.src).toMatch(/^\/screenshots\/[a-z-]+\.webp$/)
        expect(s.alt.length).toBeGreaterThan(10)
      }
    }
  })
})

describe('screenshot files', () => {
  it('every referenced screenshot exists on disk', () => {
    for (const feature of product.features) {
      for (const screenshot of feature.screenshots) {
        expect(existsSync(publicDir + screenshot.src), `missing ${screenshot.src}`).toBe(true)
      }
    }
    expect(existsSync(publicDir + product.hero.screenshot.src)).toBe(true)
  })
})
