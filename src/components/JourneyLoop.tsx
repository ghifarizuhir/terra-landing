import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { managements } from '../data/managements'

export default function JourneyLoop() {
  const [open, setOpen] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const active = open ? managements.find((m) => m.id === open) ?? null : null
  const shouldReduceMotion = useReducedMotion()
  const totalSkills = managements.reduce((n, m) => n + m.skills.length, 0)
  const sortedSkills = active ? [...active.skills].sort((a, b) => (a.stage ?? '').localeCompare(b.stage ?? '')) : []
  const allStaged = !!active && active.skills.length > 0 && active.skills.every((s) => !!s.stage)
  const selectedSkill = selected ? sortedSkills.find((s) => s.name === selected) ?? sortedSkills[sortedSkills.length - 1] : sortedSkills[sortedSkills.length - 1]

  useEffect(() => {
    if (active) setSelected(sortedSkills[sortedSkills.length - 1]?.name ?? null)
  }, [active?.id])

  const gridVariants = shouldReduceMotion
    ? undefined
    : { hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }
  const cardVariants = shouldReduceMotion
    ? undefined
    : { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const } } }
  const railContainerVariants = shouldReduceMotion
    ? undefined
    : { hidden: {}, visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } } }
  const railItemVariants = shouldReduceMotion
    ? undefined
    : { hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] as const } } }

  return (
    <>
      {/* Structured grid — 1px rule system, numerics 01—08, flat cards */}
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
            layout="position"
            variants={cardVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -2, transition: { duration: 0.14 } }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => setOpen(m.id)}
            className="text-left bg-white p-4 flex flex-col min-h-[200px] relative overflow-hidden text-[oklch(0.145_0_0)] hover:bg-[oklch(0_0_0/2%)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.145_0_0)] focus-visible:ring-inset"
            transition={shouldReduceMotion ? { duration: 0 } : ({ duration: 0.16, type: 'spring', stiffness: 600, damping: 30 } as const)}
          >
            <div className="flex items-center gap-2 shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase text-[oklch(0.62_0_0)]">
              <span>{String(idx + 1).padStart(2, '0')} — {m.prefix}</span>
              <span className="h-px flex-1 bg-[oklch(0.145_0_0/12%)]" />
              <span className="border border-[oklch(0.145_0_0/25%)] px-1.5 py-0.5 bg-white text-[oklch(0.45_0_0)] text-[9px] tracking-[0.12em] hidden xl:inline">{m.lane}</span>
            </div>
            <h3 className="font-semibold text-[13px] tracking-[-0.01em] leading-tight mt-2 shrink-0">{m.title}</h3>
            <p className="text-[12.5px] leading-[1.4] mt-1 text-[oklch(0.45_0_0)] shrink-0 line-clamp-2">{m.oneLiner}</p>
            <div className="mt-2 space-y-1 shrink-0">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase font-medium text-[oklch(0.62_0_0)]">Does</p>
              <p className="text-[11.5px] leading-[1.45] text-[oklch(0.45_0_0)] line-clamp-2">{m.bullets[0]}</p>
              <p className="hidden lg:block text-[11.5px] leading-[1.45] text-[oklch(0.45_0_0)] line-clamp-1 opacity-80">{m.bullets[1]}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 shrink-0 border-t border-[oklch(0.145_0_0/12%)] pt-2.5">
              <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-[oklch(0.62_0_0)] w-full">AI skills →</span>
              {m.skills.slice(0, 2).map((s) => (
                <span key={s.name} className="font-mono text-[9px] tracking-[0.08em] uppercase bg-[oklch(0.145_0_0)] text-white px-1.5 py-1">
                  {s.name}
                </span>
              ))}
              {m.skills.length > 2 && (
                <span className="font-mono text-[9px] tracking-[0.08em] uppercase border border-[oklch(0.145_0_0/25%)] bg-white px-1.5 py-1 font-medium">
                  +{m.skills.length - 2}
                </span>
              )}
            </div>
            <span className="mt-auto pt-2 font-mono text-[10px] tracking-[0.12em] uppercase text-[oklch(0.62_0_0)] shrink-0">Details →</span>
          </motion.button>
        ))}
      </motion.div>

      <div className="shrink-0 pt-3 flex items-center gap-3 font-mono text-[10px] tracking-[0.14em] uppercase text-[oklch(0.45_0_0)]">
        <span className="h-px flex-1 bg-[oklch(0.145_0_0/12%)]" />
        Foundation — always visible · 8 stations · {totalSkills} AI skills · 1px rule
        <span className="h-px flex-1 bg-[oklch(0.145_0_0/12%)]" />
      </div>

      {/* Detail — Rail + Reader */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            layoutId={`card-${active.id}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            transition={shouldReduceMotion ? { duration: 0 } : ({ type: 'spring', stiffness: 340, damping: 28, mass: 0.8 } as unknown as Record<string, unknown>)}
            className="fixed inset-0 z-50 bg-[oklch(0.985_0_0)] flex flex-col overflow-hidden"
          >
            <div className="shrink-0 h-[52px] border-b border-[oklch(0.145_0_0)] bg-[oklch(0.985_0_0)] flex items-center px-4 lg:px-5 gap-3">
              <button onClick={() => setOpen(null)} className="h-8 px-3 border border-[oklch(0.145_0_0)] bg-[oklch(0.145_0_0)] text-white font-mono text-[11px] tracking-[0.12em] uppercase flex items-center gap-2">
                ← Back to grid
              </button>
              <span className="h-8 w-px bg-[oklch(0.145_0_0/12%)] hidden sm:block" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase font-medium bg-[oklch(0.145_0_0)] text-white px-2 py-1 hidden sm:inline">{active.prefix}</span>
              <span className="text-[13px] font-semibold tracking-[-0.01em] hidden sm:inline">{active.title}</span>
              <span className="ml-auto font-mono text-[10px] tracking-[0.12em] uppercase text-[oklch(0.45_0_0)] hidden lg:inline">Rail + Reader · 1 skill focus</span>
              <span className="ml-auto lg:hidden font-mono text-[10px] tracking-[0.12em] uppercase border border-[oklch(0.145_0_0/25%)] bg-white px-2 py-1">Full page</span>
            </div>
            <div className="h-px bg-[oklch(0.145_0_0)] shrink-0" />

            <div className="flex-1 overflow-auto">
              <div className="max-w-[1280px] mx-auto px-4 lg:px-5 py-5">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[oklch(0.45_0_0)]">
                  <span className="h-px w-6 bg-[oklch(0.145_0_0)]" />
                  {active.lane === 'foundation' ? 'Foundation workflow' : 'Cycle'} · {active.skills.length} stages
                </div>
                <h2 className="font-display font-semibold text-[28px] lg:text-[38px] leading-[1.05] tracking-[-0.02em] mt-2">{active.title}</h2>
                <p className="text-[15px] leading-[1.5] mt-2 text-[oklch(0.45_0_0)] max-w-[720px]">{active.oneLiner}</p>

                <div className="mt-5 grid lg:grid-cols-3 gap-px bg-[oklch(0.145_0_0/12%)] border border-[oklch(0.145_0_0/12%)]">
                  {active.bullets.map((b, i) => (
                    <div key={b} className="bg-white p-3">
                      <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-medium text-[oklch(0.62_0_0)]">0{i + 1} — What it does</div>
                      <p className="text-[12.5px] leading-[1.55] mt-1">{b}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <h3 className="font-display font-semibold text-[17px] tracking-[-0.01em]">AI skills — real skills</h3>
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase bg-[oklch(0.145_0_0)] text-white px-2 py-1">{active.skills.length} skills</span>
                  {allStaged && <span className="font-mono text-[10px] tracking-[0.12em] uppercase border border-[oklch(0.145_0_0/25%)] bg-white px-2 py-1 font-medium">{active.skills.length}/{active.skills.length} stages</span>}
                  <span className="h-px flex-1 bg-[oklch(0.145_0_0/12%)]" />
                </div>
                {allStaged && <p className="font-mono text-[10px] tracking-[0.12em] uppercase font-medium text-[oklch(0.45_0_0)] mt-2">{active.lane === 'foundation' ? 'Workflow coverage — one skill per stage' : 'Cycle coverage — one skill per stage'}</p>}

                {/* Rail + Reader shell */}
                <div className="mt-3 grid lg:grid-cols-[240px_1fr] gap-0 border border-[oklch(0.145_0_0)] bg-white overflow-hidden">
                  {/* Rail */}
                  <motion.nav
                    variants={railContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-b lg:border-b-0 lg:border-r border-[oklch(0.145_0_0)] bg-white flex flex-col min-h-0 lg:sticky lg:top-0 lg:h-[min(72vh,760px)] lg:overflow-auto"
                    aria-label="Stage rail"
                  >
                    <div className="p-3 border-b border-[oklch(0.145_0_0/12%)] bg-[oklch(0.985_0_0)]">
                      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[oklch(0.62_0_0)]">Stages</p>
                      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[oklch(0.45_0_0)] mt-1">{active.skills.length} stages · click to read</p>
                    </div>
                    <div className="p-2 flex lg:flex-col gap-1.5 overflow-auto lg:overflow-visible">
                      {sortedSkills.map((s) => {
                        const isActive = s.name === selectedSkill?.name
                        return (
                          <motion.button
                            key={s.name}
                            variants={railItemVariants}
                            onClick={() => setSelected(s.name)}
                            className={`text-left border p-2.5 shrink-0 lg:shrink font-mono min-w-[180px] lg:min-w-0 ${isActive ? 'bg-[oklch(0.145_0_0)] text-white border-[oklch(0.145_0_0)]' : 'bg-white border-[oklch(0.145_0_0/12%)] hover:bg-[oklch(0_0_0/3%)]'}`}
                          >
                            <div className="text-[9px] tracking-[0.1em] uppercase font-medium">{s.stage}</div>
                            <div className={`text-[10px] leading-[1.4] mt-1 line-clamp-2 ${isActive ? 'text-white/80' : 'text-[oklch(0.45_0_0)]'}`}>{s.name}</div>
                          </motion.button>
                        )
                      })}
                    </div>
                    <div className="hidden lg:block mt-auto border-t border-[oklch(0.145_0_0/12%)] p-3">
                      <p className="font-mono text-[9px] tracking-[0.12em] uppercase font-medium text-[oklch(0.62_0_0)]">Principle</p>
                      <p className="text-[11.5px] leading-[1.5] text-[oklch(0.45_0_0)] mt-1">A {active.lane === 'foundation' ? 'map' : 'ticket'} is not done when it says closed — it is done when its records explain what happened.</p>
                    </div>
                  </motion.nav>

                  {/* Reader — single skill */}
                  <div className="min-h-[420px] bg-[oklch(0.985_0_0)]">
                    <AnimatePresence mode="wait">
                      {selectedSkill && (
                        <motion.div
                          key={selectedSkill.name}
                          initial={shouldReduceMotion ? false : { opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -6 }}
                          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
                          className="bg-white"
                        >
                          <div className="p-4 border-b border-[oklch(0.145_0_0/12%)] bg-[oklch(0.985_0_0)]">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-[11px] tracking-[0.1em] uppercase font-medium bg-[oklch(0.145_0_0)] text-white inline-block px-2 py-1">{selectedSkill.name}</span>
                              {selectedSkill.stage && <span className="font-mono text-[9px] tracking-[0.1em] uppercase font-medium border border-[oklch(0.145_0_0/25%)] bg-white px-1.5 py-0.5">{selectedSkill.stage}</span>}
                            </div>
                            {selectedSkill.description && <p className="font-mono text-[11px] leading-[1.45] mt-2 bg-white border border-[oklch(0.145_0_0/12%)] p-2">{selectedSkill.description}</p>}
                          </div>
                          <div className="p-4 space-y-4">
                            <div>
                              <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-medium text-[oklch(0.62_0_0)]">Overview</div>
                              <p className="text-[12.5px] leading-[1.6] mt-1">{selectedSkill.overview}</p>
                            </div>
                            <div>
                              <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-medium text-[oklch(0.62_0_0)]">When to use</div>
                              {Array.isArray(selectedSkill.whenToUse) ? (
                                <ul className="mt-1 space-y-1 list-disc pl-4 text-[11px] leading-[1.6] text-[oklch(0.45_0_0)]">
                                  {selectedSkill.whenToUse.map((w) => (
                                    <li key={w}>{w}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-[11px] leading-[1.6] text-[oklch(0.45_0_0)] mt-1">{selectedSkill.whenToUse}</p>
                              )}
                            </div>
                            {selectedSkill.corePattern && (
                              <div>
                                <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-medium text-[oklch(0.62_0_0)]">Core Pattern</div>
                                <div className="mt-1 grid gap-2">
                                  <pre className="bg-[oklch(0.145_0_0)] text-white p-2.5 text-[10px] leading-[1.45] overflow-auto">{selectedSkill.corePattern.before}</pre>
                                  <pre className="bg-white border border-[oklch(0.145_0_0)] p-2.5 text-[10px] leading-[1.45] overflow-auto">{selectedSkill.corePattern.after}</pre>
                                </div>
                              </div>
                            )}
                            {selectedSkill.quickReference && (
                              <div>
                                <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-medium text-[oklch(0.62_0_0)]">Quick Reference</div>
                                <table className="mt-1 w-full border border-[oklch(0.145_0_0/12%)] text-[11px]">
                                  <thead>
                                    <tr className="bg-[oklch(0.145_0_0)] text-white">
                                      {selectedSkill.quickReference.headers.map((h) => (
                                        <th key={h} className="text-left px-2 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase font-medium">{h}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedSkill.quickReference.rows.map((row, i) => (
                                      <tr key={i} className="border-t border-[oklch(0.145_0_0/12%)] bg-white">
                                        {row.map((cell) => (
                                          <td key={cell} className="px-2 py-1.5">{cell}</td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                            <div>
                              <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-medium text-[oklch(0.62_0_0)]">Implementation</div>
                              <p className="text-[11px] leading-[1.6] text-[oklch(0.45_0_0)] font-mono mt-1 bg-[oklch(0.985_0_0)] border border-[oklch(0.145_0_0/12%)] p-2.5">{selectedSkill.how}</p>
                            </div>
                            {selectedSkill.commonMistakes && (
                              <div>
                                <div className="font-mono text-[10px] tracking-[0.12em] uppercase font-medium text-[oklch(0.62_0_0)]">Common Mistakes</div>
                                <ul className="mt-1 space-y-1 list-disc pl-4 text-[11px] leading-[1.6] text-[oklch(0.45_0_0)]">
                                  {selectedSkill.commonMistakes.map((mm) => (
                                    <li key={mm}>{mm}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {selectedSkill.example && (
                              <div className="bg-[oklch(0.145_0_0)] text-white p-2.5 font-mono text-[11px] leading-[1.45]">
                                <span className="text-white/60">Example →</span> {selectedSkill.example}
                              </div>
                            )}
                            <div className="flex gap-2 pt-2 border-t border-[oklch(0.145_0_0/12%)]">
                              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[oklch(0.62_0_0)]">
                                {sortedSkills.findIndex((s) => s.name === selectedSkill.name) + 1} / {sortedSkills.length}
                              </span>
                              <span className="ml-auto font-mono text-[10px] tracking-[0.12em] uppercase text-[oklch(0.62_0_0)]">Click stage in rail to switch</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[oklch(0.62_0_0)] mt-3 text-center">Rail holds {sortedSkills.length} stages · reader shows 1 skill — structured monochrome</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
