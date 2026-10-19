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
    <section aria-label="Terraline demo workspace" data-showcase-phase={phase}
      className={`overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 text-white shadow-xl ${className}`}>
      <header className="flex items-center justify-between border-b border-neutral-800 px-3 py-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium">Terraline Demo</p>
          <p className="text-[10px] text-neutral-400">Demo workspace · Sample data</p>
        </div>
        <button type="button" className="lg:hidden" onClick={onToggleCollapsed}
          aria-label={collapsed ? 'Show product demo' : 'Hide product demo'}>
          {collapsed ? <Play aria-hidden="true" /> : <X aria-hidden="true" />}
        </button>
      </header>
      <div className={collapsed ? 'hidden lg:block' : ''}>
        <>
          <nav aria-label="Product demo chapters" className="flex gap-1 overflow-x-auto border-b border-neutral-800 p-2">
            {showcaseChapters.map((item) => (
              <button key={item.id} type="button" aria-label={item.label}
                aria-current={item.id === chapter ? 'step' : undefined}
                onClick={() => onSelectChapter(item.id)}
                className="shrink-0 rounded px-2 py-1 text-[10px] text-neutral-300 aria-[current=step]:bg-neutral-800 aria-[current=step]:text-white">
                {item.label}
              </button>
            ))}
          </nav>
          <div className="min-h-48 p-3">
            <SceneView chapter={chapter} step={step} reducedMotion={reducedMotion} />
          </div>
          <footer className="flex items-center justify-between border-t border-neutral-800 px-3 py-2">
            <span className="truncate text-[10px] text-neutral-400" aria-live="polite">{active.label}</span>
            <div className="flex shrink-0 gap-2">
              {(phase === 'playing' || phase === 'paused') && (
                <button type="button" onClick={onPlaybackToggle} aria-label={playbackLabel}>
                  {phase === 'playing' ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                </button>
              )}
              <button type="button" onClick={onReplay} disabled={reducedMotion} aria-label="Replay scene">
                <RotateCcw aria-hidden="true" />
              </button>
            </div>
          </footer>
        </>
      </div>
    </section>
  )
}
