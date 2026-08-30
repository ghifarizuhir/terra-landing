import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../lib/cn'
import { Siren, ClipboardList, SearchX, GitBranch, BookOpen, TrendingUp, Package, Network, Sparkles, Box } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Siren, ClipboardList, SearchX, GitBranch, BookOpen, TrendingUp, Package, Network,
}

type Props = {
  prefix: string
  title: string
  oneLiner: string
  bullets: string[]
  skills: (string | { name: string })[]
  color: string // bg-* class
  icon: string
}

function lampColor(bg: string) {
  if (bg.includes('red')) return '#ef4444'
  if (bg.includes('purple')) return '#a855f7'
  if (bg.includes('amber')) return '#f59e0b'
  if (bg.includes('indigo')) return '#6366f1'
  if (bg.includes('emerald')) return '#10b981'
  if (bg.includes('blue')) return '#3b82f6'
  if (bg.includes('sky')) return '#0ea5e9'
  if (bg.includes('slate')) return '#475569'
  return '#1a1d23'
}

export default function ManagementCard({ prefix, title, oneLiner, bullets, skills, color, icon }: Props) {
  const Icon = iconMap[icon] ?? Box
  const shouldReduceMotion = useReducedMotion()
  const glow = lampColor(color)

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
      className="group relative flex flex-col bg-[#fafaf7] border border-[#e8e9eb] overflow-hidden"
      style={{ boxShadow: '0 1px 0 rgba(26,29,35,0.06), 0 8px 24px rgba(26,29,35,0.04)' }}
    >
      {/* Andon lamp rail */}
      <div className="h-[3px] w-full" style={{ background: glow }} />
      <div className="p-5">
        {/* Station header: lamp dot + mono ID + station name */}
        <div className="flex items-center gap-2.5 mb-3">
          <span
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{ background: glow, boxShadow: `0 0 10px ${glow}55, 0 0 2px ${glow}` }}
            aria-hidden
          />
          <span className="font-mono text-[11px] tracking-widest font-semibold text-[#1a1d23] bg-[#e8e9eb] px-1.5 py-0.5 rounded-[3px]">{prefix}</span>
          <span className="h-3 w-px bg-[#e8e9eb] shrink-0" />
          <h3 className="font-display text-[13px] font-semibold tracking-widest uppercase leading-none text-[#1a1d23]">{title}</h3>
          <span className="ml-auto h-7 w-7 rounded-[6px] bg-[#1a1d23] text-white grid place-items-center shrink-0">
            <Icon className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* One liner work instruction */}
        <p className="font-display text-[18px] leading-[1.1] tracking-tight text-[#1a1d23] mb-2.5">
          {oneLiner}
        </p>

        {/* Work steps numbered, not bulleted */}
        <ol className="space-y-1.5 mb-4">
          {bullets.slice(0, 3).map((b, i) => (
            <li key={b} className="flex gap-2 text-[12.5px] leading-[1.5] text-[#3a3f4a]">
              <span className="font-mono text-[11px] leading-[1.6] text-[#8a8f98] shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span>{b}</span>
            </li>
          ))}
        </ol>

        {/* Andon call skill badges as lamp calls */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#e8e9eb]">
          {skills.length > 0 ? (
            skills.map((s) => {
              const label = typeof s === 'string' ? s : s.name
              return (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase font-semibold bg-[#1a1d23] text-[#fafaf7] px-2 py-1 rounded-sm"
                >
                  <Sparkles className="h-3 w-3 text-[#f59e0b]" /> {label}
                </span>
              )
            })
          ) : (
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#8a8f98] border border-dashed border-[#8a8f98]/50 px-2 py-1 rounded-sm">
              No cord links to CI
            </span>
          )}
        </div>
      </div>

      {/* Hover: amplify lamp glow via parent group */}
      <div
        className="absolute inset-x-0 top-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: glow, boxShadow: `0 0 14px ${glow}` }}
      />
    </motion.div>
  )
}
