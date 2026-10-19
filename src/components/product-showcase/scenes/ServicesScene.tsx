import { AnimatePresence, motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function ServicesScene({ step, reducedMotion }: TSceneProps) {
  const graphVisible = step >= 1
  const duration = reducedMotion ? 0 : 0.45
  return (
    <section aria-label="Service catalog" className="min-h-48 rounded-md bg-neutral-950 p-3 text-white">
      <AnimatePresence mode="wait" initial={false}>
        {graphVisible ? (
          <motion.div key="graph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration }}>
            <div role="img" aria-label="Service dependency graph" className="relative grid min-h-40 grid-cols-3 items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 600 160" className="absolute inset-0 h-full w-full">
                <motion.path d="M95 80 H300 M300 80 H505" fill="none" stroke="#737373" strokeWidth="2"
                  initial={{ pathLength: reducedMotion || step >= 2 ? 1 : 0 }}
                  animate={{ pathLength: reducedMotion || step >= 2 ? 1 : 0.55 }}
                  transition={{ duration }} />
              </svg>
              {productDemo.services.map((service) => {
                const impacted = service.id === 'payment-gateway' && step >= 2
                const healthy = service.health === 'healthy' && !impacted
                const incidentCount = service.incidents + (impacted ? 1 : 0)
                return (
                  <div key={service.id}
                    className={`relative z-10 rounded border border-neutral-700 border-l-2 ${healthy ? 'border-l-emerald-500' : 'border-l-amber-500'} bg-neutral-900 p-2 text-xs`}>
                    <span className="block truncate">{service.name}</span>
                    <span className="mt-1 block text-neutral-400">{service.status} · {service.criticality}</span>
                    <span className={healthy ? 'mt-1 block text-emerald-400' : 'mt-1 block text-amber-400'}>
                      {healthy ? 'Healthy' : `Degraded · ${incidentCount} incident${incidentCount === 1 ? '' : 's'}`}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div key="board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration }}>
            {productDemo.services.map((service) => {
              const impacted = service.id === 'payment-gateway' && step >= 2
              const healthy = service.health === 'healthy' && !impacted
              const incidentCount = service.incidents + (impacted ? 1 : 0)
              return (
                <div key={service.id} className="grid grid-cols-[1fr_5rem_6rem_5rem] gap-2 border-b border-neutral-800 py-2 text-xs">
                  <span>{service.name}</span><span>{service.status}</span><span>{service.criticality}</span>
                  <span className={healthy ? 'text-emerald-400' : 'text-amber-400'}>
                    {healthy ? 'Healthy' : `Degraded · ${incidentCount} incident${incidentCount === 1 ? '' : 's'}`}
                  </span>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
