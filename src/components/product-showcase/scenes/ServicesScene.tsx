import { AnimatePresence, motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function ServicesScene({ step, reducedMotion }: TSceneProps) {
  const graphVisible = step >= 1
  const duration = reducedMotion ? 0 : 0.45
  return (
    <section aria-label="Service catalog" className="space-y-3 text-white">
      {/* Sub-toolbar */}
      <div className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.08] bg-[#101520] px-3 py-2 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">Catalog</span>
          <span className="rounded bg-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-white">
            {graphVisible ? 'Dependency graph' : 'Service registry'}
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-300">
          {step >= 2 ? '1 impacted path' : 'All dependencies mapped'}
        </span>
      </div>

      <div className="min-h-[224px] rounded-xl border border-white/[0.08] bg-[#101520] p-3.5">
        <AnimatePresence mode="wait" initial={false}>
          {graphVisible ? (
            <motion.div key="graph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration }}>
              <div role="img" aria-label="Service dependency graph" className="relative grid min-h-48 grid-cols-3 items-center gap-3">
                <svg aria-hidden="true" viewBox="0 0 600 160" className="pointer-events-none absolute inset-0 h-full w-full">
                  <motion.path
                    d="M95 80 H300 M300 80 H505"
                    fill="none"
                    stroke={step >= 2 ? '#f59e0b' : '#64748b'}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: reducedMotion || step >= 2 ? 1 : 0 }}
                    animate={{ pathLength: reducedMotion || step >= 2 ? 1 : 0.65 }}
                    transition={{ duration }}
                  />
                </svg>
                {productDemo.services.map((service) => {
                  const impacted = service.id === 'payment-gateway' && step >= 2
                  const healthy = service.health === 'healthy' && !impacted
                  const incidentCount = service.incidents + (impacted ? 1 : 0)
                  return (
                    <div
                      key={service.id}
                      className={`relative z-10 rounded-xl border p-3 text-xs shadow-[0_10px_24px_-8px_rgba(2,6,23,0.75)] ${
                        healthy
                          ? 'border-white/15 bg-[#0b0e15]'
                          : 'border-amber-400/50 bg-[#17130d]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="block truncate font-semibold text-white">{service.name}</span>
                        <span className={`h-2 w-2 shrink-0 rounded-full ${healthy ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      </div>
                      <span className="mt-1.5 block font-mono text-[10px] text-slate-300">
                        {service.status} · {service.criticality}
                      </span>
                      <span className={`mt-2.5 inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        healthy ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/20 text-amber-200'
                      }`}>
                        {healthy ? 'Healthy' : `Degraded · ${incidentCount} incident${incidentCount === 1 ? '' : 's'}`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration }}>
              <div className="grid grid-cols-[1.2fr_4.5rem_5.5rem_6rem] gap-2 border-b border-white/10 pb-2 font-mono text-[10px] uppercase tracking-wider text-slate-300">
                <span>Service</span>
                <span>State</span>
                <span>Tier</span>
                <span>Health</span>
              </div>
              {productDemo.services.map((service) => {
                const impacted = service.id === 'payment-gateway' && step >= 2
                const healthy = service.health === 'healthy' && !impacted
                const incidentCount = service.incidents + (impacted ? 1 : 0)
                return (
                  <div
                    key={service.id}
                    className="grid grid-cols-[1.2fr_4.5rem_5.5rem_6rem] items-center gap-2 border-b border-white/[0.08] py-3 text-xs last:border-b-0"
                  >
                    <span className="font-semibold text-white">{service.name}</span>
                    <span className="font-mono text-[11px] text-slate-300">{service.status}</span>
                    <span className="font-mono text-[11px] text-slate-200">{service.criticality}</span>
                    <span className={`font-mono text-[11px] ${healthy ? 'text-emerald-300' : 'text-amber-300'}`}>
                      {healthy ? 'Healthy' : `Degraded · ${incidentCount} incident${incidentCount === 1 ? '' : 's'}`}
                    </span>
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
