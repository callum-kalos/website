import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFadeIn } from '../hooks/useFadeIn'
import { ArrowLeft, Play, ArrowRight, Check } from 'lucide-react'

/* ─── Data ────────────────────────────────────────────────────────── */

const nutritionPyramid = [
  { pct: '80%', label: 'Quantity', detail: 'Calories, macros, micros' },
  { pct: '16%', label: 'Quality', detail: 'Whole foods vs. processed, lean protein sources, healthy fats, fiber-rich carbs' },
  { pct: '3%', label: 'Timing', detail: 'Protein uptake timing, intermittent fasting, carb cycling' },
  { pct: '1%', label: 'Highly Dependent', detail: 'Ashwagandha, niche supplements' },
]

const exercisePyramid = [
  { pct: '80%', label: 'Consistency', detail: 'Are you going to the gym regularly' },
  { pct: '16%', label: 'Programming', detail: 'Sets, reps, rest periods, exercise order, RIR' },
  { pct: '3%', label: 'Variations', detail: 'Kettlebells vs. dumbbells, tempo, equipment' },
  { pct: '1%', label: 'Highly Dependent', detail: 'Cold plunges, TRT' },
]

const journeySteps = [
  {
    step: '1',
    title: 'Get a DEXA Scan',
    subtitle: 'Entry',
    bullets: [
      'Objective baseline data',
      'Clinical-grade body composition analysis',
      'In-person walkthrough with your analyst',
    ],
  },
  {
    step: '2',
    title: 'Receive a Personalized Protocol',
    subtitle: 'Action',
    bullets: [
      'Personalized readout with your analyst',
      'Metric-based goals set from your DEXA data',
      '4-week trial plan generated',
    ],
  },
  {
    step: '3',
    title: 'Enter a Long-Term Program',
    subtitle: 'Optional',
    bullets: [
      'Annual plans with ongoing coaching',
      '24/7 coach access and accountability',
      'Monthly DEXA scans to track progress',
    ],
  },
]

/* ─── Triangle scroll profiles ───────────────────────────────────── */

const triangleProfiles = [
  {
    aesthetics: 0.3,
    longevity: 0.25,
    performance: 0.2,
    label: 'Where most people start',
    description: 'Limited visibility into body composition. Training without data. No clear picture of what to prioritize or how to measure progress.',
  },
  {
    aesthetics: 0.55,
    longevity: 0.5,
    performance: 0.45,
    label: 'After your first scan cycle',
    description: 'Baseline established. Your analyst identifies the biggest levers. A targeted 4-week plan attacks what matters most for your goals.',
  },
  {
    aesthetics: 0.85,
    longevity: 0.8,
    performance: 0.75,
    label: 'Where Kalos takes you',
    description: 'Expanding toward all three vertices. Scan after scan, your triangle grows. Muscle gained, fat lost, bone density protected, performance climbing.',
  },
]

/* ─── Pyramid visual component ────────────────────────────────────── */

