import { product } from '../data/product'

export default function CompareCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {product.comparisons.map((comparison) => (
        <article key={comparison.title} className="rounded-lg border border-border bg-white p-6">
          <h3 className="text-[17px] font-semibold text-ink">{comparison.title}</h3>
          <p className="mt-2 text-[13px] leading-[1.7] text-muted">{comparison.body}</p>
          <ul className="mt-4 space-y-2">
            {comparison.points.map((point) => (
              <li key={point} className="flex gap-2 text-[13px] text-ink">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
