import { Play, Pause, RotateCcw, X } from 'lucide-react'
import { showcaseChapters, type ShowcaseChapterId, type ShowcasePhase } from '../../data/product-demo'
import SceneView from './SceneView'

type Props = {
  className?: string
  chapter: ShowcaseChapterId
  step: number
  phase: ShowcasePhase
  reducedMotion: boolean
  collapsed: boolean
  onSelectChapter: (chapter: ShowcaseChapterId) => void
  onPlaybackToggle: () => void
  onReplay: () => void
  onToggleCollapsed: () => void
}

export default function ProductWindow({
  className = '', chapter, step, phase, reducedMotion, collapsed,
  onSelectChapter, onPlaybackToggle, onReplay, onToggleCollapsed,
}: Props) {
  const active = showcaseChapters.find((item) => item.id === chapter)!
  const playbackLabel = phase === 'playing' ? 'Pause animation' : 'Resume animation'

  return (
    <section
      aria-label="Terraline demo workspace"
      data-showcase-phase={phase}
      className={`overflow-hidden rounded-[20px] border border-neutral-800/90 bg-[#0b0d11] text-white shadow-[0_28px_70px_-24px_rgba(0,0,0,0.45)] ring-1 ring-white/5 ${className}`}
    >
      {/* App Window Chrome */}
      <header className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-[#10131a] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div aria-hidden="true" className="hidden items-center gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-xs font-medium tracking-tight text-neutral-100">Terraline Demo</p>
              <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-neutral-300">
                v1.4
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-neutral-400">Demo workspace · Sample data</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-emerald-300">
              {phase === 'playing' ? 'Live sequence' : phase === 'paused' ? 'Paused' : 'Ready'}
            </span>
          </div>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? 'Show product demo' : 'Hide product demo'}
          >
            {collapsed ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <X className="h-3.5 w-3.5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div className={collapsed ? 'hidden lg:block' : ''}>
        <>
          {/* Chapter Tabs */}
          <nav
            aria-label="Product demo chapters"
            className="flex gap-1.5 overflow-x-auto border-b border-white/[0.08] bg-[#0d1016] px-3 py-2"
          >
            {showcaseChapters.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-current={item.id === chapter ? 'step' : undefined}
                onClick={() => onSelectChapter(item.id)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-[11px] font-medium text-neutral-400 transition-all hover:text-neutral-200 aria-[current=step]:border-white/10 aria-[current=step]:bg-white/[0.09] aria-[current=step]:text-white aria-[current=step]:shadow-xs"
              >
                <span className="font-mono text-[9px] text-neutral-500">0{idx + 1}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Scene Canvas */}
          <div className="min-h-[300px] bg-gradient-to-b from-[#0b0d11] to-[#0e1117] p-4 sm:min-h-[340px] sm:p-5">
            <SceneView chapter={chapter} step={step} reducedMotion={reducedMotion} />
          </div>

          {/* Status & Playback Footer */}
          <footer className="flex items-center justify-between gap-3 border-t border-white/[0.08] bg-[#10131a] px-4 py-2.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-300" aria-live="polite">
                {active.label}
              </span>
              <div aria-hidden="true" className="flex items-center gap-1">
                {Array.from({ length: active.steps }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1 rounded-full transition-all ${
                      idx <= step ? 'w-4 bg-sky-400' : 'w-1.5 bg-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {(phase === 'playing' || phase === 'paused') && (
                <button
                  type="button"
                  onClick={onPlaybackToggle}
                  aria-label={playbackLabel}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {phase === 'playing' ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
                </button>
              )}
              <button
                type="button"
                onClick={onReplay}
                disabled={reducedMotion}
                aria-label="Replay scene"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </footer>
        </>
      </div>
    </section>
  )
}
