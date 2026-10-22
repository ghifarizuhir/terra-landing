import { Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function GalileoScene({ step, reducedMotion }: TSceneProps) {
  const assistant = productDemo.assistant
  return (
    <section
      aria-label="Work item with Galileo"
      className="grid min-h-[260px] gap-3 sm:grid-cols-[1.05fr_0.95fr]"
    >
      {/* Left: Work item & runbook context */}
      <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#101520] p-3.5 text-sm">
        <div>
          <h3 className="text-[15px] font-semibold text-white">{productDemo.workItem.title}</h3>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="rounded bg-sky-500/20 px-2 py-0.5 font-mono text-[10px] text-sky-200">
              {productDemo.workItem.id}
            </span>
            <span className="font-mono text-[10px] text-slate-300">Incident · API Gateway</span>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
            Upstream p99 latency crossed 850ms on ingress workers. Linked runbook attached for checkout impact check.
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-white/[0.08] bg-[#0b0e15] p-2.5">
          <p className="text-xs font-medium text-slate-100">SOP-14 · Gateway failover & drain</p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-300">Attached runbook page</p>
        </div>
      </div>

      {/* Right: Galileo Assistant Sidebar */}
      <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0d111a] p-3.5 text-xs">
        <div>
          <h3 className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[11px] text-slate-100">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
              <span>Galileo · Context: {productDemo.workItem.id}</span>
            </span>
            <span className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[9px] text-slate-300">Grounded</span>
          </h3>

          {step >= 1 && (
            <div className="mt-3">
              <p className="rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-2 text-slate-100">
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
              className="mt-3 rounded-lg border border-sky-400/35 bg-[#122033] p-2.5 text-white"
            >
              <p className="leading-relaxed">{assistant.response}</p>
              <span className="mt-1.5 block font-mono text-[9px] uppercase tracking-wider text-sky-300">Drafted summary</span>
            </motion.div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-2 font-mono text-[9px] text-slate-300">
          <span>Recipe: Daily incident digest</span>
          <span>08:00 UTC</span>
        </div>
      </div>
    </section>
  )
}
