import { useState } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { ScanLine, Users, Dumbbell, Trophy, Camera, ArrowRight } from 'lucide-react'

interface Step {
  id: string
  num: number
  title: string
  duration: string
  shortDesc: string
  longDesc: string
  bullets: string[]
  icon: typeof ScanLine
  optional: boolean
  imageBrief: string
  image: string | null
  cta?: { text: string; href: string }
}

const steps: Step[] = [
  {
    id: 'scan',
    num: 1,
    title: 'DEXA Scan',
    duration: '10 min',
    shortDesc: 'Lie down. The scanner maps every gram of muscle, fat, and bone.',
    longDesc:
      'Clinical-grade DEXA scan in our private rooms. You change, you lie down, and 10 minutes later you have the most accurate picture of your body composition that exists.',
    bullets: [
      'Total + regional fat distribution',
      'Lean tissue by limb',
      'Visceral fat (cm²)',
      'Bone density',
    ],
    icon: ScanLine,
    optional: false,
    imageBrief: 'Member lying on the DEXA bed, warm lighting, KALOS signage in frame.',
    image: null,
    cta: { text: 'Book My DEXA Scan', href: 'https://www.livekalos.com/book-now' },
  },
  {
    id: 'analysis',
    num: 2,
    title: 'Expert Analysis',
    duration: '20 min',
    shortDesc: 'A real conversation with your analyst. Not a PDF. Not AI.',
    longDesc:
      'You sit with a Kalos performance analyst (years of coaching and sport-science experience) who walks you through every number on your scan. What it means, what to prioritize, and how it stacks up against your goals.',
    bullets: [
      'Every metric explained in plain English',
      'Personalized priorities for you',
      'Open Q&A',
      'A printout you can take home',
    ],
    icon: Users,
    optional: false,
    imageBrief: 'Analyst + member seated at a table, scan results on screen / printout, both leaning in.',
    image: null,
  },
  {
    id: 'program',
    num: 3,
    title: '4-Week Program',
    duration: 'Optional',
    shortDesc: 'Personalized training and nutrition plan. Rescan at week 4.',
    longDesc:
      'Your analyst builds a 4-week training and nutrition plan based on your scan, goals, and lifestyle. Weekly check-ins keep you on track. You rescan at week 4 to measure real change.',
    bullets: [
      'Custom training program',
      'Nutrition + protein targets',
      'Weekly check-ins',
      '4-week follow-up scan',
    ],
    icon: Dumbbell,
    optional: true,
    imageBrief: 'Member training in a gym (compound lift), coach providing form feedback in background.',
    image: null,
  },
  {
    id: 'coaching',
    num: 4,
    title: 'Long-Term Coaching',
    duration: 'Optional',
    shortDesc: 'Monthly scans, ongoing coaching, compounding results.',
    longDesc:
      'Monthly scans, continuous plan adjustments, and ongoing accountability. This is how our long-term members build lasting change. Your data compounds over time, and so do your results.',
    bullets: [
      'Monthly scans',
      'Ongoing coaching + check-ins',
      'Plan adjustments based on results',
      'Long-term progress tracked end-to-end',
    ],
    icon: Trophy,
    optional: true,
    imageBrief: 'Long-term member showing visible composition change OR coach + member reviewing month-over-month progress.',
    image: null,
    cta: { text: 'Explore Results', href: '#results' },
  },
]

