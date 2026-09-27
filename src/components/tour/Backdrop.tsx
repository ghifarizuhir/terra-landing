type Point = readonly [number, number]

const ring = (
  cx: number,
  cy: number,
  r: number,
  squash: number,
  wobble: number,
  phase: number,
  steps = 64,
): string => {
  const points: Point[] = Array.from({ length: steps }, (_, i) => {
    const a = (i / steps) * Math.PI * 2
    const rr = r * (1 + wobble * Math.sin(3 * a + phase) + wobble * 0.55 * Math.sin(5 * a - phase * 1.6))
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * squash] as const
  })
  const segment = (i: number) => {
    const p0 = points[(i - 1 + steps) % steps]
    const p1 = points[i]
    const p2 = points[(i + 1) % steps]
    const p3 = points[(i + 2) % steps]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    return `C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)} ${Array.from({ length: steps }, (_, i) => segment(i)).join(' ')} Z`
}

const clusterRight = Array.from({ length: 7 }, (_, i) => ring(660, 520, 150 + i * 92, 0.74, 0.05, i * 0.9))
const clusterLeft = Array.from({ length: 5 }, (_, i) => ring(150, 130, 80 + i * 74, 0.86, 0.06, 1.7 + i * 0.8))

export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 52% at 80% 26%, rgba(91,139,255,0.11), transparent 72%), radial-gradient(46% 44% at 10% 92%, rgba(91,139,255,0.07), transparent 70%)',
        }}
      />
      <svg
        viewBox="0 0 1400 1040"
        className="absolute -bottom-[28%] -right-[16%] w-[min(1180px,86vw)] text-brand"
        fill="none"
      >
        {clusterRight.map((d, i) => (
          <path key={i} d={d} stroke="currentColor" strokeOpacity={0.16 - i * 0.016} strokeWidth={1} />
        ))}
      </svg>
      <svg
        viewBox="0 0 800 640"
        className="absolute -left-[14%] -top-[24%] w-[min(720px,60vw)] text-brand"
        fill="none"
      >
        {clusterLeft.map((d, i) => (
          <path key={i} d={d} stroke="currentColor" strokeOpacity={0.13 - i * 0.017} strokeWidth={1} />
        ))}
      </svg>
      <div className="grain absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(130% 100% at 50% 42%, transparent 52%, rgba(16,21,24,0.92) 100%)' }}
      />
    </div>
  )
}
