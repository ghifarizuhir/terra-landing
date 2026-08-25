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
  it('change covers the full 6-stage cycle, one skill per stage, in order', () => {
    const chg = managements.find(m => m.prefix === 'CHG-')!
    expect(chg.skills).toHaveLength(6)
    for (const s of chg.skills) expect(s.stage).toBeTruthy()
    const stages = [...chg.skills].map(s => s.stage!).sort((a, b) => a.localeCompare(b))
    expect(stages.map(s => s.replace(/^0[0-9] · /, ''))).toEqual([
      'Log & plan', 'Assess risk', 'Map blast radius', 'Approve & schedule', 'Deploy & verify', 'Close & learn',
    ])
  })
  it('request covers the full 6-stage cycle, one skill per stage, in order', () => {
    const req = managements.find(m => m.prefix === 'REQ-')!
    expect(req.skills).toHaveLength(6)
    for (const s of req.skills) expect(s.stage).toBeTruthy()
    const stages = [...req.skills].map(s => s.stage!).sort((a, b) => a.localeCompare(b))
    expect(stages.map(s => s.replace(/^0[0-9] · /, ''))).toEqual([
      'Intake & classify', 'Validate', 'Approve', 'Route & fulfill', 'Deliver & confirm', 'Close & mine demand',
    ])
  })
  it('knowledge covers the full 6-stage cycle, one skill per stage, in order', () => {
    const kb = managements.find(m => m.prefix === 'KB-')!
    expect(kb.skills).toHaveLength(6)
    for (const s of kb.skills) expect(s.stage).toBeTruthy()
    const stages = [...kb.skills].map(s => s.stage!).sort((a, b) => a.localeCompare(b))
    expect(stages.map(s => s.replace(/^0[0-9] · /, ''))).toEqual([
      'Capture', 'Structure & review', 'Publish & target', 'Find & surface', 'Use & feedback', 'Maintain & retire',
    ])
  })
  it('improvement covers the full 6-stage cycle, one skill per stage, in order', () => {
    const imp = managements.find(m => m.prefix === 'IMP-')!
    expect(imp.skills).toHaveLength(6)
    for (const s of imp.skills) expect(s.stage).toBeTruthy()
    const stages = [...imp.skills].map(s => s.stage!).sort((a, b) => a.localeCompare(b))
    expect(stages.map(s => s.replace(/^0[0-9] · /, ''))).toEqual([
      'Detect signal', 'Mine ideas', 'Prioritize', 'Implement & track', 'Verify outcome', 'Embed & close',
    ])
  })
  it('asset covers the full 6-stage workflow, one skill per stage, in order', () => {
    const ast = managements.find(m => m.prefix === 'AST-')!
    expect(ast.skills).toHaveLength(6)
    for (const s of ast.skills) expect(s.stage).toBeTruthy()
    const stages = [...ast.skills].map(s => s.stage!).sort((a, b) => a.localeCompare(b))
    expect(stages.map(s => s.replace(/^0[0-9] · /, ''))).toEqual([
      'Receive & register', 'Categorize & tag', 'Link to operations', 'Track & maintain', 'Audit & reconcile', 'Retire & dispose',
    ])
  })
  it('config covers the full 6-stage workflow, one skill per stage, in order', () => {
    const ci = managements.find(m => m.prefix === 'CI-')!
    expect(ci.skills).toHaveLength(6)
    for (const s of ci.skills) expect(s.stage).toBeTruthy()
    const stages = [...ci.skills].map(s => s.stage!).sort((a, b) => a.localeCompare(b))
    expect(stages.map(s => s.replace(/^0[0-9] · /, ''))).toEqual([
      'Register & describe', 'Map dependencies', 'Detect drift', 'Predict impact', 'Score health', 'Retire & clean',
    ])
  })
  it('has 5 default skills', () => {
    expect(defaultSkills).toHaveLength(5)
  })
})
