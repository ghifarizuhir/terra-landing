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
  it('incident has AI skill', () => {
    const inc = managements.find(m => m.prefix === 'INC-')!
    expect(inc.skills.length).toBeGreaterThan(0)
    expect(inc.bullets.join(' ')).toMatch(/incident|restore/i)
  })
  it('incident covers the full 6-stage cycle, one skill per stage, in order', () => {
    const inc = managements.find(m => m.prefix === 'INC-')!
    expect(inc.skills).toHaveLength(6)
    for (const s of inc.skills) expect(s.stage).toBeTruthy()
    const stages = [...inc.skills].map(s => s.stage!).sort((a, b) => a.localeCompare(b))
    expect(stages.map(s => s.replace(/^0[0-9] · /, ''))).toEqual([
      'Detect & log', 'Triage', 'Diagnose', 'Communicate', 'Resolve & restore', 'Close & learn',
    ])
  })
  it('problem covers the full 6-stage cycle, one skill per stage, in order', () => {
    const prb = managements.find(m => m.prefix === 'PRB-')!
    expect(prb.skills).toHaveLength(6)
    for (const s of prb.skills) expect(s.stage).toBeTruthy()
    const stages = [...prb.skills].map(s => s.stage!).sort((a, b) => a.localeCompare(b))
    expect(stages.map(s => s.replace(/^0[0-9] · /, ''))).toEqual([
      'Detect & cluster', 'Prioritize', 'Investigate (RCA)', 'Workaround', 'Verify fix', 'Close & watch',
    ])
  })
  it('has 5 default skills', () => {
    expect(defaultSkills).toHaveLength(5)
  })
})
