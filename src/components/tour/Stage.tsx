import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Beat, ShotDirection } from '../../data/tour'
import Hotspot from './Hotspot'

type Size = { w: number; h: number }

const useSize = (ref: React.RefObject<HTMLDivElement | null>): Size => {
  const [size, setSize] = useState<Size>({ w: 0, h: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect
      setSize({ w: Math.round(rect.width), h: Math.round(rect.height) })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return size
}

type Frame = {
  left: number
  top: number
  width: number
  height: number
  scale: number
  originX: number
  originY: number
}

const MARGIN = 0.055
const LABEL_H = 26

const labelWidth = (label: string) => label.length * 10.8 + 54

const originFor = (
  stage: number,
  offset: number,
  extent: number,
  scale: number,
  centre: number,
  visible: number,
) => {
  if (scale === 1 || visible >= 1) return 0.5
  const windowCentre = Math.min(Math.max(centre, visible / 2), 1 - visible / 2)
  const origin = (stage / 2 - offset - windowCentre * extent * scale) / (extent * (1 - scale))
  return Math.min(Math.max(origin, 0), 1)
}

const frameFor = (shot: Beat['shot'], direction: ShotDirection, size: Size): Frame => {
  const aspect = shot.width / shot.height
  const fit = direction.fit ?? 'contain'
  let width: number
  let height: number
  let left: number
  let top: number

  if (fit === 'cover') {
    width = Math.max(size.w, size.h * aspect)
    height = width / aspect
    left = (size.w - width) / 2
    top = (size.h - height) / 2
  } else {
    width = Math.min(size.w, size.h * 0.94 * aspect)
    height = width / aspect
    left = (size.w - width) / 2
    top = (size.h - height) / 2
    if (direction.align === 'right') left = size.w - width - size.w * 0.05
  }

  const spots = direction.hotspots ?? []
  let scale = direction.focus.scale
  let originX = direction.focus.x
  let originY = direction.focus.y

  if (spots.length > 0) {
    const x0 = Math.min(...spots.map((spot) => spot.x)) - MARGIN
    const y0 = Math.min(...spots.map((spot) => spot.y)) - MARGIN
    const x1 = Math.max(...spots.map((spot) => spot.x + spot.w)) + MARGIN
    const y1 = Math.max(...spots.map((spot) => spot.y + spot.h)) + MARGIN
    const unionW = Math.max(0.02, Math.min(1, x1 - x0))
    const unionH = Math.max(0.02, Math.min(1, y1 - y0))

    const padLeft = Math.max(0, ...spots.filter((spot) => spot.labelAlign === 'right').map((spot) => labelWidth(spot.label)))
    const padRight = Math.max(0, ...spots.filter((spot) => spot.labelAlign !== 'right').map((spot) => labelWidth(spot.label)))
    const padTop = spots.some((spot) => spot.side === 'top') ? LABEL_H : 0
    const padBottom = spots.some((spot) => (spot.side ?? 'bottom') === 'bottom') ? LABEL_H : 0

    const byWidth = Math.max(0.1, size.w - padLeft - padRight) / (width * unionW)
    const byHeight = Math.max(0.1, size.h - padTop - padBottom) / (height * unionH)
    const cap = direction.focus.maxScale ?? 1.45
    scale = Math.min(cap, Math.max(1, Math.min(byWidth, byHeight)))

    const ex0 = x0 - padLeft / (width * scale)
    const ex1 = x1 + padRight / (width * scale)
    const ey0 = y0 - padTop / (height * scale)
    const ey1 = y1 + padBottom / (height * scale)

    const visibleW = size.w / (width * scale)
    const visibleH = size.h / (height * scale)
    originX = originFor(size.w, left, width, scale, (ex0 + ex1) / 2, visibleW)
    originY = originFor(size.h, top, height, scale, (ey0 + ey1) / 2, visibleH)
  }

  return { left, top, width, height, scale, originX, originY }
}

type Props = {
  beat: Beat
  reduced: boolean
}

export default function Stage({ beat, reduced }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const size = useSize(ref)
  const { shot, direction } = beat
  const fit = direction.fit ?? 'contain'
  const frame = frameFor(shot, direction, size)
  const ready = size.w > 0 && size.h > 0

  return (
    <div
      ref={ref}
      className="relative min-h-0 flex-1 overflow-hidden lg:col-start-2 lg:row-start-1"
      aria-roledescription="screenshot"
      aria-label={shot.alt}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={beat.id}
          className="absolute"
          style={{
            left: frame.left,
            top: frame.top,
            width: ready ? frame.width : undefined,
            height: ready ? frame.height : undefined,
            transformOrigin: `${frame.originX * 100}% ${frame.originY * 100}%`,
          }}
          initial={{ opacity: 0, scale: reduced ? frame.scale : frame.scale * 0.94 }}
          animate={{ opacity: 1, scale: frame.scale }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={reduced ? 'h-full w-full' : 'drift h-full w-full'}>
            <img
              src={shot.src}
              alt={shot.alt}
              draggable={false}
              className={
                fit === 'contain'
                  ? direction.align === 'right'
                    ? 'h-full w-full rounded-[18px] object-cover ring-1 ring-white/10'
                    : 'h-full w-full object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_3%,black_97%,transparent_100%)]'
                  : 'h-full w-full object-cover'
              }
            />
          </div>
          {direction.hotspots?.map((spot, index) => (
            <Hotspot key={spot.label} spot={spot} index={index} reduced={reduced} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(16,21,24,0.8), transparent 9%), linear-gradient(to top, rgba(16,21,24,0.8), transparent 22%), radial-gradient(130% 110% at 50% 42%, transparent 58%, rgba(16,21,24,0.72) 100%)',
        }}
      />
    </div>
  )
}