function Pyramid({ title, data }: { title: string; data: typeof nutritionPyramid }) {
  return (
    <div className="bg-white rounded-3xl border border-warm-border p-8 md:p-10">
      <h4 className="text-[18px] font-heading font-bold text-text-primary mb-8 text-center">{title}</h4>
      <div className="flex flex-col items-center gap-3">
        {data.map((tier, i) => {
          const widths = ['40%', '60%', '80%', '100%']
          return (
            <div key={tier.label} className="w-full flex flex-col items-center">
              <div
                className="rounded-2xl px-5 py-4 text-center transition-all duration-300"
                style={{
                  width: widths[i],
                  background: i === 0
                    ? 'var(--color-accent)'
                    : i === 1
                      ? 'color-mix(in srgb, var(--color-accent) 70%, transparent)'
                      : i === 2
                        ? 'color-mix(in srgb, var(--color-accent) 40%, transparent)'
                        : 'color-mix(in srgb, var(--color-accent) 20%, transparent)',
                }}
              >
                <p className={`text-[14px] font-bold ${i <= 1 ? 'text-white' : 'text-text-primary'}`}>
                  {tier.pct} = {tier.label}
                </p>
                <p className={`text-[12px] mt-1 leading-snug ${i <= 1 ? 'text-white/80' : 'text-text-secondary'}`}>
                  {tier.detail}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Interactive Triangle with scroll animation ─────────────────── */

function ScrollTriangle() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = rect.height
      const viewportHeight = window.innerHeight

      // Calculate progress: 0 when section top enters viewport, 1 when section bottom leaves
      const scrolled = viewportHeight - rect.top
      const total = sectionHeight + viewportHeight
      const raw = scrolled / total
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Map progress to profile index (0-2)
  const profileIndex = Math.min(2, Math.floor(progress * 3))

  // Interpolate triangle shape based on progress
  const t = Math.max(0, Math.min(1, progress * 1.5))
  const aesthetics = 0.3 + t * 0.55
  const longevity = 0.25 + t * 0.55
  const performance = 0.2 + t * 0.55

  // Triangle vertices (outer boundary)
  const cx = 200, cy = 200
  const radius = 150
  const topY = cy - radius
  const bottomY = cy + radius * 0.85
  const leftX = cx - radius * 0.87
  const rightX = cx + radius * 0.87

  // Inner shape vertices (scaled by each metric)
  const innerTopY = cy - (cy - topY) * aesthetics
  const innerBottomLeftX = cx - (cx - leftX) * longevity
  const innerBottomLeftY = cy + (bottomY - cy) * longevity
  const innerBottomRightX = cx + (rightX - cx) * performance
  const innerBottomRightY = cy + (bottomY - cy) * performance

  return (
    <div ref={sectionRef} className="min-h-[120vh]">
      <div className="sticky top-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center max-w-[1200px] mx-auto">
          {/* Triangle SVG */}
          <div className="relative w-full max-w-[500px] mx-auto">
            <svg viewBox="0 0 400 400" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer triangle (max potential) */}
              <polygon
                points={`${cx},${topY} ${leftX},${bottomY} ${rightX},${bottomY}`}
                fill="none"
                stroke="var(--color-warm-border)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />

              {/* Inner shape (current profile) */}
              <polygon
                points={`${cx},${innerTopY} ${innerBottomLeftX},${innerBottomLeftY} ${innerBottomRightX},${innerBottomRightY}`}
                fill="color-mix(in srgb, var(--color-accent) 15%, transparent)"
                stroke="var(--color-accent)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />

              {/* Vertex dots */}
              <circle cx={cx} cy={topY} r="6" fill="var(--color-warm-border)" />
              <circle cx={leftX} cy={bottomY} r="6" fill="var(--color-warm-border)" />
              <circle cx={rightX} cy={bottomY} r="6" fill="var(--color-warm-border)" />

              {/* Inner vertex dots */}
              <circle cx={cx} cy={innerTopY} r="5" fill="var(--color-accent)" style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              <circle cx={innerBottomLeftX} cy={innerBottomLeftY} r="5" fill="var(--color-accent)" style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              <circle cx={innerBottomRightX} cy={innerBottomRightY} r="5" fill="var(--color-accent)" style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </svg>

            {/* Vertex labels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
              <p className="text-[18px] font-heading font-bold text-text-primary tracking-wide">Aesthetics</p>
              <p className="text-[11px] text-text-tertiary mt-1">Body fat %, muscle mass, symmetry</p>
            </div>
            <div className="absolute bottom-0 left-0 text-center max-w-[140px]">
              <p className="text-[18px] font-heading font-bold text-text-primary tracking-wide">Longevity</p>
              <p className="text-[11px] text-text-tertiary mt-1">Visceral fat, bone density, ALMI, VO2 Max</p>
            </div>
            <div className="absolute bottom-0 right-0 text-center max-w-[140px]">
              <p className="text-[18px] font-heading font-bold text-text-primary tracking-wide">Performance</p>
              <p className="text-[11px] text-text-tertiary mt-1">1RM, mile/marathon PR</p>
            </div>
          </div>

          {/* Commentary */}
          <div>
            <div className="space-y-6">
              {triangleProfiles.map((p, i) => (
                <div
                  key={p.label}
                  className={`transition-all duration-500 ${
                    profileIndex === i
                      ? 'opacity-100 translate-y-0'
                      : profileIndex > i
                        ? 'opacity-30 -translate-y-2'
                        : 'opacity-30 translate-y-2'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                      profileIndex === i ? 'bg-accent' : 'bg-warm-border'
                    }`} />
                    <p className={`text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${
                      profileIndex === i ? 'text-accent' : 'text-text-tertiary'
                    }`}>
                      {p.label}
                    </p>
                  </div>
                  <p className={`text-[16px] leading-[1.7] ml-6 transition-colors duration-500 ${
                    profileIndex === i ? 'text-text-secondary' : 'text-text-tertiary'
                  }`}>
                    {p.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[14px] text-text-tertiary italic mt-10 ml-6">
              For most people early in their journey, improving in one direction improves all three. Trade-offs only happen at extremes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Interactive Journey (scroll-reveal) ────────────────────────── */

function ScrollJourney() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const scrolled = viewportHeight - rect.top
      const total = rect.height + viewportHeight * 0.5
      const raw = scrolled / total
      const step = Math.min(2, Math.max(0, Math.floor(raw * 3)))
      setActiveStep(step)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className="min-h-[80vh]">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-10 relative">
        {/* Connecting line (desktop only) */}
        <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-warm-border" />
        <div
          className="hidden md:block absolute top-12 left-[16.67%] h-0.5 bg-accent transition-all duration-700"
          style={{ width: `${activeStep * 33.33}%` }}
        />

        {journeySteps.map((step, i) => (
          <div
            key={step.step}
            className={`relative flex flex-col items-center text-center transition-all duration-500 ${
              i <= activeStep ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'
            }`}
          >
            {/* Step circle */}
            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
              i <= activeStep ? 'bg-accent scale-110' : 'bg-cream-dark border-2 border-warm-border'
            }`}>
              {i < activeStep ? (
                <Check size={18} className="text-white" strokeWidth={3} />
              ) : (
                <span className={`text-[16px] font-bold ${i <= activeStep ? 'text-white' : 'text-text-tertiary'}`}>{step.step}</span>
              )}
            </div>

            <div className={`bg-white rounded-3xl border p-8 w-full transition-all duration-500 ${
              i <= activeStep ? 'border-accent/30 shadow-[0_8px_32px_rgba(0,0,0,0.06)]' : 'border-warm-border'
            }`}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-accent mb-2">{step.subtitle}</p>
              <h3 className="text-[20px] font-heading font-bold text-text-primary mb-5">{step.title}</h3>
              <ul className="space-y-3 text-left">
                {step.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <ArrowRight size={14} className="text-accent mt-1 shrink-0" />
                    <span className="text-[14px] text-text-secondary leading-[1.6]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Page ───────────────────────────────────────────────────── */

export default function PhilosophyPage() {
  const heroRef = useFadeIn()
  const pyramidRef = useFadeIn()
  const journeyRef = useFadeIn()
  const connectRef = useFadeIn()
  const ctaRef = useFadeIn()
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-bg">

      {/* Back navigation */}
      <div className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-warm-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-text-secondary hover:text-accent transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* ── Section A: Hero ──────────────────────────────────────── */}
      <section className="bg-cream py-28 md:py-36">
        <div ref={heroRef} className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Our Philosophy</p>
              <h1 className="text-[36px] md:text-[52px] font-heading font-bold text-text-primary leading-[1.08]">
                We're obsessed with changing the numbers
              </h1>
              <p className="text-[17px] text-text-secondary mt-6 leading-[1.75] max-w-[540px]">
                At Kalos, we don't believe there's that much value in one DEXA scan. What we really are obsessed with is changing the numbers.
              </p>
            </div>

            {/* Founder video */}
            <div
              className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-cream-dark shadow-[0_24px_80px_rgba(0,0,0,0.08)] cursor-pointer group"
              onClick={() => setVideoPlaying(!videoPlaying)}
            >
              {!videoPlaying ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/80 via-[#2a2420]/60 to-[#1A1A1A]/80 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                    <Play size={30} className="text-white ml-1" />
                  </div>
                  <p className="mt-4 text-[14px] font-semibold text-white/70">A message from our founder</p>
                </div>
              ) : (
                <video autoPlay controls className="w-full h-full object-cover">
                  <source src="/founder-message.mp4" type="video/mp4" />
                </video>
              )}
              {!videoPlaying && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2a2420] to-[#1A1A1A]" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section B: Kalos Framework (scroll-animated triangle) ── */}
      <section className="bg-cream-light py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">The Framework</p>
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-primary leading-[1.1]">
              The Kalos Framework
            </h2>
            <p className="text-[17px] text-text-secondary mt-6 leading-[1.75] max-w-[680px] mx-auto">
              Every person's health goals fall on a triangle with three vertices: Aesthetics, Longevity, Performance. Everyone starts with a unique shape. Kalos helps you expand that shape toward all three.
            </p>
          </div>

          <ScrollTriangle />
        </div>
      </section>

      {/* ── Section C: 80-16-3-1 Pyramids ────────────────────────── */}
      <section className="bg-cream py-20 md:py-28">
        <div ref={pyramidRef} className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Prioritization</p>
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-primary leading-[1.1]">
              Ruthless prioritization: 80-16-3-1
            </h2>
            <p className="text-[17px] text-text-secondary mt-6 leading-[1.75] max-w-[680px] mx-auto">
              All the marketing dollars in fitness are spent on that 1%. Trying to convince you on a supplement, zero effort, pop this pill. But really, that's not nearly as important as eating the right amount of food.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <Pyramid title="Nutrition" data={nutritionPyramid} />
            <Pyramid title="Exercise" data={exercisePyramid} />
          </div>

          <div className="bg-white rounded-3xl border border-warm-border p-8 md:p-10 text-center max-w-[800px] mx-auto">
            <p className="text-[17px] text-text-secondary leading-[1.75] italic">
              "We could have the best program in the world designed by the greatest trainer of all time. If we do it once a month, we're not going to see results."
            </p>
          </div>
        </div>
      </section>

      {/* ── Section D: The Journey (scroll-reveal) ───────────────── */}
      <section className="bg-cream-light py-20 md:py-28">
        <div ref={journeyRef} className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">The Path</p>
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-primary leading-[1.1]">
              Your Kalos journey
            </h2>
          </div>

          <ScrollJourney />
        </div>
      </section>

      {/* ── Section E: Our Approach ──────────────────────────────── */}
      <section className="bg-cream py-20 md:py-28">
        <div ref={connectRef} className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Our Approach</p>
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-primary leading-[1.1]">
              We connect the dots
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* The Problem */}
            <div className="bg-white rounded-3xl border border-warm-border p-8 md:p-10">
              <div className="w-10 h-1 bg-warm-border rounded-full mb-6" />
              <h3 className="text-[20px] font-heading font-bold text-text-primary mb-4">The Problem</h3>
              <p className="text-[15px] text-text-secondary leading-[1.75]">
                We have tons of fitness data. Steps, sleep, heart rate. But it's the wrong data. Without DEXA's gold-standard metrics, it doesn't paint the full picture. You're measuring inputs without knowing the outputs.
              </p>
            </div>

            {/* The Kalos Approach */}
            <div className="bg-white rounded-3xl border border-warm-border p-8 md:p-10">
              <div className="w-10 h-1 bg-accent rounded-full mb-6" />
              <h3 className="text-[20px] font-heading font-bold text-accent mb-4">The Kalos Approach</h3>
              <p className="text-[15px] text-text-secondary leading-[1.75]">
                We connect the X variables (what you do: training, nutrition, lifestyle) to the Y variables (what changes: muscle, fat, bone density) and prescribe accordingly. We're agnostic to the method. If you're getting stronger, building muscle, losing fat, the approach is working.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section F: CTA ───────────────────────────────────────── */}
      <section className="bg-cream-light py-20 md:py-28">
        <div ref={ctaRef} className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-primary leading-[1.1] mb-6">
            Ready to see your numbers?
          </h2>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-8 py-4 text-[16px] font-semibold hover:bg-accent-hover transition-colors duration-300"
          >
            Book My Scan
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
