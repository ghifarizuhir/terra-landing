import { motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function GalileoScene({ step, reducedMotion }: TSceneProps) {
  const assistant = productDemo.assistant
  return (
    <section
      aria-label="Work item with Galileo"
      className="grid min-h-[250px] gap-3 sm:grid-cols-[1.05fr_0.95fr]"
    >
      {/* Left: Work item & runbook context */}
      <div className="flex flex-col justify-between rounded-xl border border-white/[0.07] bg-[#12161f]/90 p-3.5 text-sm">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="rounded bg-sky-500/15 px-2 py-0.5 font-mono text-[10px] text-sky-300">
              {productDemo.workItem.id}
            </span>
            <span className="font-mono text-[10px] text-neutral-400">Incident · API Gateway</span>
          </div>
          <h3 className="mt-3 text-[15px] font-medium text-white">{productDemo.workItem.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-neutral-400">
            Upstream p99 latency crossed 850ms on ingress workers. Linked runbook attached for checkout impact check.
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">Attached page</p>
          <p className="mt-1 text-xs font-medium text-neutral-200">SOP-14 · Gateway failover & drain</p>
        </div>
      </div>

      {/* Right: Galileo Assistant Sidebar */}
      <div className="flex flex-col justify-between rounded-xl border border-white/[0.09] bg-[#0e121a] p-3.5 text-xs">
        <div>
          <h3 className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 font-mono text-[11px] text-neutral-200">
            <span>✦ Galileo · Context: {productDemo.workItem.id}</span>
            <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-neutral-400">Grounded</span>
          </h3>

          {step >= 1 && (
            <div className="mt-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">Operator prompt</span>
              <p className="mt-1 rounded-lg border border-white/[0.07] bg-white/[0.04] px-2.5 py-2 text-neutral-200">
                {assistant.prompt}
              </p>
            </div>
          )}

          {step === 1 && (
            <p role="status" className="mt-3 font-mono text-[11px] text-sky-300">
              Galileo is drafting a response…
            </p>
          )}

          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.35 }}
              className="mt-3 rounded-lg border border-sky-500/30 bg-sky-500/[0.08] p-2.5 text-neutral-100"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-sky-300">Drafted summary</span>
              <p className="mt-1 leading-relaxed">{assistant.response}</p>
            </motion.div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2 font-mono text-[9px] text-neutral-500">
          <span>Recipe: Daily incident digest</span>
          <span>08:00 UTC</span>
        </div>
      </div>
    </section>
  )
}
