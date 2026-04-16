import { Link } from 'react-router-dom'
import { useFadeIn } from '../hooks/useFadeIn'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { locationsList } from '../data/locations'

export default function Locations() {
  const headRef = useFadeIn()
  const gridRef = useFadeIn('stagger')

  return (
    <section id="locations" className="bg-cream py-28 md:py-36">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Locations</p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            Three locations across the Bay Area
          </h2>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {locationsList.map((loc) => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="group block bg-cream-light rounded-3xl border border-warm-border overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="aspect-[16/10] bg-gradient-to-b from-cream to-cream-dark flex items-center justify-center relative">
                <MapPin size={40} className="text-text-primary/8" />
                {/* PLACEHOLDER: replace with /Locations/<slug>/card.jpg — 16:10 exterior/interior */}
              </div>
              <div className="p-8 lg:p-10">
                <h3 className="text-[22px] font-heading font-bold mb-4">{loc.city}</h3>
                <div className="flex items-start gap-2.5 text-[14px] text-text-secondary mb-2">
                  <MapPin size={15} className="text-text-tertiary shrink-0 mt-0.5" />
                  <span>{loc.address.line1}, {loc.address.cityStateZip}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[14px] text-text-secondary mb-8">
                  <Clock size={15} className="text-text-tertiary shrink-0" />
                  {loc.hours[0]}
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent group-hover:gap-3 transition-all duration-300">
                    Visit {loc.shortName} location <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
