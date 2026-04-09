import { useFadeIn } from '../hooks/useFadeIn'
import { Activity, Heart, Dumbbell, Bone, Scale, ArrowLeftRight } from 'lucide-react'

const metrics = [
  { icon: Activity, title: 'Body Fat %', desc: 'Total and regional fat distribution' },
  { icon: Heart, title: 'Visceral Fat', desc: 'Hidden fat around your organs' },
  { icon: Dumbbell, title: 'Lean Tissue', desc: 'Muscle by arms, legs, and trunk' },
  { icon: Scale, title: 'ALMI', desc: 'Muscle mass relative to height' },
  { icon: Bone, title: 'Bone Density', desc: 'Full skeletal bone map' },
  { icon: ArrowLeftRight, title: 'Imbalances', desc: 'Side-to-side asymmetries' },
]

export default function ScanExperience() {
  const headRef = useFadeIn()
  const gridRef = useFadeIn('stagger')

  return (
    <section className="bg-cream-light py-16 md:py-20">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Your first Kalos DEXA scan</p>
          <h2 className="text-[32px] md:text-[40px] font-heading font-bold text-text-primary leading-[1.1]">
            From data to direction. Fast.
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {metrics.map((m) => (
            <div
              key={m.title}
              className="bg-white rounded-2xl border border-warm-border p-5 text-center hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center mx-auto mb-3">
                <m.icon size={18} className="text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-[14px] font-bold mb-1">{m.title}</h3>
              <p className="text-[12px] text-text-tertiary leading-[1.5]">{m.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[14px] italic text-text-tertiary mt-10 leading-[1.6]">
          Every number is explained in person by your Kalos analyst. Not emailed. Not left for you to Google.
        </p>
      </div>
    </section>
  )
}
