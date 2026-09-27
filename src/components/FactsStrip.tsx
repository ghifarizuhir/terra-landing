import { product } from '../data/product'

export default function FactsStrip() {
  return (
    <section aria-label="Platform facts" className="border-y border-border bg-subtle">
      <ul className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 font-mono text-[12px] text-muted">
        {product.facts.map((fact) => (
          <li key={fact} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {fact}
          </li>
        ))}
      </ul>
    </section>
  )
}
