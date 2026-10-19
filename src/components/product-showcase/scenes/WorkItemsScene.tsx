import { LayoutGroup, motion } from 'motion/react'
import { productDemo } from '../../../data/product-demo'
import type { TSceneProps } from './types'

export default function WorkItemsScene({ step, reducedMotion }: TSceneProps) {
  const duration = reducedMotion ? 0 : 0.45
  const item = productDemo.workItem
  const itemColumn = step >= 2 ? item.toState.toLowerCase().replace(' ', '-') : item.fromState.toLowerCase()
  const columns = [
    { id: 'triage', label: 'Triage' },
    { id: 'backlog', label: 'Backlog' },
    { id: 'in-progress', label: 'In progress' },
  ]

  return (
    <section aria-label="Work items board" className="grid grid-cols-3 gap-2">
      <LayoutGroup>
        {columns.map((column) => (
          <div key={column.id} className="min-h-36 rounded-md bg-neutral-900 p-2">
            <h3 className="text-xs text-neutral-300">{column.label}</h3>
            {column.id === itemColumn && (
              <motion.article
                layoutId="showcase-incident-card"
                transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 rounded border border-neutral-700 bg-neutral-800 p-2 text-xs text-white"
              >
                <span className="font-mono text-neutral-400">{item.id}</span>
                <p className="mt-1">{item.title}</p>
                <span className="mt-2 inline-block rounded bg-blue-950 px-1.5 py-0.5 text-blue-200">{item.type}</span>
              </motion.article>
            )}
            {column.id === 'triage' && step === 1 && <p role="status" className="mt-2 text-[10px] text-neutral-400">Reviewing impact…</p>}
          </div>
        ))}
      </LayoutGroup>
    </section>
  )
}
