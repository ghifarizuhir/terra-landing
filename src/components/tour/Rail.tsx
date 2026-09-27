import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { Chapter } from '../../data/tour'
import { product } from '../../data/product'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function Rise({
  delay,
  reduced,
  className,
  children,
}: {
  delay: number
  reduced: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -8 }}
      transition={{ delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

type Props = {
  chapter: Chapter
  onStart: () => void
  reduced: boolean
}

export default function Rail({ chapter, onStart, reduced }: Props) {
  const isCover = chapter.kind === 'cover'
  return (
    <aside className="relative z-10 flex max-h-[44dvh] min-h-0 shrink-0 flex-col justify-start overflow-y-auto border-t border-border/70 px-5 py-5 lg:col-start-1 lg:row-start-1 lg:max-h-none lg:h-full lg:justify-center lg:border-r lg:border-t-0 lg:px-10 lg:py-10 xl:px-14">
      <AnimatePresence mode="wait">
        <motion.div
          key={chapter.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.28 }}
        >
          <Rise delay={0} reduced={reduced} className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.18em] text-brand">{chapter.number}</span>
            <span className="h-px w-6 bg-brand/50" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">{chapter.eyebrow}</span>
          </Rise>

          <Rise delay={0.06} reduced={reduced}>
            <h1
              className={
                isCover
                  ? 'mt-4 font-display text-[clamp(34px,4.6vw,66px)] leading-[0.98] tracking-[-0.015em] text-ink lg:mt-5'
                  : 'mt-4 font-display text-[clamp(28px,2.6vw,44px)] leading-[1.02] tracking-[-0.01em] text-ink lg:mt-5'
              }
            >
              {chapter.title}
            </h1>
          </Rise>

          <Rise delay={0.12} reduced={reduced}>
            <p className="mt-3 max-w-[46ch] text-[14.5px] leading-relaxed text-muted lg:mt-4 lg:text-[15px]">{chapter.body}</p>
          </Rise>

          {chapter.kind === 'feature' && (
            <Rise delay={0.18} reduced={reduced}>
              <ul className="mt-5 space-y-2 lg:mt-6 lg:space-y-2.5">
                {chapter.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[13.5px] leading-snug text-ink/85">
                    <span className="mt-[5px] font-mono text-[11px] leading-none text-brand">+</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          )}

          {chapter.kind === 'cover' && (
            <>
              <Rise delay={0.18} reduced={reduced} className="mt-6 flex flex-wrap items-center gap-3 lg:mt-7">
                <a
                  href={chapter.primaryCta.href}
                  className="flex h-11 items-center gap-2 rounded-full bg-brand-strong px-5 text-[14px] font-medium text-white transition-colors hover:bg-brand"
                >
                  {chapter.primaryCta.label}
                </a>
                <button
                  type="button"
                  onClick={onStart}
                  className="group flex h-11 items-center gap-2 rounded-full border border-border px-5 text-[14px] text-ink transition-colors hover:border-brand/60 hover:text-brand"
                >
                  Start the tour
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Rise>
              <Rise delay={0.26} reduced={reduced} className="mt-6 lg:mt-8">
                <ul className="flex flex-nowrap items-center gap-x-2.5 overflow-x-auto font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted [scrollbar-width:none] lg:flex-wrap lg:gap-y-1.5 lg:overflow-visible">
                  {product.facts.map((fact, index) => (
                    <li key={fact} className="flex shrink-0 items-center gap-2.5">
                      {index > 0 && <span className="text-brand/50">/</span>}
                      {fact}
                    </li>
                  ))}
                </ul>
              </Rise>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </aside>
  )
}
