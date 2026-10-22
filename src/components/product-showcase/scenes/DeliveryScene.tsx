import { motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function DeliveryScene({ step, reducedMotion }: TSceneProps) {
  const completed = productDemo.delivery.completed + (step >= 1 ? 1 : 0)
  const pct = Math.round((completed / productDemo.delivery.total) * 100)

  return (
    <section aria-label="Cycle progress and mobile update" className="space-y-3 text-white">
      <div className="rounded-xl border border-white/[0.08] bg-[#101520] p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-white">{productDemo.delivery.cycle}</h3>
            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-slate-300">Active cycle</span>
          </div>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-300">
            {pct}%
          </span>
        </div>

        <p className="mt-2.5 text-xs text-slate-200">
          {completed} of {productDemo.delivery.total} work items complete
        </p>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-emerald-400"
            initial={false}
            animate={{ width: `${(completed / productDemo.delivery.total) * 100}%` }}
            transition={{ duration: reducedMotion ? 0 : 0.55 }}
          />
        </div>
      </div>

      {step >= 2 && (
        <div className="grid grid-cols-[1fr_auto] items-stretch gap-3">
          <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#101520] p-3 text-xs">
            <div>
              <p className="font-semibold text-slate-100">{productDemo.delivery.update}</p>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-wider text-slate-300">Activity stream</span>
            </div>
            <p className="mt-3 font-mono text-[10px] text-slate-300">Synced across desktop & mobile web</p>
          </div>

          <div
            role="region"
            aria-label="Mobile work item"
            className="w-32 rounded-2xl border border-white/15 bg-[#0b0e15] p-2.5 text-[10px] shadow-[0_12px_24px_-8px_rgba(2,6,23,0.75)]"
          >
            <p className="font-mono text-[9px] text-slate-300">9:41 · TERRA-42</p>
            <p className="mt-2 font-semibold leading-tight text-white">{productDemo.workItem.title}</p>
            <p className="mt-2 rounded bg-sky-500/20 px-1.5 py-1 font-mono text-[9px] text-sky-200">
              {productDemo.workItem.toState}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
