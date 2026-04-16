import { ArrowRight, MapPin, Camera } from 'lucide-react'
import type { LocationData } from '../../data/locations'

interface Props {
  location: LocationData
}

/**
 * Dark hero for a single location page. Mirrors the homepage Hero so the
 * transparent Navigation transitions look right.
 *
 * PLACEHOLDER: The background is a dark gradient with an image-placeholder
 * overlay. Replace with a real video or photo — see the inline note for
 * suggested content and filename.
 */
export default function LocationHero({ location }: Props) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {location.images?.hero ? (
          <img
            src={location.images.hero}
            alt={`Kalos ${location.city} clinic`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${location.colorSwatch[0]} 0%, ${location.colorSwatch[1]} 100%)`,
            }}
          >
            <div className="text-white/12 text-center px-8">
              <Camera size={72} className="mx-auto mb-4" strokeWidth={1} />
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2">
                Hero image placeholder
              </p>
              <p className="text-[13px] max-w-md mx-auto leading-relaxed">
                Wide 16:9 shot of the {location.city} clinic.
              </p>
              <p className="text-[11px] mt-3 opacity-70 font-mono">
                /Locations/{location.slug}/hero.jpg
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Darkening overlays so white text is legible */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-[100px] pb-24 mt-auto">
        <div className="flex flex-col items-start text-left max-w-[720px]">
          <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.25em] text-accent mb-5">
            <MapPin size={14} /> {location.eyebrow}
          </p>
          <h1 className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-heading font-bold text-white leading-[1.05] tracking-[-0.02em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            {location.heroHeadline}
          </h1>
          <p className="mt-8 text-[17px] md:text-[19px] text-white/80 leading-[1.75] max-w-[600px]">
            {location.heroSubcopy}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#pricing"
              className="inline-flex items-center px-9 py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.35)]"
            >
              Book a Scan
            </a>
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-white/70 hover:text-white transition-colors duration-300"
            >
              Get Directions <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade to cream so it blends into LocationInfo */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
