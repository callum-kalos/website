import { useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { locations, type LocationData } from '../data/locations'

import Navigation from '../components/Navigation'
import LocationHero from '../components/location/LocationHero'
import LocationInfo from '../components/location/LocationInfo'
import LocationGallery from '../components/location/LocationGallery'
import LocationNarrative from '../components/location/LocationNarrative'
import HowItWorksA from '../components/HowItWorksA'
import Reviews from '../components/Reviews'
import Team from '../components/Team'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

/**
 * Shared layout for every Kalos location page. The only thing that changes
 * between locations is the data object pulled from /data/locations.ts.
 *
 * Add a new location:
 *   1. Add an entry to `locations` in /src/data/locations.ts
 *   2. Add a route in main.tsx (or let the :slug param route handle it).
 */
export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>()
  const location: LocationData | undefined = slug
    ? locations[slug as LocationData['slug']]
    : undefined

  // Scroll to top whenever the location slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!location) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <LocationHero location={location} />
      <LocationInfo location={location} />
      <LocationGallery location={location} />
      <HowItWorksA />
      <LocationNarrative location={location} />
      <Reviews
        eyebrow={`${location.city} reviews`}
        headline={`What ${location.city} members are saying`}
      />
      <Team
        eyebrow={`The ${location.city} team`}
        headline="Performance analysts. Not technicians."
        subtitle={`Every scan at our ${location.city} location is interpreted by a Kalos performance analyst with years of coaching and sport-science experience.`}
        analystsOnly
      />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}
