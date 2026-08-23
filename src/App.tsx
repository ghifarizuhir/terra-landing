import Hero from './components/Hero'
import JourneyLoop from './components/JourneyLoop'
import SkillsSection from './components/SkillsSection'
import EntityGraphProof from './components/EntityGraphProof'
import Footer from './components/Footer'
export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Hero />
      <JourneyLoop />
      <SkillsSection />
      <EntityGraphProof />
      <Footer />
    </div>
  )
}
