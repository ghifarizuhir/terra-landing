import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { managements } from '../data/managements'
import HazardTape, { DottedDivider } from './HazardTape'

type Props = {
  q?: string
  filter?: 'all' | 'lifecycle' | 'foundation'
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
function skillToMarkdown(m: (typeof managements)[number], skill: (typeof managements)[number]['skills'][number]) {
  const lines: string[] = []
  lines.push(`# ${skill.name}`)
  if (skill.stage) lines.push(`> ${skill.stage} · ${m.title} (${m.prefix})`)
  if (skill.description) lines.push('', skill.description)
  lines.push('', `## Overview`, '', skill.overview)
  lines.push('', `## When to use`)
  if (Array.isArray(skill.whenToUse)) skill.whenToUse.forEach((w) => lines.push(`- ${w}`))
  else lines.push(skill.whenToUse)
  if (skill.corePattern) {
    lines.push('', `## Core Pattern`, '', '```js', skill.corePattern.before.trim(), '```', '', '```js', skill.corePattern.after.trim(), '```')
  }
  if (skill.quickReference) {
    lines.push('', `## Quick Reference`, '', `| ${skill.quickReference.headers.join(' | ')} |`, `| ${skill.quickReference.headers.map(() => '---').join(' | ')} |`)
    skill.quickReference.rows.forEach((r) => lines.push(`| ${r.join(' | ')} |`))
  }
  lines.push('', `## Implementation`, '', skill.how)
  if (skill.commonMistakes?.length) {
    lines.push('', `## Common Mistakes`)
    skill.commonMistakes.forEach((c) => lines.push(`- ${c}`))
  }
  if (skill.example) lines.push('', `## Example`, '', `> ${skill.example}`)
  lines.push('', `---`, `*Terraline AI for ITSM · ${m.title}*`)
  return lines.join('\n')
}

export default function JourneyLoop({ q = '', filter = 'all' }: Props) {
  const [open, setOpen] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const active = open ? managements.find((m) => m.id === open) ?? null : null
  const shouldReduceMotion = useReducedMotion()
  const tipById: Record<string, string> = {
    incident: 'Restore first, then learn triage → war-room → close hands off to Problem & Knowledge.',
    request: 'Requests ≠ incidents validate completeness once, route by policy, confirm delivery explicitly.',
    problem: 'From repeats to root cause cluster → RCA draft → known error until fix is verified.',
    change: 'Plan → risk score → approve → verify every change leaves an audit trail.',
    knowledge: 'Capture from resolutions, structure for findability, retire stale search quality is the test.',
    improvement: 'Trends → suggestions → backlog → impact review improvement is a loop, not a ticket.',
    asset: 'Receive → classify → operate → audit → retire if it’s not in the register, it doesn’t exist.',
    'service-map': 'Register CIs, map dependencies, predict blast radius the map is the foundation for impact.',
  }

  const copy = async (text: string, key: string) => {
    try { await navigator.clipboard.writeText(text) } catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove() }
    setCopied(key); setTimeout(() => setCopied(null), 1400)
  }

  const sortedSkills = useMemo(
    () => (active ? [...active.skills].sort((a, b) => (a.stage ?? '').localeCompare(b.stage ?? '')) : []),
    [active]
  )
  const allStaged = !!active && active.skills.length > 0 && active.skills.every((s) => !!s.stage)
  const selectedSkill = selected
    ? sortedSkills.find((s) => s.name === selected) ?? sortedSkills[0]
    : sortedSkills[0]

  useEffect(() => {
    if (!active) return
    if (selected && sortedSkills.some((s) => s.name === selected)) return
    setSelected(sortedSkills[0]?.name ?? null)
  }, [active?.id])

  // keep active rail pill visible on mobile horizontal scroll
  useEffect(() => {
    if (!selected) return
    try {
      const esc = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(selected) : selected.replace(/"/g, '\\"')
      const el = document.querySelector(`[data-rail='${esc}']`)
      if (el && 'scrollIntoView' in el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    } catch {}
  }, [selected])

  // deep link: read #<id> or #<id>/<slug>
  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash.slice(1)
      if (!raw) return
      const [id, slug] = raw.split('/')
      const m = managements.find((x) => x.id === id)
      if (!m) return
      setOpen(m.id)
      if (slug) {
        const sk = m.skills.find((s) => slugify(s.name) === slug)
        if (sk) setSelected(sk.name)
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  // deep link: write hash when open/selected changes
  useEffect(() => {
    if (!open) {
      if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search)
      return
    }
    const slug = selected ? `/${slugify(selected)}` : ''
    const next = `#${open}${slug}`
    if (window.location.hash !== next) history.replaceState(null, '', next)
  }, [open, selected])

  // filter + search like skills.sh
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return managements.filter((m) => {
      if (filter === 'lifecycle' && m.lane !== 'cycle' && m.lane !== 'parallel') return false
      if (filter === 'foundation' && m.lane !== 'foundation') return false
      if (!needle) return true
      const hay = `${m.title} ${m.prefix} ${m.oneLiner} ${m.skills.map((s) => s.name).join(' ')}`.toLowerCase()
      return hay.includes(needle)
    })
  }, [q, filter])

  return (
    <>
      {/* Leaderboard skills.sh style — B: dotted dividers + yellow hover */}
      <div className="rounded-lg border border-[#eaeaea] overflow-hidden bg-white">
        {/* table header like skills.sh with dotted bottom */}
        <div className="hidden sm:grid grid-cols-[44px_1fr_140px_90px] gap-0 border-b border-dashed border-[#1a1d23]/12 bg-[#fafafa] px-4 py-2 font-mono text-[11px] tracking-wide uppercase text-[#999]">
          <span>#</span>
          <span>Practice</span>
          <span className="text-right">AI skills</span>
          <span className="text-right">Type</span>
        </div>

        <div className="divide-y divide-dashed divide-[#1a1d23]/10">
          {filtered.map((m, idx) => {
            const isOpen = m.id === open
            if (isOpen) {
              return <div key={m.id} aria-hidden className="h-0" />
            }
            const rank = String(managements.indexOf(m) + 1).padStart(2, '0')
            return (
              <button
                key={m.id}
                onClick={() => setOpen(m.id)}
                className="group w-full text-left grid grid-cols-1 sm:grid-cols-[44px_1fr_140px_90px] gap-1 sm:gap-0 items-center px-4 py-4 hover:bg-[#FAFF00]/[0.06] hover:border-l-[3px] hover:border-l-[#FAFF00] hover:pl-[13px] transition-all focus:outline-none focus-visible:bg-[#FAFF00]/[0.06] border-l-[3px] border-l-transparent"
              >
                {/* rank + prefix — B: yellow dot on hover */}
                <span className="hidden sm:block font-mono text-[13px] tabular-nums flex items-center gap-1.5">
                  <span className="text-[#999] group-hover:text-black">#{rank}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FAFF00] border border-black/10 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] tracking-wide uppercase border border-[#eaeaea] bg-white px-1.5 py-0.5 text-[#666]">{m.prefix}</span>
                    <span className="sm:hidden font-mono text-[11px] text-[#999]">#{rank}</span>
                    <span className="hidden sm:inline h-3 w-px bg-[#eaeaea]" />
                    <span className="font-mono text-[11px] tracking-wide uppercase text-[#999] hidden sm:inline">{m.lane === 'foundation' ? 'Foundation' : 'Lifecycle'}</span>
                  </div>
                  <h3 className="font-medium text-[15px] tracking-[-0.01em] leading-tight mt-1">{m.title}</h3>
                  <p className="text-[13px] leading-[1.4] text-[#666] mt-0.5 line-clamp-2 sm:line-clamp-1">{m.oneLiner}</p>
                  {/* mobile skills */}
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:hidden">
                    {m.skills.slice(0, 2).map((s) => (
                      <span key={s.name} className="font-mono text-[11px] bg-black text-white px-2 py-1 rounded-full">{s.name}</span>
                    ))}
                    {m.skills.length > 2 && <span className="font-mono text-[11px] border border-[#eaeaea] bg-white px-2 py-1 rounded-full">+{m.skills.length - 2}</span>}
                  </div>
                </div>

                {/* skills desktop — B: hover yellow tint */}
                <div className="hidden sm:flex flex-wrap justify-end gap-1.5">
                  {m.skills.slice(0, 2).map((s) => (
                    <span key={s.name} className="font-mono text-[11px] bg-black group-hover:bg-[#1a1a1a] text-white px-2 py-1 rounded-full max-w-[120px] truncate border border-transparent group-hover:border-[#FAFF00]/30 transition-colors">{s.name}</span>
                  ))}
                  {m.skills.length > 2 && <span className="font-mono text-[11px] border border-[#eaeaea] group-hover:border-[#FAFF00]/30 bg-white px-2 py-1 rounded-full text-[#666]">+{m.skills.length - 2}</span>}
                </div>

                <div className="hidden sm:flex items-center justify-end gap-2">
                  <span className="font-mono text-[11px] text-[#999] border border-[#eaeaea] group-hover:border-black/15 rounded-full px-2 py-1 bg-white group-hover:bg-[#FAFF00] group-hover:text-black transition-colors">{m.skills.length} stages</span>
                  <span className="text-[#999] group-hover:text-black transition-colors">›</span>
                </div>
                <span className="sm:hidden font-mono text-[11px] text-[#999] mt-1">{m.skills.length} AI skills · {m.lane === 'foundation' ? 'Foundation' : 'Lifecycle'} →</span>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center font-mono text-[13px] text-[#999]">No matches for “{q}”</div>
          )}
        </div>
      </div>

      <DottedDivider className="pt-3">
        8 practices · {managements.reduce((n, m) => n + m.skills.length, 0)} AI skills · Assets &amp; configuration as the foundation
      </DottedDivider>

      {/* Detail Rail + Reader clean */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden"
          >
            <div className="shrink-0 bg-white">
              <HazardTape variant="thin" />
              <div className="border-b border-[#eaeaea] max-w-[1100px] mx-auto px-4 sm:px-6 min-h-[49px] py-2 flex items-center gap-3">
                <button onClick={() => setOpen(null)} className="h-9 px-4 border border-black bg-black text-white font-mono text-[12px] flex items-center gap-2 rounded-full hover:bg-[#111] shrink-0">
                  ← All practices
                </button>
                <span className="h-6 w-px bg-[#eaeaea] hidden sm:block" />
                <span className="font-mono text-[11px] tracking-wide uppercase bg-black text-white px-2 py-1 rounded-full hidden sm:inline">{active.prefix}</span>
                <span className="text-[13px] font-medium tracking-tight hidden sm:inline">{active.title}</span>
              <span className="ml-auto font-mono text-[11px] text-[#999] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FAFF00] border border-black/10" aria-hidden />
                {active.skills.length} stages
              </span>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="max-w-[1100px] mx-auto w-full px-6 py-6">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase text-[#999]">
                  <span className="h-px w-6 bg-black" />
                  {active.lane === 'foundation' ? 'Foundation' : 'Lifecycle'} · {active.skills.length} stages
                </div>
                <h2 className="font-display font-semibold text-[28px] lg:text-[34px] leading-[1.05] tracking-[-0.02em] mt-2">{active.title}</h2>
                <p className="text-[14px] leading-[1.6] mt-2 text-[#666] max-w-[720px]">{active.oneLiner}</p>

                <div className="mt-5 grid sm:grid-cols-3 gap-3">
                  {active.bullets.map((b, i) => (
                    <div key={b} className="rounded-lg border border-dashed border-[#1a1d23]/12 bg-[#fafafa] p-3 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FAFF00]/0 group-hover:bg-[#FAFF00]" aria-hidden />
                      <div className="font-mono text-[11px] tracking-wide uppercase text-[#999] flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-[#1a1d23]/20" aria-hidden />
                        0{i + 1} What it does
                      </div>
                      <p className="text-[13px] leading-[1.5] mt-1">{b}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="font-semibold text-[16px] tracking-tight">AI skills for this practice</h3>
                  <span className="font-mono text-[11px] bg-black text-white px-2 py-1 rounded-full shrink-0">{active.skills.length} skills</span>
                  {allStaged && (
                    <span className="font-mono text-[11px] border border-[#eaeaea] bg-white px-2 py-1 rounded-full text-[#666] shrink-0">
                      {active.skills.length}/{active.skills.length} stages
                    </span>
                  )}
                  <span className="h-px flex-1 bg-[#eaeaea] hidden sm:block min-w-[40px]" />
                </div>
                {allStaged && (
                  <p className="font-mono text-[11px] text-[#999] mt-2">
                    {active.lane === 'foundation' ? 'Always-on foundation one skill per stage' : 'Full lifecycle coverage one skill per stage'}
                  </p>
                )}

                {/* Rail + Reader mobile: sticky horizontal pills, desktop: vertical rail */}
                <div className="mt-4 grid lg:grid-cols-[240px_1fr] gap-0 rounded-xl border border-[#eaeaea] overflow-hidden bg-white shadow-sm">
                  {/* Rail sticky on both */}
                  <nav className="sticky top-0 z-10 lg:static border-b lg:border-b-0 lg:border-r border-[#eaeaea] bg-white flex flex-col max-lg:overflow-hidden" aria-label="Stage rail">
                    <div className="px-3 py-3 border-b border-dashed border-[#1a1d23]/10 bg-[#FAFF00]/[0.06]">
                      <p className="font-mono text-[11px] tracking-wide uppercase text-[#999] flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FAFF00] border border-black/10" aria-hidden />
                        Stages
                      </p>
                      <p className="font-mono text-[11px] text-[#111] mt-0.5">{sortedSkills.findIndex((s) => s.name === selectedSkill?.name) + 1} / {active.skills.length} · {active.skills.length} stages</p>
                    </div>
                    <div className="p-2 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-thin">
                      {sortedSkills.map((s) => {
                        const isActive = s.name === selectedSkill?.name
                        const idx = sortedSkills.indexOf(s) + 1
                        return (
                          <button
                            key={s.name}
                            data-rail={s.name}
                            onClick={() => setSelected(s.name)}
                            aria-selected={isActive}
                            className={`text-left snap-start rounded-xl border p-3 shrink-0 lg:shrink min-w-[176px] lg:min-w-0 flex lg:block items-center lg:items-start gap-3 transition-all ${isActive ? 'bg-black text-white border-black shadow-sm ring-1 ring-[#FAFF00]/40' : 'bg-white border-[#eaeaea] hover:border-[#FAFF00]/40 hover:bg-[#FAFF00]/[0.06] active:bg-[#f5f5f5]'}`}
                          >
                            <span className={`hidden lg:block font-mono text-[10px] tracking-wide uppercase ${isActive ? 'text-white/60' : 'text-[#999]'}`}>{s.stage}</span>
                            <span className={`lg:hidden font-mono text-[10px] leading-none px-1.5 py-1 rounded-full border ${isActive ? 'bg-white/15 border-white/20 text-white' : 'bg-[#fafafa] border-[#eaeaea] text-[#999]'}`}>{String(idx).padStart(2, '0')}</span>
                            <span className={`text-[13px] leading-[1.35] font-medium line-clamp-2 ${isActive ? 'text-white' : 'text-[#111]'}`}>{s.name}</span>
                            {isActive && <span className="ml-auto lg:hidden h-2 w-2 rounded-full bg-white shrink-0" aria-hidden />}
                          </button>
                        )
                      })}
                    </div>
                    <div className="hidden lg:block mt-auto border-t border-[#eaeaea] p-3 bg-[#fafafa]">
                      <p className="font-mono text-[11px] tracking-wide uppercase text-[#999]">In practice</p>
                      <p className="text-[12px] leading-[1.5] text-[#666] mt-1">{active ? tipById[active.id] ?? tipById.incident : ''}</p>
                    </div>
                  </nav>

                  {/* Reader roomy, high readability */}
                  <div className="min-h-[420px] bg-white flex justify-center">
                    <AnimatePresence mode="wait">
                      {selectedSkill && (
                        <motion.div
                          key={selectedSkill.name}
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                          className="bg-white max-w-[720px] w-full"
                        >
                          {/* skill header larger, clearer */}
                          <div className="px-4 sm:px-6 py-5 border-b border-[#eaeaea] bg-[#fafafa]/60">
                            <div className="flex items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase bg-black text-white px-2.5 py-1 rounded-full">{selectedSkill.stage?.split('·')[0]?.trim() ?? 'STAGE'}</span>
                                  <span className="font-mono text-[11px] text-[#999]">{selectedSkill.stage}</span>
                                </div>
                                <h3 className="font-semibold text-[20px] sm:text-[22px] leading-[1.25] tracking-[-0.02em] mt-2">{selectedSkill.name}</h3>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button onClick={() => copy(skillToMarkdown(active!, selectedSkill), `md-${selectedSkill.name}`)} className="h-8 px-3 rounded-full border border-[#eaeaea] bg-white font-mono text-[11px] hover:border-black hover:bg-white transition">
                                  {copied === `md-${selectedSkill.name}` ? 'Copied!' : 'Copy MD'}
                                </button>
                                <button onClick={() => copy(window.location.href, `link-${selectedSkill.name}`)} className="h-8 px-3 rounded-full border border-[#eaeaea] bg-white font-mono text-[11px] hover:border-black transition hidden sm:inline-flex items-center">
                                  {copied === `link-${selectedSkill.name}` ? 'Link copied' : 'Copy link'}
                                </button>
                              </div>
                            </div>
                            {selectedSkill.description && (
                              <p className="text-[13px] sm:text-[14px] leading-[1.6] mt-3 text-[#444] bg-white border border-[#eaeaea] rounded-xl p-3.5">{selectedSkill.description}</p>
                            )}
                          </div>
                          <div className="px-4 sm:px-6 py-6 space-y-7">
                            <section>
                              <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#999] flex items-center gap-2"><span className="h-px w-4 bg-[#eaeaea]" /> Overview</h4>
                              <p className="text-[14px] sm:text-[15px] leading-[1.7] mt-3 text-[#111]">{selectedSkill.overview}</p>
                            </section>
                            <section>
                              <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#999] flex items-center gap-2"><span className="h-px w-4 bg-[#eaeaea]" /> When to use</h4>
                              {Array.isArray(selectedSkill.whenToUse) ? (
                                <ul className="mt-3 space-y-2">
                                  {selectedSkill.whenToUse.map((w) => (
                                    <li key={w} className="flex gap-3 text-[13px] sm:text-[14px] leading-[1.6] text-[#333]"><span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black shrink-0" /><span>{w}</span></li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-[14px] leading-[1.7] text-[#333] mt-3">{selectedSkill.whenToUse}</p>
                              )}
                            </section>
                            {selectedSkill.corePattern && (
                              <section>
                                <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#999] flex items-center gap-2"><span className="h-px w-4 bg-[#eaeaea]" /> Core Pattern</h4>
                                <div className="mt-3 grid gap-3">
                                  <div className="rounded-xl overflow-hidden border border-[#222] bg-[#0a0a0a]">
                                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/[0.03]">
                                      <span className="font-mono text-[10px] tracking-wide uppercase text-white/60">Before</span>
                                      <button onClick={() => copy(selectedSkill.corePattern!.before, `before-${selectedSkill.name}`)} className="font-mono text-[10px] px-2 py-1 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 bg-white/5">{copied === `before-${selectedSkill.name}` ? 'Copied' : 'Copy'}</button>
                                    </div>
                                    <pre className="text-[#fafafa] p-3 sm:p-4 text-[12px] sm:text-[12.5px] leading-[1.55] overflow-x-auto whitespace-pre">{selectedSkill.corePattern.before}</pre>
                                  </div>
                                  <div className="rounded-xl overflow-hidden border border-[#eaeaea] bg-white">
                                    <div className="flex items-center justify-between px-3 py-2 border-b border-[#eaeaea] bg-[#fafafa]">
                                      <span className="font-mono text-[10px] tracking-wide uppercase text-[#999]">After</span>
                                      <button onClick={() => copy(selectedSkill.corePattern!.after, `after-${selectedSkill.name}`)} className="font-mono text-[10px] px-2 py-1 rounded-full border border-[#eaeaea] bg-white text-[#666] hover:border-black hover:text-black">{copied === `after-${selectedSkill.name}` ? 'Copied' : 'Copy'}</button>
                                    </div>
                                    <pre className="p-3 sm:p-4 text-[12px] sm:text-[12.5px] leading-[1.55] overflow-x-auto whitespace-pre text-[#111]">{selectedSkill.corePattern.after}</pre>
                                  </div>
                                </div>
                              </section>
                            )}
                            {selectedSkill.quickReference && (
                              <section>
                                <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#999] flex items-center gap-2"><span className="h-px w-4 bg-[#eaeaea]" /> Quick Reference</h4>
                                {/* desktop table */}
                                <div className="mt-3 hidden sm:block rounded-xl border border-[#eaeaea] overflow-hidden overflow-x-auto">
                                  <table className="w-full text-[13px]">
                                    <thead>
                                      <tr className="bg-black text-white">
                                        {selectedSkill.quickReference.headers.map((h) => (
                                          <th key={h} className="text-left px-3.5 py-2.5 font-mono text-[11px] tracking-wide uppercase font-medium whitespace-nowrap">{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#eaeaea]">
                                      {selectedSkill.quickReference.rows.map((row, i) => (
                                        <tr key={i} className="bg-white even:bg-[#fafafa]">
                                          {row.map((cell) => (
                                            <td key={cell} className="px-3.5 py-2.5 text-[#222] leading-[1.5]">{cell}</td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                {/* mobile cards */}
                                <div className="mt-3 grid gap-2 sm:hidden">
                                  {selectedSkill.quickReference.rows.map((row, i) => (
                                    <div key={i} className="rounded-xl border border-[#eaeaea] bg-[#fafafa] p-3">
                                      <div className="grid gap-1.5">
                                        {row.map((cell, j) => (
                                          <div key={cell} className="flex gap-2 text-[13px] leading-[1.5]"><span className="font-mono text-[10px] tracking-wide uppercase text-[#999] min-w-[70px] pt-[2px]">{selectedSkill.quickReference!.headers[j]}</span><span className="text-[#111] flex-1">{cell}</span></div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </section>
                            )}
                            <section>
                              <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#999] flex items-center gap-2"><span className="h-px w-4 bg-[#eaeaea]" /> Implementation</h4>
                              <p className="text-[13px] sm:text-[14px] leading-[1.65] text-[#222] font-mono mt-3 bg-[#fafafa] border border-[#eaeaea] rounded-xl p-4">{selectedSkill.how}</p>
                            </section>
                            {selectedSkill.commonMistakes && (
                              <section>
                                <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#999] flex items-center gap-2"><span className="h-px w-4 bg-[#eaeaea]" /> Common Mistakes</h4>
                                <ul className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-2.5">
                                  {selectedSkill.commonMistakes.map((mm) => (
                                    <li key={mm} className="flex gap-3 text-[13px] sm:text-[14px] leading-[1.6] text-[#7c4d00]"><span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" /><span>{mm}</span></li>
                                  ))}
                                </ul>
                              </section>
                            )}
                            {selectedSkill.example && (
                              <div className="rounded-xl bg-black text-white p-4 sm:p-5">
                                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/50">Example</div>
                                <p className="font-mono text-[13px] sm:text-[14px] leading-[1.6] mt-2 text-white">{selectedSkill.example}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-2 pt-4 border-t border-[#eaeaea]">
                              {(() => {
                                const idx = sortedSkills.findIndex((s) => s.name === selectedSkill.name)
                                const prev = idx > 0 ? sortedSkills[idx - 1] : null
                                const next = idx < sortedSkills.length - 1 ? sortedSkills[idx + 1] : null
                                return (
                                  <>
                                    <button
                                      disabled={!prev}
                                      onClick={() => prev && setSelected(prev.name)}
                                      className={`h-9 px-4 rounded-full border font-mono text-[12px] ${prev ? 'bg-white border-[#eaeaea] hover:border-black hover:bg-[#fafafa] text-black' : 'bg-[#fafafa] border-[#eaeaea] text-[#999] cursor-not-allowed'}`}
                                    >
                                      ← {prev ? prev.name.slice(0, 18) : 'Prev'}
                                    </button>
                                    <span className="flex-1 text-center font-mono text-[11px] text-[#999]">{idx + 1} / {sortedSkills.length}</span>
                                    <button
                                      disabled={!next}
                                      onClick={() => next && setSelected(next.name)}
                                      className={`h-9 px-4 rounded-full border font-mono text-[12px] ${next ? 'bg-black border-black text-white hover:bg-[#111]' : 'bg-[#fafafa] border-[#eaeaea] text-[#999] cursor-not-allowed'}`}
                                    >
                                      {next ? next.name.slice(0, 18) : 'Next'} →
                                    </button>
                                  </>
                                )
                              })()}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
