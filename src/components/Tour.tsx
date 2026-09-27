import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import { chapters, totalChapters } from '../data/tour'
import Backdrop from './tour/Backdrop'
import TopBar from './tour/TopBar'
import Rail from './tour/Rail'
import Stage from './tour/Stage'
import Controls from './tour/Controls'
import WhyChapter from './tour/WhyChapter'
import NextChapter from './tour/NextChapter'

type Pos = { chapter: number; shot: number }

export default function Tour() {
  const [pos, setPos] = useState<Pos>({ chapter: 0, shot: 0 })
  const reduced = useReducedMotion() ?? false
  const chapter = chapters[pos.chapter]
  const beat = chapter.beats[pos.shot] ?? null

  const next = useCallback(() => {
    setPos((current) => {
      const active = chapters[current.chapter]
      if (current.shot < active.beats.length - 1) return { chapter: current.chapter, shot: current.shot + 1 }
      if (current.chapter < chapters.length - 1) return { chapter: current.chapter + 1, shot: 0 }
      return current
    })
  }, [])

  const prev = useCallback(() => {
    setPos((current) => {
      if (current.shot > 0) return { chapter: current.chapter, shot: current.shot - 1 }
      if (current.chapter > 0) {
        const previous = chapters[current.chapter - 1]
        return { chapter: current.chapter - 1, shot: Math.max(0, previous.beats.length - 1) }
      }
      return current
    })
  }, [])

  const jump = useCallback((chapterIndex: number) => setPos({ chapter: chapterIndex, shot: 0 }), [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        next()
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        prev()
      } else if (event.key === 'Home') {
        event.preventDefault()
        setPos({ chapter: 0, shot: 0 })
      } else if (event.key === 'End') {
        event.preventDefault()
        setPos({ chapter: chapters.length - 1, shot: 0 })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => {
    for (const item of chapters) {
      for (const shot of item.beats) {
        const image = new Image()
        image.src = shot.shot.src
      }
    }
  }, [])

  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse') return
    swipeStart.current = { x: event.clientX, y: event.clientY }
  }
  const onPointerUp = (event: ReactPointerEvent) => {
    if (event.pointerType === 'mouse' || !swipeStart.current) return
    const dx = event.clientX - swipeStart.current.x
    const dy = event.clientY - swipeStart.current.y
    swipeStart.current = null
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return
    if (dx < 0) next()
    else prev()
  }

  const canPrev = pos.chapter > 0 || pos.shot > 0
  const canNext = pos.chapter < chapters.length - 1 || pos.shot < chapter.beats.length - 1

  return (
    <div
      className="tour flex h-[100dvh] w-full flex-col overflow-hidden bg-bg text-ink"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Backdrop />
      <TopBar active={pos.chapter} onJump={jump} />
      <p aria-live="polite" className="sr-only">
        {`Chapter ${pos.chapter + 1} of ${totalChapters}: ${chapter.title}`}
      </p>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(330px,33%)_1fr]">
        {chapter.kind === 'why' ? (
          <WhyChapter reduced={reduced} />
        ) : chapter.kind === 'next' ? (
          <NextChapter reduced={reduced} />
        ) : (
          <>
            {beat && <Stage beat={beat} reduced={reduced} />}
            <Rail chapter={chapter} onStart={next} reduced={reduced} />
          </>
        )}
      </main>

      <Controls
        chapter={chapter}
        chapterIndex={pos.chapter}
        shotIndex={pos.shot}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={prev}
        onNext={next}
        onShot={(shot) => setPos((current) => ({ ...current, shot }))}
        reduced={reduced}
      />
    </div>
  )
}
