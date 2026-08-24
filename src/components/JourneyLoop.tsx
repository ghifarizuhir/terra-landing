import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { managements } from '../data/managements'

export default function JourneyLoop() {
  const [open, setOpen] = useState<string | null>(null)
  const active = open ? managements.find((m) => m.id === open) ?? null : null
  const shouldReduceMotion = useReducedMotion()

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
            </div>
            <span className="mt-auto pt-2 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98] shrink-0">Details →</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Foundation hint for tests */}
      <div className="shrink-0 pt-2 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98]">
        <span className="h-px flex-1 bg-[#e8e9eb]" />
        Foundation — always visible · 8 stations · one AI skill each
        <span className="h-px flex-1 bg-[#e8e9eb]" />
      </div>



      {/* Detail modal — AnimatePresence for exit */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 grid place-items-center p-4 bg-[#1a1d23]/60 backdrop-blur-[2px]"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 4 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full max-w-[640px] bg-[#fafaf7] border border-[#1a1d23] overflow-hidden max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="h-[3px] w-full" style={{ background: active.color.replace('bg-', '').includes('red') ? '#ef4444' : active.color.includes('purple') ? '#a855f7' : active.color.includes('amber') ? '#f59e0b' : active.color.includes('indigo') ? '#6366f1' : active.color.includes('emerald') ? '#10b981' : active.color.includes('blue') ? '#3b82f6' : active.color.includes('sky') ? '#0ea5e9' : '#475569' }} />
            <div className="p-6 overflow-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[11px] tracking-widest uppercase font-semibold bg-[#1a1d23] text-[#fafaf7] px-2 py-1">{active.prefix}</span>
                <span className="font-display text-[12px] tracking-widest uppercase font-bold">{active.title}</span>
                <span className="ml-auto font-mono text-[10px] tracking-widest uppercase text-[#8a8f98]">{active.lane}</span>
              </div>
              <h3 className="font-display text-[20px] leading-tight">{active.oneLiner}</h3>
              <div className="mt-4 space-y-2">
                <div className="font-mono text-[11px] tracking-widest uppercase font-semibold">What this management does</div>
                <ol className="space-y-1.5">
                  {active.bullets.map((b, i) => (
                    <li key={b} className="flex gap-2 text-[13px] leading-[1.5] text-[#3a3f4a]">
                      <span className="font-mono text-[11px] text-[#8a8f98]">0{i + 1}</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-5 pt-4 border-t border-[#e8e9eb]">
                <div className="font-mono text-[11px] tracking-widest uppercase font-semibold mb-2">AI skills needed — real skills</div>
                <div className="space-y-3">
                  {active.skills.map((s) => (
                    <div key={s.name} className="border border-[#e8e9eb] bg-white p-3">
                      <div className="font-mono text-[11px] tracking-widest uppercase font-bold bg-[#1a1d23] text-[#fafaf7] inline-block px-2 py-1">{s.name}</div>
                      <div className="mt-2 text-[12.5px] leading-[1.5] text-[#1a1d23] font-medium">{s.what}</div>
                      <div className="mt-1 text-[11px] leading-[1.5] text-[#8a8f98] font-mono">How: {s.how}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="shrink-0 p-3 border-t border-[#e8e9eb] flex justify-end bg-white">
              <button onClick={() => setOpen(null)} className="font-mono text-[11px] tracking-widest uppercase border border-[#1a1d23] px-4 py-2">
                Close
              </button>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
