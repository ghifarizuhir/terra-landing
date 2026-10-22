import { createContext, useContext, useRef, type ReactNode } from 'react'
import { showcaseChapters, type ShowcaseChapterId, type ShowcasePhase } from '../../data/product-demo'
import ProductWindow from './ProductWindow'
import { useProductShowcase } from './use-product-showcase'

type ShowcaseStateContextValue = {
  activeChapter: ShowcaseChapterId
  step: number
  phase: ShowcasePhase
  selectChapter: (chapter: ShowcaseChapterId) => void
  nextChapter: () => void
  prevChapter: () => void
}

const ShowcaseStateContext = createContext<ShowcaseStateContextValue>({
  activeChapter: 'work',
  step: 0,
  phase: 'playing',
  selectChapter: () => {},
  nextChapter: () => {},
  prevChapter: () => {},
})

export const useShowcaseContext = () => useContext(ShowcaseStateContext)

type Props = {
  header?: ReactNode
  children: ReactNode
}

export default function ProductShowcase({ header, children }: Props) {
  const storyRef = useRef<HTMLDivElement>(null)
  const demo = useProductShowcase(storyRef)

  const selectChapter = (chapter: ShowcaseChapterId) => {
    demo.activateChapter(chapter)
  }

  const currentIndex = showcaseChapters.findIndex((item) => item.id === demo.activeChapter)

  const nextChapter = () => {
    const nextIdx = (currentIndex + 1) % showcaseChapters.length
    demo.activateChapter(showcaseChapters[nextIdx]!.id)
  }

  const prevChapter = () => {
    const prevIdx = (currentIndex - 1 + showcaseChapters.length) % showcaseChapters.length
    demo.activateChapter(showcaseChapters[prevIdx]!.id)
  }

  return (
    <ShowcaseStateContext.Provider
      value={{
        activeChapter: demo.activeChapter,
        step: demo.step,
        phase: demo.phase,
        selectChapter,
        nextChapter,
        prevChapter,
      }}
    >
      <div className="relative border-b border-[#dcd8ce] bg-[#efeae0]/55">
        <div
          ref={storyRef}
          className="relative mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 md:py-24 lg:px-14"
        >
          {header && <div className="mb-8">{header}</div>}

          {/* Widescreen Cinema Demo Stage */}
          <ProductWindow
            className="w-full"
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

          {/* Interactive Slide Deck below the stationary demo */}
          <div className="mt-6 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </ShowcaseStateContext.Provider>
  )
}
