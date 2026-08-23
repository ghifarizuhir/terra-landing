import Hero from './components/Hero'
export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Hero />
      <div id="journey" className="max-w-7xl mx-auto px-6 py-8 text-sm text-zinc-500">Journey will render here</div>
    </div>
  )
}
