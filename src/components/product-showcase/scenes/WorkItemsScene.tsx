import { LayoutGroup, motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

const backgroundCards: Record<string, { id: string; title: string; badge: string }[]> = {
  triage: [{ id: 'TERRA-39', title: 'VPN profile certificate renewal', badge: 'Request' }],
  backlog: [
    { id: 'TERRA-38', title: 'Rotate Redis stream consumer keys', badge: 'Change' },
    { id: 'TERRA-35', title: 'Postgres replica lag runbook review', badge: 'Task' },
  ],
  'in-progress': [{ id: 'TERRA-41', title: 'Upgrade ingress TLS policy', badge: 'Change' }],
}

export default function WorkItemsScene({ step, reducedMotion }: TSceneProps) {
  const duration = reducedMotion ? 0 : 0.45
  const item = productDemo.workItem
  const itemColumn = step >= 2 ? item.toState.toLowerCase().replace(' ', '-') : item.fromState.toLowerCase()
  const columns = [
    { id: 'triage', label: 'Triage', dot: 'bg-amber-400' },
    { id: 'backlog', label: 'Backlog', dot: 'bg-neutral-500' },
    { id: 'in-progress', label: 'In progress', dot: 'bg-sky-400' },
  ]

  return (
    <section aria-label="Work items board" className="space-y-3">
      {/* Sub-toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Queue</span>
          <span className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-neutral-200">Core Platform</span>
          <span className="hidden rounded border border-white/10 px-2 py-0.5 text-[10px] text-neutral-400 sm:inline">
            Typed states enabled
          </span>
        </div>
        <span className="font-mono text-[10px] text-neutral-400">
          {step >= 2 ? 'State: In progress' : step === 1 ? 'Triage check…' : 'Intake accepted'}
        </span>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <LayoutGroup>
          {columns.map((column) => {
            const hasPrimary = column.id === itemColumn
            const extras = backgroundCards[column.id] ?? []
            const count = extras.length + (hasPrimary ? 1 : 0)

            return (
              <div
                key={column.id}
                className="flex min-h-[210px] flex-col rounded-xl border border-white/[0.07] bg-[#12161f]/90 p-2.5"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${column.dot}`} />
                    <h3 className="text-[11px] font-medium text-neutral-200">{column.label}</h3>
                  </div>
                  <span className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-[9px] text-neutral-400">
                    {count}
                  </span>
                </div>

                <div className="mt-2.5 space-y-2">
                  {hasPrimary && (
                    <motion.article
                      layoutId="showcase-incident-card"
                      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-lg border border-sky-500/40 bg-gradient-to-b from-[#1a2232] to-[#151b26] p-2.5 text-xs text-white shadow-md ring-1 ring-sky-400/20"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] text-sky-300">{item.id}</span>
                        <span className="rounded bg-red-500/20 px-1.5 py-0.5 font-mono text-[9px] text-red-300">
                          Urgent
                        </span>
                      </div>
                      <p className="mt-1.5 font-medium leading-snug text-white">{item.title}</p>
                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1 border-t border-white/[0.08] pt-2">
                        <span className="inline-block rounded bg-sky-950/90 px-1.5 py-0.5 font-mono text-[9px] text-sky-200">
                          {item.type}
                        </span>
                        <span className="truncate font-mono text-[9px] text-neutral-400">API Gateway</span>
                      </div>
                    </motion.article>
                  )}

                  {column.id === 'triage' && step === 1 && (
                    <p
                      role="status"
                      className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 font-mono text-[10px] text-amber-200"
                    >
                      Reviewing impact…
                    </p>
                  )}

                  {extras.map((card) => (
                    <div
                      key={card.id}
                      aria-hidden="true"
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-[11px] text-neutral-400"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] text-neutral-500">{card.id}</span>
                        <span className="font-mono text-[9px] text-neutral-500">{card.badge}</span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-neutral-300">{card.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </LayoutGroup>
      </div>
    </section>
  )
}
