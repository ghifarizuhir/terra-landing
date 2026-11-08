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
    expect(product.problem.cards).toHaveLength(3)
    expect(product.pilot.scope.length).toBeGreaterThanOrEqual(4)
    expect(product.coexistence.cards).toHaveLength(2)
    expect(product.roadmap.shipped.length).toBeGreaterThan(0)
    expect(product.roadmap.pilot.length).toBeGreaterThan(0)
    expect(product.roadmap.outOfScope.length).toBeGreaterThan(0)
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

  it('does not claim per-type workflows', () => {
    const copy = JSON.stringify({
      meta: product.meta,
      hero: product.hero,
      features: product.features,
      comparisons: product.comparisons,
      roadmap: product.roadmap,
    }).toLowerCase()

    expect(copy).not.toContain('workflow')
  })

  it('keeps the pilot boundary explicit', () => {
    const pilot = JSON.stringify(product.pilot).toLowerCase()
    const shipped = JSON.stringify(product.roadmap.shipped).toLowerCase()

    expect(pilot).toContain('bnm rmit')
    expect(pilot).toContain('cyber security act 2024')
    expect(pilot).toContain('in pilot')
    expect(shipped).not.toContain('regulator pack')
    expect(shipped).not.toContain('evidence pack')
  })

  it('links to the public source repository', () => {
    expect(product.footer.repoUrl).toBe('https://github.com/ghifarizuhir/plane-for-itsm')
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
