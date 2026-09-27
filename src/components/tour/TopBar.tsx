import Mark from '../Mark'
import { chapters } from '../../data/tour'
import { product } from '../../data/product'
import { cn } from '../../lib/cn'

type Props = {
  active: number
  onJump: (chapter: number) => void
}

export default function TopBar({ active, onJump }: Props) {
  return (
    <header className="relative z-20 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border/70 px-4 lg:h-16 lg:px-6">
      <div className="flex items-center gap-3">
        <a
          href="/"
          aria-label="Terraline"
          className="flex items-center gap-2.5 text-ink transition-colors hover:text-brand"
        >
          <Mark className="h-4 w-auto text-brand" />
          <span className="font-display text-[21px] leading-none tracking-[-0.01em]">Terraline</span>
        </a>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
          built on Plane
        </span>
      </div>

      <nav aria-label="Chapters" className="hidden items-center gap-1.5 lg:flex">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onJump(index)}
            aria-label={`Chapter ${index + 1} of ${chapters.length}: ${chapter.title}`}
            aria-current={index === active ? 'step' : undefined}
            title={`${chapter.number} · ${chapter.title}`}
            className={cn(
              'group relative h-6 px-0.5',
              'after:absolute after:left-1/2 after:top-1/2 after:h-[3px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:transition-all after:duration-300',
              index === active
                ? 'after:w-7 after:bg-brand'
                : index < active
                  ? 'after:w-3.5 after:bg-ink/35 group-hover:after:bg-ink/60'
                  : 'after:w-3.5 after:bg-border group-hover:after:bg-muted',
            )}
          />
        ))}
      </nav>

      <div className="flex items-center gap-3 lg:gap-5">
        <a
          href="/learn"
          className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink sm:block"
        >
          Learn
        </a>
        <a
          href={product.cta.href}
          className="flex h-8 items-center gap-1.5 rounded-full bg-brand-strong px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-brand lg:h-9 lg:px-4"
        >
          Request access
        </a>
      </div>
    </header>
  )
}
