import { Camera } from 'lucide-react'
import { useFadeIn } from '../../hooks/useFadeIn'
import type { LocationData } from '../../data/locations'

interface Props {
  location: LocationData
}

/**
 * Asymmetric photo mosaic inspired by Biograph's SF location page.
 * One large feature tile + four supporting tiles. All tiles render as
 * styled placeholders until real photos land.
 *
 * IMAGE BRIEF — drop these into /public/Locations/<slug>/ and wire up the
 * <img> tags at the spots marked PLACEHOLDER below:
 *
 *   1. feature.jpg (4:5 portrait) — The DEXA scan room. Subject lying on
 *      the bed with an analyst beside them, warm ambient lighting. This
 *      is the money shot — the photo people remember.
 *   2. consultation.jpg (4:3) — An analyst walking a member through their
 *      results on the screen / printout. Two people, leaning in, engaged.
 *   3. lobby.jpg (4:3) — Reception / lounge area. Warm wood, greenery,
 *      daylight. No people or one person reading.
 *   4. exterior.jpg (4:3) — Street-level shot of the building. Signage
 *      visible. Golden hour if possible.
 *   5. detail.jpg (1:1) — A closeup detail shot. Options: a coffee being
 *      poured, a printed scan report on a desk, the DEXA machine close-up,
 *      or an analyst's hands pointing at a chart. Adds texture.
 */
export default function LocationGallery({ location }: Props) {
  const headRef = useFadeIn()
  const gridRef = useFadeIn('stagger')

  const imgs = location.images

  const tiles = [
    {
      aspect: 'aspect-[4/5]',
      span: 'lg:row-span-2 lg:col-span-2',
      label: 'Scan room',
      brief: 'Member on the DEXA bed, analyst alongside. Warm lighting.',
      file: 'feature.jpg',
      src: imgs?.feature,
      objectPosition: 'top',
    },
    {
      aspect: 'aspect-[4/3]',
      span: '',
      label: 'Consultation',
      brief: 'Analyst walking member through their results.',
      file: 'consultation.jpg',
      src: imgs?.consultation,
    },
    {
      aspect: 'aspect-[4/3]',
      span: '',
      label: 'Lobby / lounge',
      brief: 'Reception area. Warm wood, daylight, plants.',
      file: 'lobby.jpg',
      src: imgs?.lobby,
    },
    {
      aspect: 'aspect-[4/3]',
      span: '',
      label: 'Exterior',
      brief: 'Street-level shot of the building with signage.',
      file: 'exterior.jpg',
      src: imgs?.exterior,
    },
    {
      aspect: 'aspect-[4/3]',
      span: '',
      label: 'Detail shot',
      brief: 'Closeup: scan report on desk, coffee, DEXA machine.',
      file: 'detail.jpg',
      src: imgs?.detail,
    },
  ]

  return (
    <section className="bg-cream-light py-24 md:py-32">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="mb-14 max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The space
          </p>
          <h2 className="text-[32px] md:text-[42px] font-heading font-bold text-text-primary leading-[1.1]">
            A look inside {location.city}
          </h2>
          <p className="mt-5 text-[16px] text-text-secondary leading-[1.75]">
            Nothing about a Kalos scan should feel like a doctor's office. Here's
            a closer look at the space you'll actually spend time in.
          </p>
        </div>

        {/* Mosaic grid:
            Mobile: single column.
            Desktop: 4-col grid. Feature tile spans 2x2, supporting tiles fill. */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className={`${tile.span} ${tile.aspect} relative rounded-3xl overflow-hidden bg-cream-dark border border-warm-border group hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-300`}
            >
              {tile.src ? (
                <img
                  src={tile.src}
                  alt={`${tile.label} — Kalos ${location.city}`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  style={tile.objectPosition ? { objectPosition: tile.objectPosition } : undefined}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center p-6">
                  <div className="text-center">
                    <Camera
                      size={36}
                      strokeWidth={1}
                      className="mx-auto mb-3 text-text-primary/20"
                    />
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-primary/40 mb-2">
                      {tile.label}
                    </p>
                    <p className="text-[12px] text-text-primary/35 leading-[1.5] max-w-[220px] mx-auto">
                      {tile.brief}
                    </p>
                    <p className="text-[10px] text-text-primary/25 mt-3 font-mono">
                      /Locations/{location.slug}/{tile.file}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
