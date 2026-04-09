import Navigation from './components/Navigation'
import Hero from './components/Hero'
import SocialProofBar from './components/SocialProofBar'
import HowItWorks from './components/HowItWorksA'
import Philosophy from './components/PhilosophyV1'
import Results from './components/Results'
import ProjectionCalculator from './components/ProjectionCalculator'
import DEXAAccuracy from './components/DEXAAccuracy'
import PhysicianEndorsements from './components/PhysicianEndorsements'
import Reviews from './components/Reviews'
import Team from './components/Team'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Locations from './components/Locations'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Navigation />
      <Hero />
      <SocialProofBar />
      <HowItWorks />
      <Philosophy />
      <Results />
      <ProjectionCalculator />
      <DEXAAccuracy />
      <PhysicianEndorsements />
      <Reviews />
      <Team />
      <Pricing />
      <FAQ />
      <Locations />
      <Footer />
    </div>
  )
}
