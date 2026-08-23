import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../lib/cn'
import * as Icons from 'lucide-react'
type Props = { prefix: string; title: string; oneLiner: string; bullets: string[]; skills: string[]; color: string; icon: string }
export default function ManagementCard({ prefix, title, oneLiner, bullets, skills, color, icon }: Props) {
  const Icon = (Icons as any)[icon] ?? Icons.Box
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
      className={cn("rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]", "border-zinc-200")}>
      <div className="flex items-center gap-3 mb-2">
        <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center text-white", color)}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-xs tracking-tight bg-zinc-900 text-white px-2 py-1 rounded">{prefix}</span>
        <h3 className="font-semibold text-zinc-900 text-sm">{title}</h3>
      </div>
      <p className="text-sm text-zinc-600 mb-3">{oneLiner}</p>
      <ul className="text-xs text-zinc-500 list-disc pl-4 space-y-1 mb-3">
        {bullets.map(b => <li key={b}>{b}</li>)}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {skills.map(s => (
          <span key={s} className="inline-flex items-center gap-1 text-[11px] bg-zinc-900 text-white px-2 py-1 rounded-full">
            <Icons.Sparkles className="h-3 w-3" /> {s}
          </span>
        ))}
        {skills.length === 0 && <span className="text-[11px] text-zinc-400">No native skill — links to CI</span>}
      </div>
    </motion.div>
  )
}
