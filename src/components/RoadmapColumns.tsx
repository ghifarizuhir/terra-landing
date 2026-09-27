import { product } from '../data/product'

export default function RoadmapColumns() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <article className="rounded-lg border border-border bg-white p-6">
        <h3 className="text-[17px] font-semibold text-ink">Shipped today</h3>
        <ul className="mt-4 space-y-2">
          {product.roadmap.shipped.map((item) => (
            <li key={item} className="flex gap-2.5 text-[13px] text-ink">
              <span className="font-mono text-[13px] text-brand" aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-lg border border-border bg-subtle p-6">
        <h3 className="text-[17px] font-semibold text-ink">Next</h3>
        <ul className="mt-4 space-y-2">
          {product.roadmap.next.map((item) => (
            <li key={item} className="flex gap-2.5 text-[13px] text-muted">
              <span className="font-mono text-[13px]" aria-hidden="true">→</span>
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}
