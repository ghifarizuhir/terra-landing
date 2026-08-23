import Hero from './components/Hero'
import JourneyLoop from './components/JourneyLoop'
import SkillsSection from './components/SkillsSection'
export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Hero />
      <JourneyLoop />
      <SkillsSection />
    </div>
  )
}
