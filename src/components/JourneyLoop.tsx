import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { managements } from '../data/managements'

export default function JourneyLoop() {
  const [open, setOpen] = useState<string | null>(null)
  const active = open ? managements.find((m) => m.id === open) ?? null : null
  const shouldReduceMotion = useReducedMotion()
  const totalSkills = managements.reduce((n, m) => n + m.skills.length, 0)
  const sortedSkills = active ? [...active.skills].sort((a, b) => (a.stage ?? '').localeCompare(b.stage ?? '')) : []
  const allStaged = !!active && active.skills.length > 0 && active.skills.every((s) => !!s.stage)

  const gridVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
      }
  const cardVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const } },
      }

  return (
    <>
      {/* Editorial grid — 1px rule system, numerics 01—08, wash hover */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[oklch(0.145_0_0)] border border-[oklch(0.145_0_0)]"
      >
        {managements.map((m, idx) => (
          <motion.button
            key={m.id}
            layoutId={`card-${m.id}`}
            variants={cardVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            onClick={() => setOpen(m.id)}
            className="text-left bg-white p-4 flex flex-col min-h-[214px] relative overflow-hidden text-[oklch(0.145_0_0)] hover:bg-[oklch(0_0_0/2%)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.145_0_0)] focus-visible:ring-inset"
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.16 }}
          >
            <div className="flex items-center gap-2 shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase text-[oklch(0.62_0_0)]">
              <span>{String(idx + 1).padStart(2, '0')} — {m.prefix}</span>
              <span className="h-px flex-1 bg-[oklch(0.145_0_0/12%)]" />
              <span className="border border-[oklch(0.145_0_0)] px-1.5 py-0.5 bg-white text-[oklch(0.145_0_0)] text-[9px] tracking-[0.12em] hidden xl:inline">{m.lane}</span>
            </div>
            <h3 className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase leading-tight mt-2 shrink-0">{m.title}</h3>
            <p className="font-serif2 text-[19px] leading-[1.22] tracking-[-0.02em] mt-1 shrink-0">
              {m.oneLiner.replace(/\.$/, '')}
              <em className="italic text-[oklch(0.45_0_0)]">.</em>
            </p>
            <div className="mt-2 space-y-1 shrink-0">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase font-semibold text-[oklch(0.62_0_0)]">Does</p>
              <p className="text-[11.5px] leading-[1.5] text-[oklch(0.45_0_0)] line-clamp-2">{m.bullets[0]}</p>
              <p className="hidden lg:block text-[11.5px] leading-[1.5] text-[oklch(0.45_0_0)] line-clamp-1 opacity-80">{m.bullets[1]}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 shrink-0 border-t border-[oklch(0.145_0_0/12%)] pt-2.5">
              <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-[oklch(0.62_0_0)] w-full">AI skills →</span>
              {m.skills.slice(0, 2).map((s) => (
                <span key={s.name} className="font-mono text-[9px] tracking-[0.1em] uppercase bg-[oklch(0.145_0_0)] text-white px-2 py-1 rounded-full">
                  {s.name}
                </span>
              ))}
              {m.skills.length > 2 && (
                <span className="font-mono text-[9px] tracking-[0.1em] uppercase border border-[oklch(0.145_0_0/12%)] bg-white px-2 py-1 rounded-full font-semibold">
                  +{m.skills.length - 2}
                </span>
              )}
            </div>
            <span className="mt-auto pt-2 font-mono text-[10px] tracking-[0.12em] uppercase text-[oklch(0.62_0_0)] shrink-0">Details →</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Foundation hint */}
      <div className="shrink-0 pt-3 flex items-center gap-3 font-mono text-[10px] tracking-[0.14em] uppercase text-[oklch(0.45_0_0)]">
        <span className="h-px flex-1 bg-[oklch(0.145_0_0/12%)]" />
        Foundation — always visible · 8 stations · {totalSkills} AI skills · 1px rule
        <span className="h-px flex-1 bg-[oklch(0.145_0_0/12%)]" />
      </div>

      {/* Detail — editorial full page */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            layoutId={`card-${active.id}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 z-50 bg-[oklch(0.985_0_0)] flex flex-col overflow-hidden"
          >
            {/* Top bar — editorial */}
            <div className="shrink-0 h-[52px] border-b border-[oklch(0.145_0_0)] bg-[oklch(0.985_0_0)] flex items-center px-4 lg:px-5 gap-3">
              <button onClick={() => setOpen(null)} className="h-8 px-3 border border-[oklch(0.145_0_0)] bg-[oklch(0.145_0_0)] text-white font-mono text-[11px] tracking-[0.12em] uppercase flex items-center gap-2">
                ← Back to grid
              </button>
              <span className="h-8 w-px bg-[oklch(0.145_0_0/12%)] hidden sm:block" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase font-semibold bg-[oklch(0.145_0_0)] text-white px-2 py-1 hidden sm:inline">{active.prefix}</span>
              <span className="font-display text-[13px] tracking-[0.08em] uppercase font-bold hidden sm:inline">{active.title}</span>
              <span className="ml-auto font-mono text-[10px] tracking-[0.12em] uppercase text-[oklch(0.45_0_0)] hidden lg:inline">Editorial monochrome · 1px rule</span>
              <span className="ml-auto lg:hidden font-mono text-[10px] tracking-[0.12em] uppercase border border-[oklch(0.145_0_0)] bg-white px-2 py-1">Full page</span>
            </div>
            <div className="h-px bg-[oklch(0.145_0_0)] shrink-0" />

            <div className="flex-1 overflow-auto">
              <div className="max-w-[1160px] mx-auto px-4 lg:px-5 py-6">
                {/* Title block — editorial: display + serif italic */}
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[oklch(0.45_0_0)]">
                  <span className="h-px w-6 bg-[oklch(0.145_0_0)]" />
                  {active.lane === 'foundation' ? 'Foundation workflow' : 'Cycle'} · {active.skills.length} stages
                </div>
                <h2 className="font-display text-[32px] lg:text-[42px] leading-[0.9] tracking-[-0.03em] mt-2">
                  {active.title.replace(' Management', '')} <em className="font-serif2 italic font-light text-[oklch(0.45_0_0)]">Management</em>
                </h2>
                <p className="font-serif2 text-[18px] leading-[1.4] mt-2 text-[oklch(0.45_0_0)] max-w-[720px]">{active.oneLiner}</p>

                <div className="mt-6 grid lg:grid-cols-3 gap-px bg-[oklch(0.145_0_0/12%)] border border-[oklch(0.145_0_0/12%)]">
                  {active.bullets.map((b, i) => (
                    <div key={b} className="bg-white p-3">
                      <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-semibold text-[oklch(0.62_0_0)]">0{i + 1} — What it does</div>
                      <p className="text-[12.5px] leading-[1.55] mt-1">{b}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display text-[20px] font-bold tracking-tight">AI skills — real skills</h3>
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase bg-[oklch(0.145_0_0)] text-white px-2 py-1">{active.skills.length} skills</span>
                    {allStaged && (
                      <span className="font-mono text-[10px] tracking-[0.12em] uppercase border border-[oklch(0.145_0_0)] bg-white px-2 py-1 font-semibold">{active.skills.length}/{active.skills.length} stages</span>
                    )}
                    <span className="h-px flex-1 bg-[oklch(0.145_0_0/12%)]" />
                  </div>

                  {allStaged && (
                    <div className="mb-4">
                      <p className="font-mono text-[10px] tracking-[0.12em] uppercase font-semibold text-[oklch(0.45_0_0)] mb-2">{active.lane === 'foundation' ? 'Workflow coverage — one skill per stage' : 'Cycle coverage — one skill per stage'}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                        {sortedSkills.map((s) => (
                          <div key={`strip-${s.name}`} className="border border-[oklch(0.145_0_0/12%)] bg-white p-2.5">
                            <div className="font-mono text-[9px] tracking-[0.1em] uppercase font-bold">{s.stage}</div>
                            <p className="font-mono text-[9px] leading-[1.4] tracking-[0.06em] uppercase text-[oklch(0.45_0_0)] mt-1.5 line-clamp-2">{s.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quote — editorial */}
                  <div className="border-l-2 border-[oklch(0.145_0_0)] pl-3 py-1 mb-4">
                    <p className="font-serif2 italic text-[16px] leading-[1.4] text-[oklch(0.45_0_0)]">“A {active.lane === 'foundation' ? 'map' : 'ticket'} is not done when it says closed — it is done when its records explain what happened.”</p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-3">
                    {sortedSkills.map((s) => (
                      <div key={s.name} className="border border-[oklch(0.145_0_0)] bg-white flex flex-col">
                        <div className="p-3 border-b border-[oklch(0.145_0_0/12%)] bg-[oklch(0.985_0_0)]">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[11px] tracking-[0.1em] uppercase font-bold bg-[oklch(0.145_0_0)] text-white inline-block px-2 py-1">{s.name}</span>
                            {s.stage && (
                              <span className="font-mono text-[9px] tracking-[0.1em] uppercase font-semibold border border-[oklch(0.145_0_0)] bg-white px-1.5 py-0.5">{s.stage}</span>
                            )}
                          </div>
                          {s.description && <p className="font-mono text-[11px] leading-[1.45] mt-2 bg-white border border-[oklch(0.145_0_0/12%)] p-2">{s.description}</p>}
                        </div>
                        <div className="p-3 space-y-3 flex-1">
                          <div>
                            <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-semibold text-[oklch(0.62_0_0)]">Overview</div>
                            <p className="text-[12.5px] leading-[1.55] mt-1">{s.overview}</p>
                          </div>
                          <div>
                            <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-semibold text-[oklch(0.62_0_0)]">When to use</div>
                            {Array.isArray(s.whenToUse) ? (
                              <ul className="mt-1 space-y-1 list-disc pl-4 text-[11px] leading-[1.55] text-[oklch(0.45_0_0)]">
                                {s.whenToUse.map((w) => (
                                  <li key={w}>{w}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-[11px] leading-[1.55] text-[oklch(0.45_0_0)] mt-1">{s.whenToUse}</p>
                            )}
                          </div>
                          {s.corePattern && (
                            <div>
                              <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-semibold text-[oklch(0.62_0_0)]">Core Pattern</div>
                              <div className="mt-1 grid gap-2">
                                <pre className="bg-[oklch(0.145_0_0)] text-white p-2 text-[10px] leading-[1.45] overflow-auto">{s.corePattern.before}</pre>
                                <pre className="bg-white border border-[oklch(0.145_0_0)] p-2 text-[10px] leading-[1.45] overflow-auto">{s.corePattern.after}</pre>
                              </div>
                            </div>
                          )}
                          {s.quickReference && (
                            <div>
                              <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-semibold text-[oklch(0.62_0_0)]">Quick Reference</div>
                              <table className="mt-1 w-full border border-[oklch(0.145_0_0/12%)] text-[11px]">
                                <thead>
                                  <tr className="bg-[oklch(0.145_0_0)] text-white">
                                    {s.quickReference.headers.map((h) => (
                                      <th key={h} className="text-left px-2 py-1 font-mono text-[10px] tracking-[0.12em] uppercase">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {s.quickReference.rows.map((row, i) => (
                                    <tr key={i} className="border-t border-[oklch(0.145_0_0/12%)] bg-white">
                                      {row.map((cell) => (
                                        <td key={cell} className="px-2 py-1">{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                          <div>
                            <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-semibold text-[oklch(0.62_0_0)]">Implementation</div>
                            <p className="text-[11px] leading-[1.55] text-[oklch(0.45_0_0)] font-mono mt-1 bg-[oklch(0.985_0_0)] border border-[oklch(0.145_0_0/12%)] p-2">{s.how}</p>
                          </div>
                          {s.commonMistakes && (
                            <div>
                              <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-semibold text-[oklch(0.62_0_0)]">Common Mistakes</div>
                              <ul className="mt-1 space-y-1 list-disc pl-4 text-[11px] leading-[1.55] text-[oklch(0.45_0_0)]">
                                {s.commonMistakes.map((mm) => (
                                  <li key={mm}>{mm}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {s.example && (
                            <div className="bg-[oklch(0.145_0_0)] text-white p-2 font-mono text-[11px] leading-[1.45]">
                              <span className="text-white/60">Example →</span> {s.example}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
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
