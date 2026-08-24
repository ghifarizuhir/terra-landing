import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { managements } from '../data/managements'

export default function JourneyLoop() {
  const [open, setOpen] = useState<string | null>(null)
  const active = open ? managements.find((m) => m.id === open) ?? null : null
  const shouldReduceMotion = useReducedMotion()
  const totalSkills = managements.reduce((n, m) => n + m.skills.length, 0)

  const gridVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
      }
  const cardVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
      }

  return (
    <>
      {/* Dashboard grid — full-width, 100vh adaptif: 4×2 desktop, 2×4 mobile, fills remaining height */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 grid-rows-4 lg:grid-rows-2 gap-px bg-[#1a1d23] p-px overflow-hidden auto-rows-fr"
      >
        {managements.map((m) => (
          <motion.button
            key={m.id}
            layoutId={`card-${m.id}`}
            variants={cardVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => setOpen(m.id)}
            className="text-left bg-[#fafaf7] p-3 lg:p-4 flex flex-col min-h-0 overflow-hidden hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-inset"
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.18 }}
          >
            <div className="flex items-center gap-2 mb-2 shrink-0">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ background: m.color.replace('bg-', '').includes('red') ? '#ef4444' : m.color.includes('purple') ? '#a855f7' : m.color.includes('amber') ? '#f59e0b' : m.color.includes('indigo') ? '#6366f1' : m.color.includes('emerald') ? '#10b981' : m.color.includes('blue') ? '#3b82f6' : m.color.includes('sky') ? '#0ea5e9' : '#475569' }} />
              <span className="font-mono text-[10px] tracking-widest uppercase font-semibold bg-[#1a1d23] text-[#fafaf7] px-1.5 py-0.5 rounded-sm">{m.prefix}</span>
              <span className="ml-auto font-mono text-[10px] tracking-widest uppercase text-[#8a8f98] hidden xl:inline">{m.lane}</span>
            </div>
            <h3 className="font-display text-[12px] font-bold tracking-widest uppercase leading-tight shrink-0">{m.title}</h3>
            <p className="font-display text-[12.5px] leading-[1.3] mt-1 shrink-0 line-clamp-2">{m.oneLiner}</p>
            {/* Description — fills empty feeling */}
            <div className="mt-2 space-y-1 shrink-0">
              <p className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[#8a8f98]">Does</p>
              <p className="text-[11.5px] leading-[1.45] text-[#3a3f4a] line-clamp-2">{m.bullets[0]}</p>
              <p className="hidden lg:block text-[11.5px] leading-[1.45] text-[#3a3f4a] line-clamp-1 opacity-80">{m.bullets[1]}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1 shrink-0">
              <span className="font-mono text-[9px] tracking-widest uppercase text-[#8a8f98] w-full">AI skills →</span>
              {m.skills.slice(0, 2).map((s) => (
                <span key={s.name} className="font-mono text-[9px] tracking-widest uppercase bg-[#1a1d23] text-[#fafaf7] px-1.5 py-0.5">
                  {s.name}
                </span>
              ))}
              {m.skills.length > 2 && (
                <span className="font-mono text-[9px] tracking-widest uppercase bg-[#facc15] text-[#1a1d23] font-semibold px-1.5 py-0.5">
                  +{m.skills.length - 2}
                </span>
              )}
            </div>
            <span className="mt-auto pt-2 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98] shrink-0">Details →</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Foundation hint for tests */}
      <div className="shrink-0 pt-2 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98]">
        <span className="h-px flex-1 bg-[#e8e9eb]" />
        Foundation — always visible · 8 stations · {totalSkills} AI skills
        <span className="h-px flex-1 bg-[#e8e9eb]" />
      </div>



      {/* Detail — full page motion: grid card → full page */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            layoutId={`card-${active.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 z-50 bg-[#fafaf7] flex flex-col overflow-hidden"
          >
            {/* Top bar */}
            <div className="shrink-0 h-[56px] border-b border-[#1a1d23] bg-[#fafaf7] flex items-center px-4 lg:px-6 gap-3">
              <button onClick={() => setOpen(null)} className="h-8 px-3 border border-[#1a1d23] bg-[#1a1d23] text-[#fafaf7] font-mono text-[11px] tracking-widest uppercase flex items-center gap-2">
                ← Back to grid
              </button>
              <span className="h-8 w-px bg-[#e8e9eb] hidden sm:block" />
              <span className="font-mono text-[11px] tracking-widest uppercase font-semibold bg-[#1a1d23] text-[#fafaf7] px-2 py-1 hidden sm:inline">{active.prefix}</span>
              <span className="font-display text-[13px] tracking-widest uppercase font-bold hidden sm:inline">{active.title}</span>
              <span className="ml-auto font-mono text-[10px] tracking-widest uppercase text-[#8a8f98] hidden lg:inline">Full page — no scroll inside skill, all details visible</span>
              <span className="ml-auto lg:hidden font-mono text-[10px] tracking-widest uppercase bg-[#facc15] text-[#1a1d23] px-2 py-1">Full page</span>
            </div>
            <div className="h-[3px] w-full shrink-0" style={{ background: active.color.replace('bg-', '').includes('red') ? '#ef4444' : active.color.includes('purple') ? '#a855f7' : active.color.includes('amber') ? '#f59e0b' : active.color.includes('indigo') ? '#6366f1' : active.color.includes('emerald') ? '#10b981' : active.color.includes('blue') ? '#3b82f6' : active.color.includes('sky') ? '#0ea5e9' : '#475569' }} />

            {/* Content — scrollable, full page, no inner 42vh limit */}
            <div className="flex-1 overflow-auto">
              <div className="max-w-[960px] mx-auto px-4 lg:px-6 py-6">
                <h2 className="font-display text-[28px] lg:text-[32px] leading-[0.95] tracking-tight uppercase">{active.title}</h2>
                <p className="font-display text-[16px] leading-[1.4] mt-2 text-[#3a3f4a]">{active.oneLiner}</p>

                <div className="mt-6 grid lg:grid-cols-3 gap-3">
                  {active.bullets.map((b, i) => (
                    <div key={b} className="border border-[#e8e9eb] bg-white p-3">
                      <div className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[#8a8f98]">0{i + 1} — What it does</div>
                      <p className="text-[12.5px] leading-[1.5] mt-1">{b}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display text-[18px] font-bold tracking-tight uppercase">AI skills — real skills</h3>
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#1a1d23] text-[#fafaf7] px-2 py-1">{active.skills.length} skills</span>
                    <span className="h-px flex-1 bg-[#e8e9eb]" />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-3">
                    {active.skills.map((s) => (
                      <div key={s.name} className="border border-[#1a1d23] bg-white flex flex-col">
                        <div className="p-3 border-b border-[#e8e9eb] bg-[#fafaf7]">
                          <div className="font-mono text-[11px] tracking-widest uppercase font-bold bg-[#1a1d23] text-[#fafaf7] inline-block px-2 py-1">{s.name}</div>
                          {s.description && <p className="font-mono text-[11px] leading-[1.4] mt-2 bg-white border border-[#e8e9eb] p-2">{s.description}</p>}
                        </div>
                        <div className="p-3 space-y-3 flex-1">
                          <div>
                            <div className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[#8a8f98]">Overview</div>
                            <p className="text-[12.5px] leading-[1.5] mt-1">{s.overview}</p>
                          </div>
                          <div>
                            <div className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[#8a8f98]">When to use</div>
                            {Array.isArray(s.whenToUse) ? (
                              <ul className="mt-1 space-y-1 list-disc pl-4 text-[11px] leading-[1.5] text-[#3a3f4a]">
                                {s.whenToUse.map((w) => (
                                  <li key={w}>{w}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-[11px] leading-[1.5] text-[#3a3f4a] mt-1">{s.whenToUse}</p>
                            )}
                          </div>
                          {s.corePattern && (
                            <div>
                              <div className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[#8a8f98]">Core Pattern</div>
                              <div className="mt-1 grid gap-2">
                                <pre className="bg-[#1a1d23] text-[#fafaf7] p-2 text-[10px] leading-[1.4] overflow-auto">{s.corePattern.before}</pre>
                                <pre className="bg-[#facc15] text-[#1a1d23] p-2 text-[10px] leading-[1.4] overflow-auto">{s.corePattern.after}</pre>
                              </div>
                            </div>
                          )}
                          {s.quickReference && (
                            <div>
                              <div className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[#8a8f98]">Quick Reference</div>
                              <table className="mt-1 w-full border border-[#e8e9eb] text-[11px]">
                                <thead>
                                  <tr className="bg-[#1a1d23] text-[#fafaf7]">
                                    {s.quickReference.headers.map((h) => (
                                      <th key={h} className="text-left px-2 py-1 font-mono text-[10px] tracking-widest uppercase">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {s.quickReference.rows.map((row, i) => (
                                    <tr key={i} className="border-t border-[#e8e9eb] bg-white">
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
                            <div className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[#8a8f98]">Implementation</div>
                            <p className="text-[11px] leading-[1.5] text-[#3a3f4a] font-mono mt-1 bg-[#fafaf7] border border-[#e8e9eb] p-2">{s.how}</p>
                          </div>
                          {s.commonMistakes && (
                            <div>
                              <div className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[#8a8f98]">Common Mistakes</div>
                              <ul className="mt-1 space-y-1 list-disc pl-4 text-[11px] leading-[1.5] text-[#3a3f4a]">
                                {s.commonMistakes.map((m) => (
                                  <li key={m}>{m}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {s.example && (
                            <div className="bg-[#1a1d23] text-[#fafaf7] p-2 font-mono text-[11px] leading-[1.4]">
                              <span className="text-[#facc15]">Example →</span> {s.example}
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
