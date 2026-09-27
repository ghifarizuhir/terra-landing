import type { Feature } from '../data/product'
import ScreenshotFrame from './ScreenshotFrame'

type Props = { feature: Feature; index: number }

export default function FeatureBlock({ feature, index }: Props) {
  const flip = index % 2 === 1
  const [main, ...rest] = feature.screenshots

  return (
    <article className="grid items-center gap-8 lg:grid-cols-2">
      <div className={flip ? 'lg:order-2' : ''}>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{feature.eyebrow}</p>
        <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.01em] text-ink">{feature.title}</h3>
        <p className="mt-3 text-[14px] leading-[1.7] text-muted">{feature.body}</p>
        <ul className="mt-4 space-y-2">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-[13px] leading-[1.6] text-muted">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <div className={`space-y-3 ${flip ? 'lg:order-1' : ''}`}>
        <ScreenshotFrame {...main} />
        {rest.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {rest.map((s) => (
              <ScreenshotFrame key={s.src} {...s} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
