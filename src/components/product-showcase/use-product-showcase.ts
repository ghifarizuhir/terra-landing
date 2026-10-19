import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useReducedMotion } from 'motion/react'
import { showcaseChapters, type ShowcaseChapterId, type ShowcasePhase } from '../../data/product-demo'

type TPlayback = { activeChapter: ShowcaseChapterId; step: number; phase: ShowcasePhase; run: number }
type TShowcaseController = TPlayback & {
  collapsed: boolean
  reducedMotion: boolean
  activateChapter: (chapter: ShowcaseChapterId) => void
  replay: () => void
  togglePlayback: () => void
  toggleCollapsed: () => void
}

const STEP_MS = 1000
const configFor = (id: ShowcaseChapterId) => showcaseChapters.find((chapter) => chapter.id === id)!

export function useProductShowcase(storyRef: RefObject<HTMLDivElement | null>): TShowcaseController {
  const reducedMotion = useReducedMotion() ?? false
  const [playback, setPlayback] = useState<TPlayback>(() => ({
    activeChapter: 'work', step: reducedMotion ? configFor('work').steps - 1 : 0,
    phase: reducedMotion ? 'static' : 'playing', run: 0,
  }))
  const [collapsed, setCollapsed] = useState(false)
  const seen = useRef(new Set<ShowcaseChapterId>(['work']))
  const userPaused = useRef(false)
  const hiddenChapter = useRef<ShowcaseChapterId | null>(null)

  const activateChapter = useCallback((chapter: ShowcaseChapterId) => {
    setPlayback((current) => {
      if (current.activeChapter === chapter) return current
      const finalStep = configFor(chapter).steps - 1
      const wasSeen = seen.current.has(chapter)
      if (reducedMotion) {
        seen.current.add(chapter)
        return { activeChapter: chapter, step: finalStep, phase: 'static', run: current.run + 1 }
      }
      if (userPaused.current || document.hidden) return { activeChapter: chapter, step: 0, phase: 'paused', run: current.run + 1 }
      if (wasSeen) return { activeChapter: chapter, step: finalStep, phase: 'complete', run: current.run + 1 }
      seen.current.add(chapter)
      return { activeChapter: chapter, step: 0, phase: 'playing', run: current.run + 1 }
    })
  }, [reducedMotion])

  useEffect(() => {
    const root = storyRef.current
    if (!root) return
    const observer = new IntersectionObserver((entries) => {
      const entry = entries.filter((candidate) => candidate.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]
      const id = entry?.target?.getAttribute?.('data-showcase-chapter') as ShowcaseChapterId | null
      if (id && showcaseChapters.some((chapter) => chapter.id === id)) activateChapter(id)
    }, { rootMargin: '-20% 0px -35% 0px', threshold: [0.25, 0.5, 0.75] })
    root.querySelectorAll('[data-showcase-chapter]').forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [storyRef, activateChapter])

  useEffect(() => {
    if (reducedMotion || playback.phase !== 'playing') return
    const chapter = playback.activeChapter
    const run = playback.run
    const timer = window.setTimeout(() => {
      setPlayback((current) => {
        if (current.activeChapter !== chapter || current.phase !== 'playing' || current.run !== run) return current
        if (current.step >= configFor(chapter).steps - 1) return { ...current, phase: 'complete' }
        return { ...current, step: current.step + 1 }
      })
    }, STEP_MS)
    return () => window.clearTimeout(timer)
  }, [playback.activeChapter, playback.phase, playback.run, playback.step, reducedMotion])

  useEffect(() => {
    if (!reducedMotion) return
    setPlayback((current) => ({ ...current, step: configFor(current.activeChapter).steps - 1, phase: 'static' }))
  }, [reducedMotion])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        setPlayback((current) => {
          if (current.phase !== 'playing') return current
          hiddenChapter.current = current.activeChapter
          return { ...current, phase: 'paused' }
        })
      } else if (hiddenChapter.current) {
        const chapter = hiddenChapter.current
        hiddenChapter.current = null
        if (!userPaused.current) {
          setPlayback((current) => current.phase === 'paused' && current.activeChapter === chapter
            ? { ...current, phase: 'playing' }
            : current)
        }
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  const togglePlayback = useCallback(() => {
    setPlayback((current) => {
      if (current.phase === 'playing') {
        userPaused.current = true
        hiddenChapter.current = null
        return { ...current, phase: 'paused' }
      }
      if (current.phase === 'paused' && !reducedMotion) {
        userPaused.current = false
        seen.current.add(current.activeChapter)
        return { ...current, phase: 'playing' }
      }
      return current
    })
  }, [reducedMotion])

  const replay = useCallback(() => {
    if (reducedMotion) return
    userPaused.current = false
    hiddenChapter.current = null
    setPlayback((current) => {
      seen.current.add(current.activeChapter)
      return { ...current, step: 0, phase: 'playing', run: current.run + 1 }
    })
  }, [reducedMotion])

  return { ...playback, collapsed, reducedMotion, activateChapter, replay, togglePlayback,
    toggleCollapsed: () => setCollapsed((value) => !value) }
}
