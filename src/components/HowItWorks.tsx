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

export default function HowItWorks() {
  const headRef = useFadeIn()
  const gridRef = useFadeIn('stagger')

  return (
    <section id="how-it-works" className="bg-cream py-28 md:py-36">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">How it works</p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            Your first 30 minutes with us
          </h2>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-cream-light rounded-3xl p-10 lg:p-12 border border-warm-border hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/8 flex items-center justify-center">
                  <step.icon size={24} className="text-accent" strokeWidth={1.5} />
                </div>
                <span className="text-[13px] font-bold uppercase tracking-widest text-text-tertiary">
                  Step {step.num}
                </span>
              </div>
              <h3 className="text-[26px] md:text-[28px] font-heading font-bold mb-2">{step.title}</h3>
              <p className="text-[13px] font-semibold text-accent mb-5">{step.time}</p>
              <p className="text-[16px] text-text-secondary leading-[1.75]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
