import PulsePreview from './PulsePreview'
export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-mono bg-zinc-900 text-white px-3 py-1 rounded-full mb-4">TERRA — AI for ITSM</div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-3">One Graph, Not Silos</h1>
        <p className="text-lg text-zinc-600 mb-6">8 managements, one entity graph, AI skills for every step. ITIL4-aligned, built for operators.</p>
        <div className="flex gap-3">
          <a href="#journey" className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium">Explore Journey</a>
          <a href="#skills" className="border border-zinc-300 px-5 py-2.5 rounded-xl text-sm font-medium">View Skills</a>
        </div>
      </div>
      <PulsePreview />
    </section>
  )
}
