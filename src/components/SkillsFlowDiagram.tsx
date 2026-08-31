import { useState } from 'react'
import { motion } from 'framer-motion'

type FlowStep = {
  id: string
  label: string
  sub: string
  detail: string
  accent: string
}

const steps: FlowStep[] = [
  { id: '01', label: 'Signal', sub: 'Ingest', detail: 'Incident, request, or alert arrives with raw context', accent: '#FAFF00' },
  { id: '02', label: 'Skill detects', sub: 'Match', detail: 'Skill checks: when to use? confidence ≥ threshold?', accent: '#fff' },
  { id: '03', label: 'Draft', sub: 'AI proposes', detail: 'Classification, routing, risk score, summary draft', accent: '#FAFF00' },
  { id: '04', label: 'Human confirm', sub: 'Gate', detail: 'Human approves / edits / rejects. No silent overwrite', accent: '#fff' },
  { id: '05', label: 'Record & learn', sub: 'Audit trail', detail: 'Outcome written back → skill gets sharper', accent: '#FAFF00' },
]

const anatomy = [
  { k: 'WHEN', title: 'When to use', desc: 'Specific trigger + when NOT to use', icon: '◐' },
  { k: 'WHAT', title: 'What good looks like', desc: 'Correct output, format & limits', icon: '⬢' },
  { k: 'HOW', title: 'Copyable pattern', desc: 'Before → After you can copy-paste', icon: '⟐' },
  { k: 'WHY', title: 'Evidence', desc: 'Quick ref, common mistakes, example', icon: '⬣' },
]

const managementsMap = [
  { name: 'Incident', skills: 7, color: 'bg-red-500' },
  { name: 'Problem', skills: 7, color: 'bg-violet-500' },
  { name: 'Change', skills: 7, color: 'bg-amber-500' },
  { name: 'Request', skills: 7, color: 'bg-sky-500' },
  { name: 'Knowledge', skills: 7, color: 'bg-emerald-500' },
  { name: 'Service Map', skills: 7, color: 'bg-cyan-500' },
  { name: 'Asset', skills: 7, color: 'bg-orange-500' },
  { name: 'Improvement', skills: 7, color: 'bg-pink-500' },
]

