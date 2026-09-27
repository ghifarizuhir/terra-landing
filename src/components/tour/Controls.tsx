import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Chapter } from '../../data/tour'
import { totalChapters } from '../../data/tour'
import { cn } from '../../lib/cn'

type Props = {
  chapter: Chapter
  chapterIndex: number
  shotIndex: number
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  onShot: (shot: number) => void
  reduced: boolean
}

export default function Controls({
  chapter,
  chapterIndex,
  shotIndex,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onShot,
  reduced,
}: Props) {
  const shots = chapter.beats.length
  const progress = (chapterIndex + (shots > 0 ? (shotIndex + 1) / shots : 1)) / totalChapters

  return (
    <footer className="relative z-20 flex h-14 shrink-0 items-center gap-3 border-t border-border/70 px-4 lg:h-16 lg:gap-5 lg:px-6">
      <div aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-border/40">
        <motion.div
          className="h-full bg-brand"
          initial={false}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: reduced ? 0 : 0.55, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous chapter"
          className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink transition-colors hover:border-brand/60 hover:text-brand disabled:cursor-default disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next chapter"
          className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink transition-colors hover:border-brand/60 hover:text-brand disabled:cursor-default disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {shots > 1 && (
        <div className="flex items-center gap-1.5" role="group" aria-label="Screenshots in this chapter">
          {chapter.beats.map((beat, index) => (
            <button
              key={beat.id}
              type="button"
              onClick={() => onShot(index)}
              aria-label={`Screenshot ${index + 1} of ${shots}`}
              aria-current={index === shotIndex ? 'true' : undefined}
              className={cn(
                'h-1 rounded-full transition-all duration-300',
                index === shotIndex ? 'w-6 bg-brand' : 'w-3 bg-border hover:bg-muted',
              )}
            />
          ))}
        </div>
      )}

      <div className="ml-auto flex items-center gap-5">
        <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted lg:block">
          use ← → to navigate
        </span>
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
          <span className="text-ink">{String(chapterIndex).padStart(2, '0')}</span>
          <span className="mx-1.5 text-border">/</span>
          {String(totalChapters).padStart(2, '0')}
        </span>
      </div>
    </footer>
  )
}
