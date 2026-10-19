import { useRef, type ReactNode } from 'react'
import { showcaseChapters, type ShowcaseChapterId } from '../../data/product-demo'
import ProductWindow from './ProductWindow'
import { useProductShowcase } from './use-product-showcase'

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
    <div className="mx-auto grid w-full gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:px-16">
      <ProductWindow
        className="sticky top-[112px] z-30 order-first self-start md:top-[72px] lg:order-none lg:col-start-2 lg:row-start-1 lg:mt-16"
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
  )
}
