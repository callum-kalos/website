import { useFadeIn } from '../../hooks/useFadeIn'
import { Quote } from 'lucide-react'
import type { LocationData } from '../../data/locations'

interface Props {
  location: LocationData
}

/**
 * "Inside the clinic" narrative. Two-column layout: body copy on the left,
 * a pulled quote card on the right. Below, a service-area chip row so
 * people from nearby neighborhoods know this is their clinic.
 */
export default function LocationNarrative({ location }: Props) {
  const headRef = useFadeIn()
  const bodyRef = useFadeIn()
  const quoteRef = useFadeIn()
  const areaRef = useFadeIn('stagger')

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Our philosophy, in {location.city}
          </p>
          <h2 className="text-[32px] md:text-[42px] font-heading font-bold text-text-primary leading-[1.1]">
            {location.narrativeTitle}
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
          <div ref={bodyRef} className="space-y-5">
            {location.narrativeBody.map((para, i) => (
              <p key={i} className="text-[17px] text-text-secondary leading-[1.8]">
                {para}
              </p>
            ))}
          </div>

          <div
            ref={quoteRef}
            className="bg-cream-light rounded-3xl border border-warm-border p-8 lg:p-10 relative"
          >
            <Quote
              size={40}
              className="absolute top-6 right-6 text-accent/12"
              strokeWidth={1}
            />
            <p className="text-[19px] md:text-[20px] font-heading text-text-primary leading-[1.55] italic">
              "{location.narrativeQuote.text}"
            </p>
            <div className="mt-6 pt-6 border-t border-warm-border">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-accent">
                {location.narrativeQuote.attribution}
              </p>
            </div>
          </div>
        </div>

        {/* Service area */}
        <div className="mt-20 pt-16 border-t border-warm-border">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-2">
              Serving members from
            </p>
          </div>
          <div ref={areaRef} className="flex flex-wrap items-center justify-center gap-3">
            {location.serviceArea.map((area) => (
              <span
                key={area}
                className="px-5 py-2.5 rounded-full bg-cream-light border border-warm-border text-[13px] font-semibold text-text-secondary"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
