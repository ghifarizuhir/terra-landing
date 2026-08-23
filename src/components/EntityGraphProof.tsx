export default function EntityGraphProof() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="rounded-3xl bg-zinc-900 text-white p-8">
        <h2 className="text-xl font-bold mb-2">Anything can link to anything</h2>
        <p className="text-sm text-zinc-400 mb-6">entity_links with 5 relations: parent · depends_on · relates_to · caused_by · resolved_by — plus comments, timeline, versions, reviews, attachments.</p>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {['INC-202501-003 —caused_by→ PRB-202501-001', 'PRB →resolved_by→ CHG-202501-002', 'CHG →relates_to→ KB-202501-010', 'INC —depends_on→ CI-001'].map(e => (
            <span key={e} className="bg-white/10 px-3 py-1.5 rounded-full">{e}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
