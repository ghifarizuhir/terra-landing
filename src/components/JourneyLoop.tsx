import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { managements } from '../data/managements'
import ManagementCard from './ManagementCard'

function useIsMobile(bp = 1024) {
  const [m, setM] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(`(max-width: ${bp}px)`)
    const handler = () => setM(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [bp])
  return m
}

export default function JourneyLoop() {
  const isMobile = useIsMobile()
  const shouldReduceMotion = useReducedMotion()
  const cycle = managements.filter((m) => m.lane === 'cycle').sort((a, b) => a.order - b.order)
  const parallel = managements.filter((m) => m.lane === 'parallel')
  const foundation = managements.filter((m) => m.lane === 'foundation')

  // pull cord — which station is pulled (0..cycle.length). -1 = none, 0 = incident pulled etc.
  const [pulled, setPulled] = useState<number>(-1)

  if (isMobile) {
    return (
      <section id="journey" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10 overflow-x-hidden">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-[28px] font-bold tracking-tight uppercase leading-none text-[#1a1d23]">Journey Timeline</h2>
            <p className="mt-1 font-mono text-[11px] tracking-widest uppercase text-[#8a8f98]">Pull the cord — watch the line cascade</p>
          </div>
          <span className="hidden sm:inline-flex font-mono text-[10px] tracking-widest uppercase bg-[#1a1d23] text-[#fafaf7] px-2 py-1">Takt vertical</span>
        </div>

        {/* cord hint */}
        <div className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#8a8f98]">
          <span className="h-px flex-1 bg-[#e8e9eb]" />
          Tap a station to pull cord
          <span className="h-px flex-1 bg-[#e8e9eb]" />
        </div>

        <div className="relative pl-8">
          {/* vertical rail */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#1a1d23]" />
          {/* cord handle */}
          <div
            className="absolute left-[1px] w-[14px] h-[14px] bg-[#facc15] border-2 border-[#1a1d23] rounded-full transition-all"
            style={{ top: pulled >= 0 ? `${(pulled / Math.max(1, cycle.length - 1)) * 78 + 8}%` : '8%' }}
          />

          <div className="space-y-6">
            {[...parallel, ...cycle]
              .sort((a, b) => a.order - b.order)
              .map((m, idx) => {
                const isActive = idx <= pulled
                const lamp =
                  m.color.includes('red') ? '#ef4444' : m.color.includes('amber') ? '#f59e0b' : m.color.includes('emerald') ? '#10b981' : '#8a8f98'
                return (
                  <div key={m.id} className="relative" onClick={() => setPulled(idx)}>
                    <div
                      className="absolute -left-[25px] top-6 h-3 w-3 rounded-full border-2 border-[#fafaf7]"
                      style={{ background: isActive ? lamp : '#e8e9eb', boxShadow: isActive ? `0 0 10px ${lamp}` : 'none' }}
                    />
                    <div className={isActive ? '' : 'opacity-90'}>
                      <ManagementCard {...m} />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-mono text-[11px] tracking-widest uppercase font-semibold text-[#8a8f98] mb-3">Foundation — always visible</h3>
          <div className="grid gap-4">
            {foundation.map((m) => (
              <ManagementCard key={m.id} {...m} />
            ))}
          </div>
          {/* underfloor harness hint */}
          <div className="mt-3 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98] border border-dashed border-[#8a8f98]/30 px-3 py-2 bg-white">
            Underfloor — entity_links harness: parent · depends_on · relates_to · caused_by · resolved_by
          </div>
        </div>
      </section>
    )
  }

  // Desktop — Andon line
  return (
    <section id="journey" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10 overflow-x-hidden">
      <div className="flex items-end justify-between gap-6 mb-2">
        <div>
          <h2 className="font-display text-[32px] font-bold tracking-tight uppercase leading-none text-[#1a1d23]">Journey Timeline</h2>
          <p className="mt-1 text-[13px] leading-[1.5] text-[#3a3f4a] max-w-[60ch]">
            Incident → Problem → Change → Knowledge → Improvement — <span className="font-mono text-[11px] bg-[#e8e9eb] px-1">Request parallel</span> & Service Map + Asset as foundation
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98]">
          <span className="h-2 w-2 rounded-full bg-[#10b981]" /> All green
          <span className="h-2 w-2 rounded-full bg-[#f59e0b]" /> Warning
          <span className="h-2 w-2 rounded-full bg-[#ef4444]" /> Pull
        </div>
      </div>

      {/* Parallel feed — small card feeding into line */}
      <div className="mb-6 flex items-center gap-4">
        <div className="w-[320px] shrink-0">
          {parallel.map((m) => (
            <ManagementCard key={m.id} {...m} />
          ))}
        </div>
        <div className="hidden sm:flex flex-1 items-center gap-3">
          <div className="h-px flex-1 border-t border-dashed border-[#8a8f98]" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#8a8f98] whitespace-nowrap">parallel feed — not only via Incident</span>
          <div className="h-px w-12 bg-[#1a1d23]" />
        </div>
      </div>

      {/* Main Andon line */}
      <div className="relative bg-white border border-[#e8e9eb] overflow-hidden" style={{ boxShadow: '0 1px 0 rgba(26,29,35,0.06)' }}>
        {/* rail */}
        <div className="absolute left-8 right-8 top-[112px] h-[2px] bg-[#1a1d23] hidden lg:block" />
        {/* cord + handle */}
        <div className="absolute left-8 right-8 top-[112px] h-[2px] hidden lg:block">
          <motion.div
            drag={shouldReduceMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              const w = 900
              const idx = Math.round(((info.point.x - 80) / w) * (cycle.length - 1))
              setPulled(Math.max(-1, Math.min(cycle.length - 1, idx)))
            }}
            className="absolute -top-[7px] h-[16px] w-[28px] bg-[#facc15] border-2 border-[#1a1d23] cursor-grab active:cursor-grabbing hidden lg:flex items-center justify-center"
            style={{ left: pulled >= 0 ? `${(pulled / Math.max(1, cycle.length - 1)) * 100}%` : '0%' }}
            animate={shouldReduceMotion ? {} : { x: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <span className="h-1 w-3 bg-[#1a1d23] rounded-full" />
          </motion.div>
        </div>

        {/* station labels on rail */}
        <div className="hidden lg:flex justify-between px-8 pt-4 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98]">
          <span>Station 01 — takt 1</span>
          <button onClick={() => setPulled(-1)} className="underline underline-offset-2 decoration-dotted">
            Reset cord
          </button>
          <span>Tap lamp to pull</span>
        </div>

        <div className="relative grid grid-cols-5 gap-px bg-[#e8e9eb] p-px mt-2 lg:mt-0">
          {cycle.map((m, idx) => {
            const isPulled = idx === pulled
            const isBefore = idx < pulled
            const lampColor =
              m.color.includes('red') ? '#ef4444' : m.color.includes('purple') ? '#a855f7' : m.color.includes('amber') ? '#f59e0b' : m.color.includes('indigo') ? '#6366f1' : '#10b981'
            const state = isPulled ? 'pull' : isBefore ? 'hold' : 'green'
            return (
              <button
                key={m.id}
                onClick={() => setPulled(idx)}
                className="text-left bg-[#fafaf7] p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-inset"
              >
                {/* lamp header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#e8e9eb] bg-white">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#8a8f98]">0{idx + 1}</span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: state === 'green' ? '#10b981' : state === 'hold' ? '#f59e0b' : lampColor,
                      boxShadow: state !== 'green' ? `0 0 10px ${lampColor}88` : 'none',
                    }}
                  />
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold" style={{ color: state === 'pull' ? lampColor : '#8a8f98' }}>
                    {state}
                  </span>
                </div>
                <ManagementCard {...m} />
              </button>
            )
          })}
        </div>

        {/* underfloor harness */}
        <div className="bg-[#1a1d23] text-[#fafaf7] px-4 py-2 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
          <span className="text-white/60">Underfloor harness</span>
          <span className="h-3 w-px bg-white/20" />
          <span className="bg-white/10 px-2 py-1">entity_links</span>
          <span className="hidden sm:inline text-white/40">parent · depends_on · relates_to · caused_by · resolved_by</span>
          <span className="ml-auto hidden md:inline text-white/40">entity_links graph — anything can link to anything</span>
        </div>

        {/* harness wiring viz — thin lines */}
        <svg className="absolute bottom-[36px] left-0 right-0 h-[20px] w-full pointer-events-none hidden lg:block" viewBox="0 0 1000 20" preserveAspectRatio="none">
          <path d="M 80 10 C 200 2, 350 18, 500 10 S 800 2, 920 10" fill="none" stroke="#3a3f4a" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.6" />
        </svg>
      </div>

      {/* Foundation — underfloor panels */}
      <div className="mt-6">
        <h3 className="font-mono text-[11px] tracking-widest uppercase font-semibold text-[#8a8f98] mb-3">Foundation</h3>
        <div className="grid grid-cols-2 gap-px bg-[#1a1d23] p-px">
          {foundation.map((m) => (
            <div key={m.id} className="bg-[#fafaf7]">
              <ManagementCard {...m} />
            </div>
          ))}
        </div>
        <div className="mt-2 font-mono text-[10px] tracking-widest uppercase text-[#8a8f98]">Asset vs CI — inventory vs graph · linked via <span className="bg-[#1a1d23] text-[#fafaf7] px-1">assets_ext.ci_id</span></div>
      </div>
    </section>
  )
}
