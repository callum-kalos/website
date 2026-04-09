import { useFadeIn } from '../hooks/useFadeIn'
import { ScanLine, Users, Compass } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: ScanLine,
    title: 'Scan',
    time: '10 minutes',
    description: 'Lie down. The DEXA scanner maps every gram of muscle, fat, and bone in your body. Clinical-grade precision in 6 minutes.',
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
    description: 'Some people leave with clarity and a plan. Others want us to build the plan and hold them accountable. Both paths are right.',
  },
]

/**
 * VERSION B: Full-width background video with steps overlaid horizontally.
 */
export default function HowItWorksB() {
  const headRef = useFadeIn()
  const gridRef = useFadeIn('stagger')

  return (
    <section id="how-it-works-b" className="relative overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
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

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 py-28 md:py-36">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div ref={headRef} className="text-center mb-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">How it works</p>
            <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-white leading-[1.1]">
              Your first 30 minutes with us
            </h2>
          </div>

          <div ref={gridRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-10 lg:p-12 border border-white/10 hover:-translate-y-1 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <step.icon size={24} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-widest text-white/40">
                    Step {step.num}
                  </span>
                </div>
                <h3 className="text-[26px] md:text-[28px] font-heading font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[13px] font-semibold text-accent mb-5">{step.time}</p>
                <p className="text-[15px] text-white/65 leading-[1.75]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
