import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}
export default function JourneyLoop() {
  const isMobile = useIsMobile()
  const prefersReduced = usePrefersReducedMotion()
  const cycle = managements.filter(m => m.lane === 'cycle').sort((a,b)=>a.order-b.order)
  const parallel = managements.filter(m => m.lane === 'parallel')
  const foundation = managements.filter(m => m.lane === 'foundation')
  const motionProps = prefersReduced ? {} : { initial: { opacity: 0, y: 8 } as const, whileInView: { opacity: 1, y: 0 } as const, viewport: { once: true } as const, transition: { duration: 0.3 } as const }
  if (isMobile) {
    return (
      <section id="journey" className="max-w-7xl mx-auto px-6 py-10 overflow-x-hidden">
        <h2 className="text-2xl font-bold mb-6">Journey Timeline</h2>
        <motion.div {...motionProps} className="relative pl-8 border-l-2 border-zinc-200 space-y-6">
          {[...parallel, ...cycle].sort((a,b)=>a.order-b.order).map(m => (
            <div key={m.id} className="relative">
              <div className={`absolute -left-[33px] top-4 h-4 w-4 rounded-full ${m.color} border-4 border-white shadow`} />
              <ManagementCard {...m} />
            </div>
          ))}
        </motion.div>
        <motion.div {...motionProps} className="mt-10">
          <h3 className="text-sm font-semibold text-zinc-500 mb-3">Foundation — always visible</h3>
          <div className="grid gap-4">
            {foundation.map(m => <ManagementCard key={m.id} {...m} />)}
          </div>
        </motion.div>
      </section>
    )
  }
  return (
    <section id="journey" className="max-w-7xl mx-auto px-6 py-10 overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-2">Journey Timeline</h2>
      <p className="text-sm text-zinc-500 mb-6">Incident → Problem → Change → Knowledge → Improvement — with Request parallel & Service Map + Asset as foundation</p>
      <motion.div {...motionProps} className="mb-6 flex gap-4 flex-wrap">
        {parallel.map(m => (
          <div key={m.id} className="w-[280px] max-w-full"><ManagementCard {...m} /></div>
        ))}
        <div className="text-xs text-zinc-400 self-center">↑ parallel intake (not only via Incident)</div>
      </motion.div>
      <motion.div {...motionProps} className="relative bg-white rounded-3xl border p-8 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
          <path d="M 150 120 L 400 120 L 650 120 L 650 260 L 400 260 L 150 260 Z" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
        <div className="relative grid grid-cols-3 gap-4">
          {cycle.map(m => <ManagementCard key={m.id} {...m} />)}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 text-white text-[10px] font-mono px-3 py-1 rounded-full">entity_links graph</div>
      </motion.div>
      <motion.div {...motionProps} className="mt-6">
        <h3 className="text-sm font-semibold text-zinc-500 mb-3">Foundation</h3>
        <div className="grid grid-cols-2 gap-4">
          {foundation.map(m => <ManagementCard key={m.id} {...m} />)}
        </div>
      </motion.div>
    </section>
  )
}
