import type { ReactNode } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FactsStrip from './components/FactsStrip'
import FeatureBlock from './components/FeatureBlock'
import CompareCards from './components/CompareCards'
import ArchDiagram from './components/ArchDiagram'
import RoadmapColumns from './components/RoadmapColumns'
import CTABand from './components/CTABand'
import Footer from './components/Footer'
import { product } from './data/product'

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-[1140px] px-5 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
      <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-bg text-ink">
      <Nav />
      <main>
        <Hero />
        <FactsStrip />
        <Section id="product" eyebrow="Product tour" title="What you get, on day one">
          <div className="space-y-16">
            {product.features.map((feature, index) => (
              <FeatureBlock key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </Section>
        <div className="border-y border-border bg-white">
          <Section id="why" eyebrow="Why Terraline" title="A service layer on a proven delivery core">
            <CompareCards />
          </Section>
        </div>
        <Section id="architecture" eyebrow="Architecture & operations" title="Built to self-host, built to stay fast">
          <ArchDiagram />
        </Section>
        <div className="border-y border-border bg-white">
          <Section id="roadmap" eyebrow="Roadmap" title="Shipped today, next in line">
            <RoadmapColumns />
          </Section>
        </div>
        <CTABand />
      </main>
      <Footer />
    </div>
  )
}
