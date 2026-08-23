import { describe, expect, it } from 'vitest'
import { managements, defaultSkills } from '../src/data/managements'
describe('managements data', () => {
  it('has 8 managements', () => { expect(managements).toHaveLength(8) })
  it('each has prefix, title, oneliner, bullets, skills, color', () => {
    for (const m of managements) {
      expect(m.prefix).toMatch(/^(INC|REQ|PRB|CHG|KB|IMP|AST|CI)-$/)
      expect(m.title.length).toBeGreaterThan(3)
      expect(m.oneLiner.length).toBeGreaterThan(10)
      expect(m.bullets.length).toBeGreaterThanOrEqual(2)
      expect(m.color).toBeTruthy()
    }
  })
  it('incident has Security Audit skill', () => {
    const inc = managements.find(m => m.prefix === 'INC-')!
    expect(inc.skills).toContain('Security Audit')
  })
  it('has 5 default skills', () => {
    expect(defaultSkills).toHaveLength(5)
  })
})
