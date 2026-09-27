import { product } from '../data/product'
import ScreenshotFrame from './ScreenshotFrame'

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1140px] px-5 pt-14 pb-10 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{product.hero.eyebrow}</p>
          <h1 className="mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[42px] lg:text-[50px]">
            {product.hero.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7] text-muted">{product.hero.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={product.hero.primaryCta.href}
              className="rounded-md bg-brand-strong px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#2450c8]"
            >
              {product.hero.primaryCta.label}
            </a>
            <a
              href={product.hero.secondaryCta.href}
              className="rounded-md border border-border px-5 py-2.5 text-[14px] font-medium text-ink hover:border-brand"
            >
              {product.hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <ScreenshotFrame {...product.hero.screenshot} priority />
      </div>
    </section>
  )
}
