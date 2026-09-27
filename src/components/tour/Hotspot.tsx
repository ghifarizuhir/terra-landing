import { motion } from 'motion/react'
import type { Hotspot as HotspotData } from '../../data/tour'
import { cn } from '../../lib/cn'

type Props = {
  spot: HotspotData
  index: number
  reduced: boolean
}

const corners = [
  'left-0 top-0 border-l border-t',
  'right-0 top-0 border-r border-t',
  'left-0 bottom-0 border-l border-b',
  'right-0 bottom-0 border-r border-b',
]

export default function Hotspot({ spot, index, reduced }: Props) {
  const side = spot.side ?? 'bottom'
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: `${spot.x * 100}%`,
        top: `${spot.y * 100}%`,
        width: `${spot.w * 100}%`,
        height: `${spot.h * 100}%`,
      }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.965 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
      transition={{ delay: reduced ? 0 : 0.45 + index * 0.16, duration: reduced ? 0 : 0.6, ease: 'easeOut' }}
    >
      <span className="absolute inset-0 rounded-[3px] border border-brand/25 bg-brand/5" />
      {corners.map((position) => (
        <span key={position} className={cn('absolute h-2.5 w-2.5 border-brand', position)} />
      ))}
      <span
        className={cn(
          'absolute flex items-center gap-2 whitespace-nowrap',
          side === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2',
          spot.labelAlign === 'right' ? 'right-0 flex-row-reverse' : 'left-0',
        )}
      >
        <span className="hairline h-px w-5 bg-brand" />
        <span className="rounded-full border border-brand/40 bg-bg/85 px-2 py-[3px] font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-ink backdrop-blur-sm">
          {spot.label}
        </span>
      </span>
    </motion.div>
  )
}
