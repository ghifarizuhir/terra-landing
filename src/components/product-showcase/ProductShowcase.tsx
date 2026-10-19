import { createContext, useContext, useRef, type ReactNode } from 'react'
import { showcaseChapters, type ShowcaseChapterId, type ShowcasePhase } from '../../data/product-demo'
import ProductWindow from './ProductWindow'
import { useProductShowcase } from './use-product-showcase'

type ShowcaseStateContextValue = {
  activeChapter: ShowcaseChapterId
  step: number
  phase: ShowcasePhase
  selectChapter: (chapter: ShowcaseChapterId) => void
}

const ShowcaseStateContext = createContext<ShowcaseStateContextValue>({
  activeChapter: 'work',
  step: 0,
  phase: 'playing',
  selectChapter: () => {},
})

export const useShowcaseContext = () => useContext(ShowcaseStateContext)

type Props = { children: ReactNode }

export default function ProductShowcase({ children }: Props) {
  const storyRef = useRef<HTMLDivElement>(null)
  const demo = useProductShowcase(storyRef)

  const selectChapter = (chapter: ShowcaseChapterId) => {
    const targetId = showcaseChapters.find((item) => item.id === chapter)!.targetId
    document.getElementById(targetId)?.scrollIntoView({
      behavior: demo.reducedMotion ? 'auto' : 'smooth',
      block: 'center',
    })
    demo.activateChapter(chapter)
  }

  return (
    <ShowcaseStateContext.Provider
      value={{
        activeChapter: demo.activeChapter,
        step: demo.step,
        phase: demo.phase,
        selectChapter,
      }}
    >
      <div className="relative border-b border-neutral-200 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:20px_20px]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        <div className="relative mx-auto grid w-full items-start gap-8 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-14 lg:px-16 lg:pb-24 lg:pt-12">
          <ProductWindow
            className="sticky top-[108px] z-30 order-first self-start md:top-[76px] lg:order-none lg:col-start-2 lg:row-start-1 lg:top-[92px]"
            chapter={demo.activeChapter}
            step={demo.step}
            phase={demo.phase}
            reducedMotion={demo.reducedMotion}
            collapsed={demo.collapsed}
            onSelectChapter={selectChapter}
            onPlaybackToggle={demo.togglePlayback}
            onReplay={demo.replay}
            onToggleCollapsed={demo.toggleCollapsed}
          />
          <div ref={storyRef} className="min-w-0 lg:col-start-1 lg:row-start-1">
            {children}
          </div>
        </div>
      </div>
    </ShowcaseStateContext.Provider>
  )
}
