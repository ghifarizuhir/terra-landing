import { defaultSkills } from '../data/managements'
import { Sparkles } from 'lucide-react'
export default function SkillsSection() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-2">AI Agent Skills — per Management</h2>
      <p className="text-sm text-zinc-500 mb-6">5 default skills seeded per org via <span className="font-mono bg-zinc-900 text-white px-1.5 py-0.5 rounded text-xs">GET /api/skills</span>. Attach to any Incident/Problem/Change/CI — plus create custom skills.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {defaultSkills.map(s => (
          <div key={s.name} className="rounded-2xl border bg-white p-5">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="font-semibold text-sm">{s.name}</span>
            </div>
            <div className="text-xs font-mono text-zinc-500">{s.entityType} · {s.reviewType}</div>
          </div>
        ))}
        <div className="rounded-2xl border-2 border-dashed bg-zinc-50 p-5 flex flex-col justify-center">
          <div className="font-semibold text-sm">Create custom skill</div>
          <div className="text-xs text-zinc-500">Define entityType, reviewType, instructions + welcomePrompts (max 10)</div>
        </div>
      </div>
    </section>
  )
}
