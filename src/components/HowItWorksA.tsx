import { useFadeIn } from '../hooks/useFadeIn'
import { ScanLine, Users, Compass, Activity, Heart, Dumbbell, Bone, Scale, ArrowLeftRight } from 'lucide-react'

const metrics = [
  { icon: Activity, title: 'Body Fat %', desc: 'Total and regional fat distribution' },
  { icon: Heart, title: 'Visceral Fat', desc: 'Hidden fat around your organs' },
  { icon: Dumbbell, title: 'Lean Tissue', desc: 'Muscle by arms, legs, and trunk' },
  { icon: Scale, title: 'ALMI', desc: 'Muscle mass relative to height' },
  { icon: Bone, title: 'Bone Density', desc: 'Full skeletal bone map' },
  { icon: ArrowLeftRight, title: 'Imbalances', desc: 'Side-to-side asymmetries' },
]

const steps = [
  {
    num: '01',
    icon: ScanLine,
    title: 'Scan',
    time: '10 minutes',
    description: 'Lie down. The DEXA scanner maps every gram of muscle, fat, and bone in your body. Clinical-grade precision in 10 minutes.',
  },
  {
    num: '02',
    icon: Users,
    title: 'Understand',
    time: '20 minutes',
    description: 'Your Kalos analyst sits with you and walks through every number. Not a PDF. Not AI. A real conversation about what your data means.',
  },
  {
    num: '03',
    icon: Compass,
    title: 'Decide',
    time: 'Your call',
    description: 'Some people leave with clarity and a plan. Others want us to build the plan and hold them accountable. Choose the best path for you.',
  },
]

/**
 * VERSION A: Video on the left, steps stacked vertically on the right.
 */
export default function HowItWorksA() {
  const headRef = useFadeIn()
  const contentRef = useFadeIn('stagger')

  return (
    <section id="how-it-works" className="bg-cream py-28 md:py-36">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">How it works</p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            Your first 30 minutes with us
          </h2>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-12 items-stretch">
          {/* Steps stacked vertically */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-cream-light rounded-2xl p-8 border border-warm-border hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <step.icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[22px] font-heading font-bold">{step.title}</h3>
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent bg-accent/8 px-2.5 py-1 rounded-full">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-[15px] text-text-secondary leading-[1.7]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video */}
          <div className="relative rounded-3xl overflow-hidden bg-cream-dark shadow-[0_24px_80px_rgba(0,0,0,0.08)] order-1 lg:order-2">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/Kalos Scan Video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* What your scan measures */}
        <div className="mt-16">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {metrics.map((m) => (
              <div
                key={m.title}
                className="bg-cream-light rounded-2xl border border-warm-border p-5 text-center hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center mx-auto mb-3">
                  <m.icon size={18} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-[14px] font-bold mb-1">{m.title}</h3>
                <p className="text-[12px] text-text-tertiary leading-[1.5]">{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[14px] italic text-text-tertiary mt-8 leading-[1.6]">
            Every number is explained in person by your Kalos analyst. Not emailed. Not left for you to Google.
          </p>
        </div>

        <div className="text-center mt-12">
          <a
            href="#pricing"
            className="inline-flex items-center px-9 py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.25)]"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  )
}
