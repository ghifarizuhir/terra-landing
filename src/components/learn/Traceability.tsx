const items = [
  {
    title: 'Comments & activity',
    body: 'Each record keeps the conversation and the change trail: who moved it, when, and why.',
  },
  {
    title: 'Versions',
    body: 'Descriptions keep their history, so an edit never erases the original wording.',
  },
  {
    title: 'Linked records',
    body: 'Related work stays one hop away: the fix links to the problem, the problem to the knowledge article.',
  },
]

export default function Traceability() {
  return (
    <section id="traceability" className="mx-auto w-full px-5 py-12 sm:px-8 md:py-16 lg:px-16">
      <div className="overflow-hidden rounded-[20px] border border-neutral-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">Traceability</p>
            <h2 className="mt-2 font-display text-[24px] font-medium tracking-[-0.025em] text-black">Why records stay trustworthy</h2>
          </div>
          <p className="max-w-[40ch] text-[13px] leading-[1.6] text-neutral-500">A usable record carries context forward instead of losing it between teams.</p>
        </div>
        <div className="grid divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map((item, index) => (
            <article key={item.title} className="p-5 sm:p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">0{index + 1}</span>
              <h3 className="mt-2 text-[14px] font-semibold tracking-[-0.01em] text-neutral-950">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-neutral-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
