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

type Props = {
  hero?: ReactNode
  children: ReactNode
}

export default function ProductShowcase({ hero, children }: Props) {
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
      <div className="relative border-b border-[#dcd8ce]">
        <div
          ref={storyRef}
          className="relative mx-auto grid w-full max-w-[1440px] items-start gap-8 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 lg:px-14 lg:pb-24 lg:pt-14 xl:gap-16"
        >
          {hero && (
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              {hero}
            </div>
          )}

          <ProductWindow
            className="sticky top-[104px] z-30 self-start md:top-[76px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:top-[92px]"
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

          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            {children}
          </div>
        </div>
      </div>
    </ShowcaseStateContext.Provider>
  )
}
