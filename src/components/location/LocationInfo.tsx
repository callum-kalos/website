import { MapPin, Clock, Car, Train } from 'lucide-react'
import { useFadeIn } from '../../hooks/useFadeIn'
import type { LocationData } from '../../data/locations'

interface Props {
  location: LocationData
}

/**
 * Four-column info strip directly under the hero: Address, Hours, Parking,
 * Transit. Replaces a wall of paragraphs with scannable facts.
 */
export default function LocationInfo({ location }: Props) {
  const ref = useFadeIn('stagger')

  const cards = [
    {
      icon: MapPin,
      label: 'Address',
      lines: [
        location.address.line1,
        ...(location.address.line2 ? [location.address.line2] : []),
        location.address.cityStateZip,
      ],
      footer: location.address.neighborhood,
      link: { href: location.mapsUrl, label: 'Open in Maps →' },
    },
    {
      icon: Clock,
      label: 'Hours',
      lines: location.hours,
      footer: 'Walk-ins welcome with availability.',
    },
    {
      icon: Car,
      label: 'Parking',
      lines: [location.parking],
    },
    {
      icon: Train,
      label: 'Getting here',
      lines: [location.transit],
    },
  ]

  return (
    <section className="bg-cream pt-10 md:pt-14 pb-20 md:pb-24">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {cards.map((c) => (
            <div
              key={c.label}
              className="bg-cream-light rounded-3xl border border-warm-border p-7 lg:p-8 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center">
                  <c.icon size={18} className="text-accent" strokeWidth={1.5} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-tertiary">
                  {c.label}
                </p>
              </div>

              <div className="space-y-1">
                {c.lines.map((line, i) => (
                  <p key={i} className="text-[15px] text-text-primary leading-[1.55]">
                    {line}
                  </p>
                ))}
              </div>

              {c.footer && (
                <p className="mt-3 text-[13px] text-text-tertiary leading-[1.55]">
                  {c.footer}
                </p>
              )}

              {c.link && (
                <a
                  href={c.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[13px] font-semibold text-accent hover:text-accent-hover transition-colors duration-300"
                >
                  {c.link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
