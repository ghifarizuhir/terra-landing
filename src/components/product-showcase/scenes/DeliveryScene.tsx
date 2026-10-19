import { motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function DeliveryScene({ step, reducedMotion }: TSceneProps) {
  const completed = productDemo.delivery.completed + (step >= 1 ? 1 : 0)
  const pct = Math.round((completed / productDemo.delivery.total) * 100)

  return (
    <section aria-label="Cycle progress and mobile update" className="space-y-3 text-white">
      <div className="rounded-xl border border-white/[0.07] bg-[#12161f]/90 p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Active cycle</span>
            <h3 className="mt-0.5 text-sm font-medium text-white">{productDemo.delivery.cycle}</h3>
          </div>
          <span className="rounded bg-sky-500/15 px-2 py-0.5 font-mono text-[11px] text-sky-300">
            {pct}%
          </span>
        </div>

        <p className="mt-2.5 text-xs text-neutral-300">
          {completed} of {productDemo.delivery.total} work items complete
        </p>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.07]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
            initial={false}
            animate={{ width: `${(completed / productDemo.delivery.total) * 100}%` }}
            transition={{ duration: reducedMotion ? 0 : 0.55 }}
          />
        </div>
      </div>

      {step >= 2 && (
        <div className="grid grid-cols-[1fr_auto] items-stretch gap-3">
          <div className="flex flex-col justify-between rounded-xl border border-white/[0.07] bg-[#12161f]/90 p-3 text-xs">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">Activity stream</span>
              <p className="mt-1.5 font-medium text-neutral-100">{productDemo.delivery.update}</p>
            </div>
            <p className="mt-3 font-mono text-[10px] text-neutral-400">Synced across desktop & mobile web</p>
          </div>

          <div
            role="region"
            aria-label="Mobile work item"
            className="w-32 rounded-2xl border-2 border-neutral-600/80 bg-[#0d1017] p-2.5 text-[10px] shadow-lg"
          >
            <p className="font-mono text-[9px] text-neutral-400">9:41 · TERRA-42</p>
            <p className="mt-2 font-medium leading-tight text-white">{productDemo.workItem.title}</p>
            <p className="mt-2 rounded bg-sky-500/20 px-1.5 py-1 font-mono text-[9px] text-sky-300">
              {productDemo.workItem.toState}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