export default function JourneyTimeline() {
  const headRef = useFadeIn()
  const timelineRef = useFadeIn()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = steps[activeIndex]

  return (
    <section id="journey" className="bg-cream-light py-24 md:py-32 border-t border-warm-border">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div ref={headRef} className="text-center mb-14 max-w-[760px] mx-auto">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            The journey
          </p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            Your path with Kalos
          </h2>
          <p className="text-[16px] text-text-secondary mt-5 leading-[1.7]">
            Everyone starts the same way: a scan and a conversation. Where you go from there is up to you.
          </p>
        </div>

        <div ref={timelineRef}>
          {/* ── Horizontal stepper (desktop) ──────────────────────── */}
          <div className="hidden md:block">
            <div className="relative max-w-[1000px] mx-auto mb-16">
              {/* Connecting line, solid under steps 1-2, dashed under steps 3-4 */}
              <div className="absolute top-7 left-[calc(12.5%)] right-[calc(12.5%)] flex items-center" aria-hidden="true">
                {/* solid segment 1→2 */}
                <div className="h-[2px] flex-1 bg-accent/40" />
                {/* fork label between 2 and 3 */}
                <div className="px-4 shrink-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-tertiary whitespace-nowrap">
                    Choose your path →
                  </p>
                </div>
                {/* dashed segment 3→4 */}
                <div
                  className="h-[2px] flex-1"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, currentColor 50%, transparent 50%)',
                    backgroundSize: '8px 2px',
                    color: 'rgba(255,255,255,0.18)',
                  }}
                />
              </div>

              {/* Step circles */}
              <div className="grid grid-cols-4 relative">
                {steps.map((step, i) => {
                  const isActive = activeIndex === i
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveIndex(i)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className="flex flex-col items-center text-center cursor-pointer group focus:outline-none"
                    >
                      <div
                        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-accent text-white shadow-[0_4px_16px_rgba(74,74,244,0.4)] scale-110'
                            : step.optional
                              ? 'bg-cream border-2 border-dashed border-text-tertiary/40 text-text-tertiary group-hover:border-accent/50 group-hover:text-accent'
                              : 'bg-cream border-2 border-warm-border text-text-tertiary group-hover:border-accent/50 group-hover:text-accent'
                        }`}
                      >
                        <span className="text-[15px] font-heading font-bold">
                          {step.num}
                        </span>
                      </div>
                      <p
                        className={`mt-4 text-[14px] font-bold leading-tight transition-colors duration-300 ${
                          isActive ? 'text-text-primary' : 'text-text-tertiary'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p
                        className={`mt-1 text-[11px] uppercase tracking-[0.1em] font-semibold transition-colors duration-300 ${
                          isActive
                            ? 'text-accent'
                            : step.optional
                              ? 'text-text-tertiary/70'
                              : 'text-text-tertiary/70'
                        }`}
                      >
                        {step.duration}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Mobile vertical stepper (just the labels, content panel below shows the active one) ── */}
          <div className="md:hidden mb-8">
            <div className="flex justify-between items-center gap-2">
              {steps.map((step, i) => {
                const isActive = activeIndex === i
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveIndex(i)}
                    className="flex-1 flex flex-col items-center text-center focus:outline-none cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-accent text-white'
                          : step.optional
                            ? 'bg-cream border-2 border-dashed border-text-tertiary/40 text-text-tertiary'
                            : 'bg-cream border-2 border-warm-border text-text-tertiary'
                      }`}
                    >
                      <span className="text-[13px] font-heading font-bold">{step.num}</span>
                    </div>
                    <p className={`mt-2 text-[10px] font-bold leading-tight ${isActive ? 'text-text-primary' : 'text-text-tertiary'}`}>
                      {step.title}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Detail panel (swaps based on active step) ─────────── */}
          <div
            key={active.id}
            className="bg-white rounded-3xl border border-warm-border overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] grid md:grid-cols-[1fr_1fr] animate-[fadeIn_400ms_ease]"
          >
            {/* Image (placeholder for now) */}
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px] bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center p-8">
              {active.image ? (
                <img
                  src={active.image}
                  alt={active.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="text-center max-w-[280px]">
                  <Camera size={42} strokeWidth={1} className="mx-auto mb-4 text-text-primary/25" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-primary/45 mb-2">
                    Image placeholder
                  </p>
                  <p className="text-[12px] text-text-primary/40 leading-[1.55]">
                    {active.imageBrief}
                  </p>
                  <p className="text-[10px] text-text-primary/30 mt-3 font-mono">
                    /Journey/{active.id}.jpg
                  </p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <active.icon size={20} className="text-accent" strokeWidth={1.5} />
                </div>
                <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-accent">
                  Step {active.num} · {active.duration}
                </span>
                {active.optional && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-tertiary border border-text-tertiary/30 px-2 py-0.5 rounded-full">
                    Optional
                  </span>
                )}
              </div>

              <h3 className="text-[28px] md:text-[32px] font-heading font-bold text-text-primary leading-[1.15] mb-4">
                {active.title}
              </h3>

              <p className="text-[16px] text-text-secondary leading-[1.7] mb-6">
                {active.longDesc}
              </p>

              <ul className="space-y-2 mb-8">
                {active.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[14px] text-text-secondary leading-[1.6]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              {active.cta && (
                <div className="mt-auto">
                  <a
                    href={active.cta.href}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white text-[14px] font-semibold rounded-full hover:bg-accent-hover transition-colors duration-200 shadow-[0_2px_12px_rgba(74,74,244,0.3)]"
                  >
                    {active.cta.text}
                    <ArrowRight size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </section>
  )
}
