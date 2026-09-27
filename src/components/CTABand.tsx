import { product } from '../data/product'

export default function CTABand() {
  return (
    <section className="border-y border-border bg-subtle">
      <div className="mx-auto max-w-[1140px] px-5 py-14 text-center">
        <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-ink sm:text-[28px]">{product.cta.title}</h2>
        <p className="mx-auto mt-3 max-w-[56ch] text-[14px] leading-[1.7] text-muted">{product.cta.body}</p>
        <a
          href={product.cta.href}
          className="mt-6 inline-block rounded-md bg-brand-strong px-6 py-3 text-[14px] font-medium text-white hover:bg-[#2450c8]"
        >
          {product.cta.label}
        </a>
      </div>
    </section>
  )
}