export default function SkillsFlowDiagram() {
  const [active, setActive] = useState(2) // default on Draft
  const [example, setExample] = useState<'incident' | 'request' | 'change'>('incident')

  const examples = {
    incident: {
      signal: '“Checkout timeout 504”',
      skill: 'Auto-triage & priority',
      draft: 'P1 · Payments · conf 0.82',
      human: 'Lead confirms → war-room',
      learn: '3 similar P1s linked',
    },
    request: {
      signal: '“Need MacBook Budi 01-Sep”',
      skill: 'Intent classification',
      draft: 'Hardware · 0.91 → Workplace',
      human: 'Manager approve 1-click',
      learn: 'Catalog demand +1',
    },
    change: {
      signal: 'Deploy v2.4 checkout-api',
      skill: 'Risk scoring',
      draft: 'Risk MEDIUM · blast 12 orders',
      human: 'CAB review & approve',
      learn: 'Post-verify in 7 days',
    },
  }
  const ex = examples[example]

  return (
    <section className="max-w-[1100px] mx-auto w-full px-6 py-6">
      <div className="rounded-[16px] border border-[#222] overflow-hidden bg-[#0a0a0a] text-white relative">
        {/* top rail like Andon */}
        <div className="h-[28px] border-b border-white/10 bg-[#141414] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#FAFF00] shadow-[0_0_8px_rgba(250,255,0,0.6)] animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/60">How a skill works</span>
            <span className="hidden sm:inline font-mono text-[11px] text-white/30">·</span>
            <span className="hidden sm:inline font-mono text-[11px] text-white/40">Signal → Skill → Human → Learn</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-8 rounded-full bg-white/10" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* cord */}
        <div className="h-[6px] bg-[#1a1a1a] border-b border-white/5 flex items-center px-4 gap-[14px] overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="h-[6px] w-[18px] bg-[#FAFF00] skew-x-[-18deg] opacity-90 shrink-0" style={{ opacity: i % 3 === 0 ? 1 : 0.35 }} />
          ))}
        </div>

        {/* header */}
        <div className="px-5 sm:px-7 pt-6 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#FAFF00]">Terraline · ITSM Skills System</p>
              <h2 className="font-display font-semibold text-[22px] sm:text-[28px] tracking-[-0.02em] leading-[1] mt-2">
                A skill is a <span className="text-white/60 font-medium">reusable way</span><br />to do one thing right.
              </h2>
              <p className="text-[13px] leading-[1.6] text-white/60 max-w-[560px] mt-3">
                Not a generic chatbot. Each skill bundles <span className="text-white">when to use it</span>, <span className="text-white">what good looks like</span>, and a <span className="text-white">copyable pattern</span> — then <span className="text-[#FAFF00]">proposes</span>, human <span className="text-white">confirms</span>.
              </p>
            </div>
            <div className="flex items-center gap-2 p-1 rounded-full bg-white/[0.06] border border-white/10">
              {(['incident', 'request', 'change'] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setExample(k)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[11px] capitalize transition ${example === k ? 'bg-[#FAFF00] text-black' : 'text-white/60 hover:text-white'}`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="px-3 sm:px-6 pb-3 grid lg:grid-cols-[260px_1fr_220px] gap-3">
          {/* Anatomy */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-wide uppercase text-white/50">Skill anatomy</span>
              <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-white text-black">4 pillars</span>
            </div>
            <div className="p-2 grid gap-2">
              {anatomy.map((a) => (
                <div key={a.k} className="rounded-lg border border-white/10 bg-black/40 p-3 flex gap-3">
                  <span className="h-7 w-7 rounded-full bg-[#FAFF00] text-black grid place-items-center text-[12px] font-bold shrink-0">{a.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-wide uppercase text-[#FAFF00]">{a.k}</span>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <div className="font-medium text-[13px] leading-tight mt-1">{a.title}</div>
                    <div className="text-[11px] leading-[1.5] text-white/50 mt-1">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto px-3 py-2.5 border-t border-white/10 bg-[#FAFF00] text-black flex items-center justify-between">
              <span className="font-mono text-[11px] font-medium">Copy → use → audit</span>
              <span className="text-[14px]">↗</span>
            </div>
          </div>

          {/* Center flow */}
          <div className="rounded-xl border border-white/10 bg-white overflow-hidden flex flex-col text-black">
            <div className="px-4 py-3 border-b border-[#eaeaea] bg-[#fafafa] flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-wide uppercase text-[#666]">Workflow · 5 steps</span>
              <span className="font-mono text-[11px] text-[#999]">click a step</span>
            </div>

            {/* rail */}
            <div className="px-4 py-4">
              {/* desktop horizontal */}
              <div className="hidden sm:block">
                <div className="relative flex items-start justify-between gap-1">
                  {/* line */}
                  <div className="absolute top-[18px] left-[18px] right-[18px] h-[2px] bg-[#111]" />
                  <motion.div
                    className="absolute top-[18px] h-[2px] bg-[#FAFF00]"
                    initial={false}
                    animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.4 }}
                    style={{ left: 18 }}
                  />
                  {steps.map((s, i) => {
                    const isActive = i === active
                    const isPast = i < active
                    return (
                      <button key={s.id} onClick={() => setActive(i)} className="relative flex flex-col items-center gap-2 w-[88px] shrink-0 group">
                        <span
                          className={`h-9 w-9 rounded-full grid place-items-center font-mono text-[11px] font-bold border-2 z-10 transition ${isActive ? 'bg-[#FAFF00] border-black text-black scale-110' : isPast ? 'bg-black border-black text-white' : 'bg-white border-[#111] text-black group-hover:border-black'}`}
                        >
                          {s.id}
                        </span>
                        <span className={`font-mono text-[11px] font-semibold tracking-tight text-center leading-[1.1] ${isActive ? 'text-black' : 'text-[#666]'}`}>{s.label}</span>
                        <span className="font-mono text-[10px] tracking-wide uppercase text-[#999]">{s.sub}</span>
                      </button>
                    )
                  })}
                </div>

                {/* detail card */}
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 rounded-xl border border-[#111] overflow-hidden"
                >
                  <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wide uppercase text-white/60">
                      {steps[active].id} · {steps[active].label}
                    </span>
                    <span className="font-mono text-[11px] bg-[#FAFF00] text-black px-2 py-1 rounded-full">{steps[active].sub}</span>
                  </div>
                  <div className="px-4 py-3 bg-white">
                    <p className="text-[13px] leading-[1.6] text-[#111]">{steps[active].detail}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px]">
                      <span className="px-2.5 py-1 rounded-full bg-[#fafafa] border border-[#eaeaea]">signal: {ex.signal}</span>
                      <span className="px-2.5 py-1 rounded-full bg-black text-white">→ {ex.skill}</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#FAFF00] border border-black text-black">{ex.draft}</span>
                    </div>
                  </div>
                </motion.div>

                {/* mini flow example */}
                <div className="mt-3 grid grid-cols-5 gap-1.5 font-mono text-[11px]">
                  {[
                    { l: 'Signal', v: ex.signal },
                    { l: 'Detect', v: ex.skill.slice(0, 14) },
                    { l: 'Draft', v: ex.draft },
                    { l: 'Confirm', v: ex.human },
                    { l: 'Learn', v: ex.learn },
                  ].map((x) => (
                    <div key={x.l} className="rounded-lg border border-[#eaeaea] bg-[#fafafa] p-2 text-center">
                      <div className="text-[10px] tracking-wide uppercase text-[#999]">{x.l}</div>
                      <div className="text-[11px] leading-tight text-black mt-1 truncate">{x.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* mobile vertical */}
              <div className="sm:hidden relative pl-6">
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-[#111]" />
                <motion.div
                  className="absolute left-[11px] w-[2px] bg-[#FAFF00]"
                  style={{ top: 8 }}
                  animate={{ height: `${(active / (steps.length - 1)) * 88}%` }}
                  transition={{ duration: 0.3 }}
                />
                <div className="grid gap-2">
                  {steps.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActive(i)}
                      className={`text-left rounded-xl border p-3 flex gap-3 items-center ${i === active ? 'bg-black text-white border-black' : 'bg-white border-[#eaeaea]'}`}
                    >
                      <span className={`h-8 w-8 rounded-full grid place-items-center font-mono text-[11px] font-bold shrink-0 ${i === active ? 'bg-[#FAFF00] text-black' : 'bg-black text-white'}`}>{s.id}</span>
                      <span className="flex-1 min-w-0">
                        <span className={`block font-medium text-[13px] leading-none ${i === active ? 'text-white' : 'text-black'}`}>{s.label}</span>
                        <span className={`block text-[11px] mt-1 ${i === active ? 'text-white/60' : 'text-[#666]'}`}>{s.detail}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-[#FAFF00] border border-black p-3 font-mono text-[11px] leading-[1.5] text-black">
                  example {example}: <b>{ex.signal}</b> → {ex.skill} → {ex.draft} → human {ex.human.toLowerCase()}
                </div>
              </div>
            </div>

            <div className="mt-auto px-4 py-2.5 border-t border-[#eaeaea] bg-[#fafafa] flex items-center gap-2 font-mono text-[11px] text-[#999]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              AI propose · human confirm · no silent overwrite
              <span className="ml-auto hidden sm:inline text-black">audit trail ✓</span>
            </div>
          </div>

          {/* Map 8 practices */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-white/10">
              <span className="font-mono text-[11px] tracking-wide uppercase text-white/50">Where skills live</span>
              <p className="font-medium text-[13px] leading-tight mt-1 text-white">8 managements · 56 skills</p>
              <p className="font-mono text-[11px] text-white/40 mt-1">One skill per stage, one stage per craft</p>
            </div>
            <div className="p-2 grid grid-cols-2 gap-2">
              {managementsMap.map((m) => (
                <div key={m.name} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${m.color}`} />
                    <span className="font-medium text-[12px] leading-none text-white">{m.name}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <span key={i} className="h-1 flex-1 rounded-full bg-white/15" style={{ opacity: 0.3 + i * 0.1 }} />
                    ))}
                  </div>
                  <div className="font-mono text-[10px] text-white/40 mt-1.5">{m.skills} stages</div>
                </div>
              ))}
            </div>
            <div className="mt-auto p-3 border-t border-white/10 bg-white text-black">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#666]">Lifecycle</span>
                <span className="text-black font-medium">→ 6 practices</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] mt-1">
                <span className="text-[#666]">Foundation</span>
                <span className="text-black font-medium">→ 2 practices</span>
              </div>
              <div className="mt-2 h-px bg-[#eaeaea]" />
              <p className="font-mono text-[11px] leading-[1.5] text-[#666] mt-2">Each management owns its lane. Click a practice below to explore its 7 skills.</p>
            </div>
          </div>
        </div>

        {/* Before / After strip */}
        <div className="mx-3 sm:mx-6 mb-6 rounded-xl overflow-hidden border border-white/10 grid sm:grid-cols-2">
          <div className="bg-white text-black p-4 sm:p-5">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase text-[#999]">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Before — without skills
            </div>
            <ul className="mt-3 space-y-2 text-[13px] leading-[1.5] text-[#444]">
              <li className="flex gap-2"><span className="text-red-500 mt-[1px]">✕</span> Guess priority, wrong routing, 3× bounces</li>
              <li className="flex gap-2"><span className="text-red-500 mt-[1px]">✕</span> War-room scroll 200 comments, repeated handovers</li>
              <li className="flex gap-2"><span className="text-red-500 mt-[1px]">✕</span> Close as “fixed” — no trace, never becomes a problem</li>
            </ul>
            <div className="mt-3 font-mono text-[11px] bg-[#fafafa] border border-[#eaeaea] rounded-lg px-3 py-2 text-[#666]">MTTR = guesswork · queue floods · lessons lost</div>
          </div>
          <div className="bg-[#FAFF00] text-black p-4 sm:p-5 border-t sm:border-t-0 sm:border-l border-black/10">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase text-black/60">
              <span className="h-2 w-2 rounded-full bg-black animate-pulse" /> After — with skills
            </div>
            <ul className="mt-3 space-y-2 text-[13px] leading-[1.5] text-black">
              <li className="flex gap-2"><span className="mt-[1px]">✓</span> Auto-triage 0.82 → P1 Payments, suggests not assigns</li>
              <li className="flex gap-2"><span className="mt-[1px]">✓</span> 3-bullet summary, timeline stays source of truth</li>
              <li className="flex gap-2"><span className="mt-[1px]">✓</span> Closure pack → problem / knowledge, audit-ready</li>
            </ul>
            <div className="mt-3 font-mono text-[11px] bg-black text-white rounded-lg px-3 py-2">Lower MTTR · consistent · auditable · lessons stick</div>
          </div>
        </div>

        <div className="px-6 pb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-white/30">
          <span>56 skills total</span>
          <span className="h-3 w-px bg-white/10" />
          <span className="text-white/50">Hover steps above · switch example incident / request / change</span>
          <span className="ml-auto hidden sm:inline text-white/20">Terraline · AI proposes, humans confirm</span>
        </div>
      </div>
    </section>
  )
}
