import { motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function DeliveryScene({ step, reducedMotion }: TSceneProps) {
  const completed = productDemo.delivery.completed + (step >= 1 ? 1 : 0)
  return (
    <section aria-label="Cycle progress and mobile update" className="rounded-md bg-neutral-950 p-3 text-white">
      <h3 className="text-sm">{productDemo.delivery.cycle}</h3>
      <p className="mt-2 text-xs text-neutral-300">{completed} of {productDemo.delivery.total} work items complete</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded bg-neutral-800">
        <motion.div className="h-full bg-sky-500" initial={false}
          animate={{ width: `${(completed / productDemo.delivery.total) * 100}%` }}
          transition={{ duration: reducedMotion ? 0 : 0.55 }} />
      </div>
      {step >= 2 && (
        <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-3">
          <p className="rounded border border-neutral-700 p-2 text-xs">{productDemo.delivery.update}</p>
          <div role="region" aria-label="Mobile work item" className="w-24 rounded-xl border-2 border-neutral-500 bg-neutral-900 p-2 text-[9px]">
            <p className="text-neutral-400">9:41 · TERRA-42</p>
            <p className="mt-2 font-medium">{productDemo.workItem.title}</p>
            <p className="mt-2 rounded bg-neutral-800 p-1">{productDemo.workItem.toState}</p>
          </div>
        </div>
      )}
    </section>
  )
}
