import { defaultSkills } from '../data/managements'
import { Sparkles, Plus } from 'lucide-react'

export default function SkillsSection() {
  return (
    <section id="skills" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <h2 className="font-display text-[26px] font-bold tracking-tight uppercase leading-none text-[#1a1d23]">
            Work Instructions — 5 Andon Skills
          </h2>
          <p className="mt-2 text-[13px] leading-[1.6] text-[#3a3f4a] max-w-[64ch]">
            Seeded per org via <span className="font-mono text-[12px] bg-[#1a1d23] text-[#fafaf7] px-1.5 py-0.5">GET /api/skills</span> — each skill is an Andon call bound to its station. Attach to any Incident / Problem / Change / CI.
          </p>
        </div>
        <span className="hidden lg:inline-flex font-mono text-[10px] tracking-widest uppercase bg-[#facc15] text-[#1a1d23] px-2 py-1 font-bold shrink-0">Standard work</span>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-[#1a1d23] p-px">
        {defaultSkills.map((s) => (
          <div key={s.name} className="bg-[#fafaf7] p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-6 w-6 bg-[#1a1d23] text-[#facc15] grid place-items-center">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="font-display text-[13px] font-semibold tracking-widest uppercase text-[#1a1d23]">{s.name}</span>
            </div>
            <div className="font-mono text-[11px] tracking-widest uppercase text-[#8a8f98]">{s.entityType} · {s.reviewType}</div>
            <div className="mt-3 font-mono text-[11px] leading-[1.5] text-[#3a3f4a] border-t border-[#e8e9eb] pt-3">
              Instructions + welcomePrompts (max 10) — injected into agent system prompt per station.
            </div>
          </div>
        ))}
        <div className="bg-[#fafaf7] border-2 border-dashed border-[#1a1d23] p-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-6 w-6 border border-[#1a1d23] grid place-items-center">
              <Plus className="h-3.5 w-3.5" />
            </span>
            <span className="font-display text-[13px] font-semibold tracking-widest uppercase">Create custom skill</span>
          </div>
          <div className="font-mono text-[11px] leading-[1.5] text-[#8a8f98]">Define entityType, reviewType, instructions — up to 10 prompts. Cord pulls become your own standard work.</div>
        </div>
      </div>
    </section>
  )
}
