import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { managements } from '../data/managements'

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

  // a11y: Esc to close + arrow to navigate skills, lock body scroll when dialog open
  useEffect(() => {
    if (!active) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && selectedSkill) {
        const idx = sortedSkills.findIndex((s) => s.name === selectedSkill.name)
        if (e.key === 'ArrowRight' && idx < sortedSkills.length - 1) setSelected(sortedSkills[idx + 1].name)
        if (e.key === 'ArrowLeft' && idx > 0) setSelected(sortedSkills[idx - 1].name)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [active, selectedSkill, sortedSkills])

  // filter + search like skills.sh — deep hay
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return managements.filter((m) => {
      if (filter === 'lifecycle' && m.lane !== 'cycle' && m.lane !== 'parallel') return false
      if (filter === 'foundation' && m.lane !== 'foundation') return false
      if (!needle) return true
      const hay = `${m.title} ${m.prefix} ${m.oneLiner} ${m.bullets.join(' ')} ${m.skills.map((s) => `${s.name} ${s.overview} ${Array.isArray(s.whenToUse) ? s.whenToUse.join(' ') : s.whenToUse} ${s.description ?? ''}`).join(' ')}`.toLowerCase()
      return hay.includes(needle)
    })
  }, [q, filter])

  return (
    <>
      <div className="overflow-hidden rounded-[18px] border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="hidden grid-cols-[44px_1fr_140px_90px] gap-0 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400 sm:grid">
          <span>#</span>
          <span>Practice</span>
          <span className="text-right">AI skills</span>
          <span className="text-right">Type</span>
        </div>

        <div className="divide-y divide-neutral-100">
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
                className="group w-full border-l-2 border-l-transparent px-4 py-4 text-left transition-all hover:border-l-neutral-900 hover:bg-neutral-50 focus:outline-none focus-visible:bg-neutral-50 sm:grid sm:grid-cols-[44px_1fr_140px_90px] sm:items-center"
              >
                {/* Rank marker */}
                <span className="hidden items-center gap-1.5 font-mono text-[12px] tabular-nums sm:flex">
                  <span className="text-neutral-400 group-hover:text-black">#{rank}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-neutral-500">{m.prefix}</span>
                    <span className="font-mono text-[10px] text-neutral-400 sm:hidden">#{rank}</span>
                    <span className="hidden h-3 w-px bg-neutral-200 sm:inline" />
                    <span className="hidden font-mono text-[10px] uppercase tracking-wide text-neutral-400 sm:inline">{m.lane === 'foundation' ? 'Foundation' : 'Lifecycle'}</span>
                  </div>
                  <h3 className="mt-1 font-display text-[16px] font-medium leading-tight tracking-[-0.015em] text-neutral-950">{m.title}</h3>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-[1.5] text-neutral-500 sm:line-clamp-1">{m.oneLiner}</p>
                  {/* mobile skills */}
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:hidden">
                    {m.skills.slice(0, 2).map((s) => (
                      <span key={s.name} className="rounded-md bg-neutral-950 px-2 py-1 font-mono text-[10px] text-white">{s.name}</span>
                    ))}
                    {m.skills.length > 2 && <span className="rounded-md border border-neutral-200 bg-white px-2 py-1 font-mono text-[10px] text-neutral-500">+{m.skills.length - 2}</span>}
                  </div>
                </div>

                {/* Desktop skill previews */}
                <div className="hidden sm:flex flex-wrap justify-end gap-1.5">
                  {m.skills.slice(0, 1).map((s) => (
                    <span key={s.name} className="max-w-[98px] truncate rounded-md border border-transparent bg-neutral-950 px-2 py-1 font-mono text-[10px] text-white transition-colors group-hover:border-neutral-700 group-hover:bg-neutral-800">{s.name}</span>
                  ))}
                  {m.skills.length > 1 && <span className="rounded-md border border-neutral-200 bg-white px-2 py-1 font-mono text-[10px] text-neutral-500">+{m.skills.length - 1}</span>}
                </div>

                <div className="hidden sm:flex items-center justify-end gap-2">
                  <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 font-mono text-[10px] text-neutral-500 transition-colors group-hover:border-neutral-400 group-hover:text-neutral-900">{m.skills.length} stages</span>
                  <span className="text-neutral-300 transition-colors group-hover:text-neutral-900">→</span>
                </div>
                <span className="mt-1 font-mono text-[10px] text-neutral-400 sm:hidden">{m.skills.length} AI skills · {m.lane === 'foundation' ? 'Foundation' : 'Lifecycle'} →</span>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center font-mono text-[12px] text-neutral-400">No matches for “{q}”</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-neutral-400">
        <span>8 practices · {managements.reduce((n, m) => n + m.skills.length, 0)} AI skills</span>
        <span className="text-neutral-500">Assets &amp; configuration as the foundation</span>
      </div>

      {/* Practice detail reader */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(null) }}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-neutral-950/45 backdrop-blur-sm"
          >
            <div className="shrink-0 border-b border-neutral-200 bg-white/95">
              <div className="mx-auto flex min-h-[68px] max-w-[1280px] items-center gap-3 px-4 py-2 sm:px-6">
                <button autoFocus aria-label="← All practices" onClick={() => setOpen(null)} className="button button-secondary h-9 shrink-0 rounded-lg px-3 text-xs">
                  ← <span className="hidden sm:inline">All practices</span><span className="sm:hidden">Back</span>
                </button>
                <span className="hidden h-6 w-px bg-neutral-200 sm:block" />
                <span className="hidden rounded-md bg-neutral-950 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white sm:inline">{active.prefix}</span>
                <span className="hidden text-[13px] font-medium tracking-tight text-neutral-800 sm:inline">{active.title}</span>
                <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[10px] text-neutral-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  {active.skills.length} stages
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-neutral-50">
              <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                  <span className="h-px w-6 bg-neutral-400" />
                  {active.lane === 'foundation' ? 'Foundation' : 'Lifecycle'} · {active.skills.length} stages
                </div>
                <h2 id="detail-title" className="mt-2 font-display text-[30px] font-medium leading-[1.08] tracking-[-0.03em] text-black lg:text-[38px]">{active.title}</h2>
                <p className="mt-2 max-w-[720px] text-[14px] leading-[1.65] text-neutral-600">{active.oneLiner}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {active.bullets.map((b, i) => (
                    <div key={b} className="relative overflow-hidden rounded-[14px] border border-neutral-200 bg-white p-4">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                        0{i + 1} What it does
                      </div>
                      <p className="mt-2 text-[13px] leading-[1.6] text-neutral-700">{b}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="font-display text-[18px] font-medium tracking-tight text-neutral-950">AI skills for this practice</h3>
                  <span className="shrink-0 rounded-md bg-neutral-950 px-2 py-1 font-mono text-[10px] text-white">{active.skills.length} skills</span>
                  {allStaged && (
                    <span className="shrink-0 rounded-md border border-neutral-200 bg-white px-2 py-1 font-mono text-[10px] text-neutral-500">
                      {active.skills.length}/{active.skills.length} stages
                    </span>
                  )}
                  <span className="hidden h-px min-w-[40px] flex-1 bg-neutral-200 sm:block" />
                </div>
                {allStaged && (
                  <p className="mt-2 font-mono text-[10px] text-neutral-400">
                    {active.lane === 'foundation' ? 'Always-on foundation one skill per stage' : 'Full lifecycle coverage one skill per stage'}
                  </p>
                )}

                {/* Rail + Reader mobile: sticky horizontal pills, desktop: vertical rail */}
                <div className="mt-4 grid overflow-hidden rounded-[18px] border border-neutral-200 bg-white shadow-[0_8px_30px_-20px_rgba(0,0,0,0.2)] lg:grid-cols-[240px_1fr]">
                  {/* Rail sticky on both */}
                  <nav className="sticky top-0 z-10 flex flex-col overflow-hidden border-b border-neutral-200 bg-white lg:static lg:border-b-0 lg:border-r" aria-label="Stage rail">
                    <div className="border-b border-neutral-200 bg-neutral-50 px-3 py-3">
                      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                        Stages
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-neutral-700">{sortedSkills.findIndex((s) => s.name === selectedSkill?.name) + 1} / {active.skills.length} · {active.skills.length} stages</p>
                    </div>
                    <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-2 lg:flex-col lg:overflow-visible">
                      {sortedSkills.map((s) => {
                        const isActive = s.name === selectedSkill?.name
                        const idx = sortedSkills.indexOf(s) + 1
                        return (
                          <button
                            key={s.name}
                            data-rail={s.name}
                            onClick={() => setSelected(s.name)}
                            aria-selected={isActive}
                            className={`flex min-w-[176px] shrink-0 snap-start items-center gap-3 rounded-xl border p-3 text-left transition-all lg:block lg:min-w-0 lg:shrink lg:items-start ${isActive ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm' : 'border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50'}`}
                          >
                            <span className={`hidden font-mono text-[9px] uppercase tracking-wide lg:block ${isActive ? 'text-white/50' : 'text-neutral-400'}`}>{s.stage}</span>
                            <span className={`rounded-md border px-1.5 py-1 font-mono text-[10px] leading-none lg:hidden ${isActive ? 'border-white/20 bg-white/10 text-white' : 'border-neutral-200 bg-neutral-50 text-neutral-400'}`}>{String(idx).padStart(2, '0')}</span>
                            <span className={`line-clamp-2 text-[12px] font-medium leading-[1.4] ${isActive ? 'text-white' : 'text-neutral-800'}`}>{s.name}</span>
                            {isActive && <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 lg:hidden" aria-hidden />}
                          </button>
                        )
                      })}
                    </div>
                    <div className="mt-auto hidden border-t border-neutral-200 bg-neutral-50 p-3 lg:block">
                      <p className="font-mono text-[10px] uppercase tracking-wide text-neutral-400">In practice</p>
                      <p className="mt-1 text-[12px] leading-[1.55] text-neutral-600">{active ? tipById[active.id] ?? tipById.incident : ''}</p>
                    </div>
                  </nav>

                  {/* Reader roomy, high readability */}
                  <div className="flex min-h-[420px] justify-center bg-white">
                    <AnimatePresence mode="wait">
                      {selectedSkill && (
                        <motion.div
                          key={selectedSkill.name}
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                          className="w-full max-w-[800px] bg-white"
                        >
                          {/* Selected skill header */}
                          <div className="border-b border-neutral-200 bg-neutral-50/70 px-4 py-5 sm:px-6">
                            <div className="flex items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="inline-flex items-center gap-2 rounded-md bg-neutral-950 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-white">{selectedSkill.stage?.split('·')[0]?.trim() ?? 'STAGE'}</span>
                                  <span className="font-mono text-[10px] text-neutral-400">{selectedSkill.stage}</span>
                                </div>
                                <h3 className="mt-2 font-display text-[21px] font-medium leading-[1.25] tracking-[-0.025em] text-neutral-950 sm:text-[24px]">{selectedSkill.name}</h3>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button onClick={() => copy(skillToMarkdown(active!, selectedSkill), `md-${selectedSkill.name}`)} className="button-secondary h-8 rounded-lg px-3 font-mono text-[10px] transition-colors hover:border-neutral-500">
                                  {copied === `md-${selectedSkill.name}` ? 'Copied!' : 'Copy MD'}
                                </button>
                                <button onClick={() => copy(window.location.href, `link-${selectedSkill.name}`)} className="button-secondary hidden h-8 items-center rounded-lg px-3 font-mono text-[10px] transition-colors hover:border-neutral-500 sm:inline-flex">
                                  {copied === `link-${selectedSkill.name}` ? 'Link copied' : 'Copy link'}
                                </button>
                              </div>
                            </div>
                            {selectedSkill.description && (
                              <p className="mt-3 rounded-xl border border-neutral-200 bg-white p-3.5 text-[13px] leading-[1.65] text-neutral-600 sm:text-[14px]">{selectedSkill.description}</p>
                            )}
                          </div>
                          <div className="space-y-7 px-4 py-6 sm:px-6">
                            <section>
                              <h4 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400"><span className="h-px w-4 bg-neutral-300" /> Overview</h4>
                              <p className="mt-3 text-[14px] leading-[1.75] text-neutral-800 sm:text-[15px]">{selectedSkill.overview}</p>
                            </section>
                            <section>
                              <h4 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400"><span className="h-px w-4 bg-neutral-300" /> When to use</h4>
                              {Array.isArray(selectedSkill.whenToUse) ? (
                                <ul className="mt-3 space-y-2">
                                  {selectedSkill.whenToUse.map((w) => (
                                    <li key={w} className="flex gap-3 text-[13px] leading-[1.65] text-neutral-700 sm:text-[14px]"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" /><span>{w}</span></li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="mt-3 text-[14px] leading-[1.7] text-neutral-700">{selectedSkill.whenToUse}</p>
                              )}
                            </section>
                            {selectedSkill.corePattern && (
                              <section>
                                <h4 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400"><span className="h-px w-4 bg-neutral-300" /> Core pattern</h4>
                                <div className="mt-3 grid gap-3">
                                  <div className="overflow-hidden rounded-xl border border-neutral-800 bg-[#0b0d11]">
                                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/[0.03]">
                                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/50">Before</span>
                                      <button onClick={() => copy(selectedSkill.corePattern!.before, `before-${selectedSkill.name}`)} className="rounded-md border border-white/15 bg-white/[0.05] px-2 py-1 font-mono text-[9px] text-white/70 hover:border-white/30 hover:text-white">{copied === `before-${selectedSkill.name}` ? 'Copied' : 'Copy'}</button>
                                    </div>
                                    <pre className="overflow-x-auto whitespace-pre p-3 text-[12px] leading-[1.6] text-neutral-100 sm:p-4">{selectedSkill.corePattern.before}</pre>
                                  </div>
                                  <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                                    <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-3 py-2">
                                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-400">After</span>
                                      <button onClick={() => copy(selectedSkill.corePattern!.after, `after-${selectedSkill.name}`)} className="rounded-md border border-neutral-200 bg-white px-2 py-1 font-mono text-[9px] text-neutral-600 hover:border-neutral-500 hover:text-black">{copied === `after-${selectedSkill.name}` ? 'Copied' : 'Copy'}</button>
                                    </div>
                                    <pre className="overflow-x-auto whitespace-pre p-3 text-[12px] leading-[1.6] text-neutral-900 sm:p-4">{selectedSkill.corePattern.after}</pre>
                                  </div>
                                </div>
                              </section>
                            )}
                            {selectedSkill.quickReference && (
                              <section>
                                <h4 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400"><span className="h-px w-4 bg-neutral-300" /> Quick reference</h4>
                                {/* desktop table */}
                                <div className="mt-3 hidden overflow-hidden overflow-x-auto rounded-xl border border-neutral-200 sm:block">
                                  <table className="w-full text-[13px]">
                                    <thead>
                                      <tr className="bg-neutral-950 text-white">
                                        {selectedSkill.quickReference.headers.map((h) => (
                                          <th key={h} className="text-left px-3.5 py-2.5 font-mono text-[11px] tracking-wide uppercase font-medium whitespace-nowrap">{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200">
                                      {selectedSkill.quickReference.rows.map((row, i) => (
                                        <tr key={i} className="bg-white even:bg-neutral-50">
                                          {row.map((cell) => (
                                            <td key={cell} className="px-3.5 py-2.5 leading-[1.55] text-neutral-700">{cell}</td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                {/* mobile cards */}
                                <div className="mt-3 grid gap-2 sm:hidden">
                                  {selectedSkill.quickReference.rows.map((row, i) => (
                                    <div key={i} className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                                      <div className="grid gap-1.5">
                                        {row.map((cell, j) => (
                                          <div key={cell} className="flex gap-2 text-[13px] leading-[1.5]"><span className="min-w-[70px] pt-[2px] font-mono text-[9px] uppercase tracking-wide text-neutral-400">{selectedSkill.quickReference!.headers[j]}</span><span className="flex-1 text-neutral-800">{cell}</span></div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </section>
                            )}
                            <section>
                              <h4 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400"><span className="h-px w-4 bg-neutral-300" /> Implementation</h4>
                              <p className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 font-mono text-[12px] leading-[1.7] text-neutral-700 sm:text-[13px]">{selectedSkill.how}</p>
                            </section>
                            {selectedSkill.commonMistakes && (
                              <section>
                                <h4 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400"><span className="h-px w-4 bg-neutral-300" /> Common mistakes</h4>
                                <ul className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-2.5">
                                  {selectedSkill.commonMistakes.map((mm) => (
                                    <li key={mm} className="flex gap-3 text-[13px] leading-[1.6] text-amber-900 sm:text-[14px]"><span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" /><span>{mm}</span></li>
                                  ))}
                                </ul>
                              </section>
                            )}
                            {selectedSkill.example && (
                              <div className="rounded-xl bg-black text-white p-4 sm:p-5">
                                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">Example</div>
                                <p className="mt-2 font-mono text-[12px] leading-[1.65] text-white sm:text-[13px]">{selectedSkill.example}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-2 border-t border-neutral-200 pt-4">
                              {(() => {
                                const idx = sortedSkills.findIndex((s) => s.name === selectedSkill.name)
                                const prev = idx > 0 ? sortedSkills[idx - 1] : null
                                const next = idx < sortedSkills.length - 1 ? sortedSkills[idx + 1] : null
                                return (
                                  <>
                                    <button
                                      disabled={!prev}
                                      onClick={() => prev && setSelected(prev.name)}
                                      className={`h-9 rounded-lg border px-3 font-mono text-[10px] transition-colors ${prev ? 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-500 hover:bg-neutral-50' : 'cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-300'}`}
                                    >
                                      ← {prev ? prev.name.slice(0, 18) : 'Prev'}
                                    </button>
                                    <span className="flex-1 text-center font-mono text-[10px] text-neutral-400">{idx + 1} / {sortedSkills.length}</span>
                                    <button
                                      disabled={!next}
                                      onClick={() => next && setSelected(next.name)}
                                      className={`h-9 rounded-lg border px-3 font-mono text-[10px] transition-colors ${next ? 'border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800' : 'cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-300'}`}
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
