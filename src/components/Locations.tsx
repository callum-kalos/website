import { useFadeIn } from '../hooks/useFadeIn'
import { MapPin, Clock } from 'lucide-react'

const locations = [
  {
    name: 'San Francisco',
    address: 'San Francisco, CA',
    hours: 'Mon-Sat 8am-6pm',
  },
  {
    name: 'Palo Alto',
    address: 'Palo Alto, CA',
    hours: 'Mon-Sat 8am-6pm',
  },
  {
    name: 'San Jose (Pruneyard)',
    address: 'San Jose, CA',
    hours: 'Mon-Sat 8am-6pm',
  },
]

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
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="bg-cream-light rounded-3xl border border-warm-border overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="aspect-[16/10] bg-gradient-to-b from-cream to-cream-dark flex items-center justify-center">
                <MapPin size={40} className="text-text-primary/8" />
              </div>
              <div className="p-8 lg:p-10">
                <h3 className="text-[22px] font-heading font-bold mb-4">{loc.name}</h3>
                <div className="flex items-center gap-2.5 text-[14px] text-text-secondary mb-2">
                  <MapPin size={15} className="text-text-tertiary shrink-0" />
                  {loc.address}
                </div>
                <div className="flex items-center gap-2.5 text-[14px] text-text-secondary mb-8">
                  <Clock size={15} className="text-text-tertiary shrink-0" />
                  {loc.hours}
                </div>
                <a
                  href="#"
                  className="block text-center px-8 py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
