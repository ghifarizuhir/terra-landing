import { motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function GalileoScene({ step, reducedMotion }: TSceneProps) {
  const assistant = productDemo.assistant
  return (
    <section aria-label="Work item with Galileo" className="grid min-h-52 grid-cols-2 rounded-md bg-neutral-950 text-white">
      <div className="border-r border-neutral-800 p-3 text-sm">
        <span className="font-mono text-xs text-neutral-400">{productDemo.workItem.id}</span>
        <h3 className="mt-2">{productDemo.workItem.title}</h3>
        <p className="mt-2 text-xs text-neutral-400">Incident · API Gateway</p>
      </div>
      <div className="p-3 text-xs">
        <h3 className="border-b border-neutral-800 pb-2">✦ Galileo · Context: {productDemo.workItem.id}</h3>
        {step >= 1 && <p className="mt-3 rounded bg-neutral-800 p-2">{assistant.prompt}</p>}
        {step === 1 && <p role="status" className="mt-2 text-neutral-400">Galileo is drafting a response…</p>}
        {step >= 2 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.35 }} className="mt-2 rounded bg-neutral-800 p-2">
            {assistant.response}
          </motion.p>
        )}
      </div>
    </section>
  )
}
