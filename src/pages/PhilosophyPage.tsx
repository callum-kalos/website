import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFadeIn } from '../hooks/useFadeIn'
import { ArrowLeft, Play, ArrowRight, Scan, Dumbbell, Trophy, ChevronDown } from 'lucide-react'

/* ─── Data ────────────────────────────────────────────────────────── */

const nutritionPyramid = [
  { pct: '1%', label: 'Highly Dependent', detail: 'Ashwagandha, niche supplements' },
  { pct: '3%', label: 'Timing', detail: 'Protein timing, intermittent fasting, carb cycling' },
  { pct: '16%', label: 'Quality', detail: 'Whole grains, proteins, lean sources, healthy fats, etc.' },
  { pct: '80%', label: 'Quantity', detail: 'Calories, macros, micros' },
]

const exercisePyramid = [
  { pct: '1%', label: 'Highly Dependent', detail: 'Cold plunges, TRT' },
  { pct: '3%', label: 'Variations', detail: 'Kettlebells vs. dumbbells, tempo, equipment' },
  { pct: '16%', label: 'Programming', detail: 'Sets, reps, rest periods, exercise order, RIR' },
  { pct: '80%', label: 'Consistency', detail: 'Are you going to the gym regularly' },
]

const journeySteps = [
  {
    step: '01',
    icon: Scan,
    title: 'Your First Scan',
    subtitle: 'Know where you stand',
    description: 'A 10-minute DEXA scan gives you the most accurate picture of your body composition. Your analyst walks you through every number and helps you understand what to prioritize.',
    cta: 'Book now',
    ctaHref: '/#pricing',
    optional: false,
  },
  {
    step: '02',
    icon: Dumbbell,
    title: '4-Week Program',
    subtitle: 'Build momentum',
    description: 'Your analyst builds a personalized training and nutrition plan based on your scan data, goals, and lifestyle. Weekly check-ins keep you on track. Rescan at week 4 to measure real change.',
    cta: 'Learn more',
    ctaHref: '#',
    optional: true,
  },
  {
    step: '03',
    icon: Trophy,
    title: 'Long-Term Membership',
    subtitle: 'Transform for good',
    description: 'Monthly scans, ongoing coaching, and continuous plan adjustments. This is how our members build lasting change. Your data compounds over time, and so do your results.',
    cta: 'Learn more',
    ctaHref: '#',
    optional: true,
  },
]

const pillars = [
  {
    title: 'Data-driven, not guesswork',
    text: 'Every recommendation is rooted in your specific DEXA results. No generic plans. No wasted effort.',
  },
  {
    title: 'A/B test your own body',
    text: 'Adjust one variable, measure the result, iterate. Scan after scan, you learn exactly what works for you.',
  },
  {
    title: 'Accountability that works',
    text: "We're your partner in this, not just at your scan, but in the weeks between. We hold the standard high.",
  },
]

/* ─── Triangle profiles for hover states ─────────────────────────── */

const triangleProfiles = [
  {
    aesthetics: 0.15,
    longevity: 0.12,
    performance: 0.1,
    label: 'Where most people start',
    description: 'Limited visibility into body composition. Training without data. No clear picture of what to prioritize or how to measure progress.',
  },
  {
    aesthetics: 0.4,
    longevity: 0.35,
    performance: 0.3,
    label: 'After your first four weeks',
    description: 'Baseline established. Your analyst identifies the biggest levers. A targeted 4-week plan attacks what matters most for your goals.',
  },
  {
    aesthetics: 0.85,
    longevity: 0.8,
    performance: 0.75,
    label: 'Where Kalos takes you',
    description: 'Scan after scan, your triangle grows. Muscle gained, fat reduced, bone density strengthened. Performance improves across strength, endurance, and overall capacity.',
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
          const backgrounds = [
            'color-mix(in srgb, var(--color-accent) 20%, transparent)',
            'color-mix(in srgb, var(--color-accent) 40%, transparent)',
            'color-mix(in srgb, var(--color-accent) 70%, transparent)',
            'var(--color-accent)',
          ]
          return (
            <div key={tier.label} className="w-full flex flex-col items-center">
              <div
                className="rounded-2xl px-5 py-3 text-center transition-all duration-300 flex flex-col items-center justify-center"
                style={{
                  width: widths[i],
                  minHeight: '56px',
                  background: backgrounds[i],
                }}
              >
                <p className={`text-[14px] font-bold whitespace-nowrap ${i >= 2 ? 'text-white' : 'text-text-primary'}`}>
                  {tier.pct} = {tier.label}
                </p>
                <p className={`text-[12px] mt-0.5 leading-snug whitespace-nowrap ${i >= 2 ? 'text-white/80' : 'text-text-secondary'}`}>
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

/* ─── Vertex detailed metrics ─────────────────────────────────────── */

const vertexData = [
  {
    key: 'aesthetics',
    title: 'Aesthetics',
    preview: 'Body fat %, muscle mass...',
    metrics: [
      'Body fat %',
      'Muscle mass',
      'Symmetry (left vs right, upper vs lower)',
      'FFMI (Fat-Free Mass Index)',
      'Waist-to-hip ratio',
      'Waist-to-height ratio',
      'Subcutaneous vs visceral fat ratio',
      'Regional muscle distribution',
      'Posture / alignment',
    ],
  },
  {
    key: 'longevity',
    title: 'Longevity',
    preview: 'Visceral fat, VO2 max...',
    metrics: [
      'Visceral fat',
      'Bone density',
      'ALMI',
      'VO2 max',
      'Resting heart rate',
      'Heart rate variability (HRV)',
      'Blood pressure',
      'Blood biomarkers (A1C, fasting insulin, ApoB...)',
      'Inflammation (CRP)',
      'Grip strength',
      'Mobility / joint range of motion',
      'Balance / stability',
      'Sleep quality',
      'Metabolic flexibility',
    ],
  },
  {
    key: 'performance',
    title: 'Performance',
    preview: '1RM, mile/marathon PR...',
    metrics: [
      '1RM strength (bench, squat, deadlift)',
      'Mile / marathon PR',
      'Power (vertical jump, watts/kg)',
      'Strength endurance (reps at % of 1RM)',
      'Lactate threshold',
      'Running economy',
      'Sprint speed (10m, 40m)',
      'Agility / change of direction',
      'Work capacity',
      'Recovery rate (heart rate drop post-exercise)',
      'Sport-specific benchmarks',
    ],
  },
]

/* ─── Interactive Triangle with hover states ──────────────────────── */

function HoverTriangle() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedVertex, setExpandedVertex] = useState<string | null>(null)

  const profile = triangleProfiles[activeIndex]

  // Triangle geometry
  const cx = 200, cy = 200
  const radius = 160
  const topY = cy - radius
  const bottomY = cy + radius * 0.85
  const leftX = cx - radius * 0.87
  const rightX = cx + radius * 0.87

  // Inner shape vertices
  const innerTopY = cy - (cy - topY) * profile.aesthetics
  const innerBottomLeftX = cx - (cx - leftX) * profile.longevity
  const innerBottomLeftY = cy + (bottomY - cy) * profile.longevity
  const innerBottomRightX = cx + (rightX - cx) * profile.performance
  const innerBottomRightY = cy + (bottomY - cy) * profile.performance

  const toggleVertex = (key: string) => {
    setExpandedVertex(expandedVertex === key ? null : key)
  }

  return (
    <div className="max-w-[1300px] mx-auto">
      {/* Triangle + labels in a relative container */}
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center">
        <div className="relative w-full max-w-[600px] mx-auto">
          <svg viewBox="-20 -10 440 430" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Glow effect behind inner triangle */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="innerFill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.05" />
              </radialGradient>
            </defs>

            {/* Outer triangle */}
            <polygon
              points={`${cx},${topY} ${leftX},${bottomY} ${rightX},${bottomY}`}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              strokeDasharray="8 5"
            />

            {/* Inner glow shape */}
            <polygon
              points={`${cx},${innerTopY} ${innerBottomLeftX},${innerBottomLeftY} ${innerBottomRightX},${innerBottomRightY}`}
              fill="url(#innerFill)"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              filter="url(#glow)"
              style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* Outer vertex dots */}
            <circle cx={cx} cy={topY} r="5" fill="rgba(255,255,255,0.4)" />
            <circle cx={leftX} cy={bottomY} r="5" fill="rgba(255,255,255,0.4)" />
            <circle cx={rightX} cy={bottomY} r="5" fill="rgba(255,255,255,0.4)" />

            {/* Inner vertex dots with glow */}
            <circle cx={cx} cy={innerTopY} r="4" fill="var(--color-accent)" style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            <circle cx={cx} cy={innerTopY} r="8" fill="var(--color-accent)" opacity="0.2" style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            <circle cx={innerBottomLeftX} cy={innerBottomLeftY} r="4" fill="var(--color-accent)" style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            <circle cx={innerBottomLeftX} cy={innerBottomLeftY} r="8" fill="var(--color-accent)" opacity="0.2" style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            <circle cx={innerBottomRightX} cy={innerBottomRightY} r="4" fill="var(--color-accent)" style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            <circle cx={innerBottomRightX} cy={innerBottomRightY} r="8" fill="var(--color-accent)" opacity="0.2" style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />

            {/* Vertex labels directly in SVG, tight to dots */}
            <text x={cx} y={topY - 30} textAnchor="middle" fill="rgba(255,255,255,0.95)" style={{ fontSize: '17px', fontWeight: 700 }}>Aesthetics</text>
            <text x={cx} y={topY - 16} textAnchor="middle" fill="rgba(255,255,255,0.45)" style={{ fontSize: '10px' }}>Body fat %, muscle mass...</text>

            <text x={leftX} y={bottomY + 30} textAnchor="middle" fill="rgba(255,255,255,0.95)" style={{ fontSize: '17px', fontWeight: 700 }}>Longevity</text>
            <text x={leftX} y={bottomY + 44} textAnchor="middle" fill="rgba(255,255,255,0.45)" style={{ fontSize: '10px' }}>Visceral fat, VO2 max...</text>

            <text x={rightX} y={bottomY + 30} textAnchor="middle" fill="rgba(255,255,255,0.95)" style={{ fontSize: '17px', fontWeight: 700 }}>Performance</text>
            <text x={rightX} y={bottomY + 44} textAnchor="middle" fill="rgba(255,255,255,0.45)" style={{ fontSize: '10px' }}>1RM, mile/marathon PR...</text>
          </svg>
        </div>

        {/* Commentary - hover to change triangle state */}
        <div>
          <div className="space-y-4">
            {triangleProfiles.map((p, i) => (
              <div
                key={p.label}
                className={`rounded-2xl border p-5 cursor-pointer transition-all duration-400 ${
                  activeIndex === i
                    ? 'border-accent/40 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
                    : 'border-warm-border bg-transparent hover:border-accent/20'
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full transition-colors duration-400 ${
                    activeIndex === i ? 'bg-accent' : 'bg-warm-border'
                  }`} />
                  <p className={`text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-400 ${
                    activeIndex === i ? 'text-accent' : 'text-text-tertiary'
                  }`}>
                    {p.label}
                  </p>
                </div>
                <p className={`text-[15px] leading-[1.7] ml-6 transition-colors duration-400 ${
                  activeIndex === i ? 'text-text-secondary' : 'text-text-tertiary'
                }`}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[14px] text-text-tertiary italic mt-8 ml-6">
            For most people early in their journey, improving in one direction improves all three. Trade-offs only happen at extremes.
          </p>
        </div>
      </div>

      {/* Expandable metric cards below the triangle */}
      <div className="grid md:grid-cols-3 gap-4 mt-12 items-start">
        {vertexData.map((v) => (
          <button
            key={v.key}
            onClick={() => toggleVertex(v.key)}
            className={`rounded-2xl border text-left p-5 transition-all duration-400 cursor-pointer ${
              expandedVertex === v.key
                ? 'border-accent/40 bg-white/[0.06]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-[15px] font-heading font-bold text-white/90">{v.title}</h4>
              <ChevronDown size={16} className={`text-white/40 transition-transform duration-300 ${expandedVertex === v.key ? 'rotate-180' : ''}`} />
            </div>
            <p className="text-[12px] text-white/40">{v.preview}</p>

            <div className={`overflow-hidden transition-all duration-400 ${expandedVertex === v.key ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
              <div className="border-t border-white/10 pt-4">
                <ul className="space-y-2">
                  {v.metrics.map((m) => (
                    <li key={m} className="text-[13px] text-white/60 flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Page ───────────────────────────────────────────────────── */

export default function PhilosophyPage() {
  const heroRef = useFadeIn()
  const frameworkRef = useFadeIn()
  const pyramidRef = useFadeIn()
  const journeyRef = useFadeIn()
  const pillarsRef = useFadeIn('stagger')
  const connectRef = useFadeIn()
  const ctaRef = useFadeIn()
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const navigate = useNavigate()

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBookScan = () => {
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById('pricing')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

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

      {/* ── Section B: Kalos Framework (hover-animated triangle) ── */}
      <section className="bg-cream-light py-20 md:py-28">
        <div ref={frameworkRef} className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">The Framework</p>
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-primary leading-[1.1]">
              The Kalos Framework
            </h2>
            <p className="text-[17px] text-text-secondary mt-6 leading-[1.75] max-w-[680px] mx-auto">
              Every person's health goals fall on a triangle with three vertices: Aesthetics, Longevity, Performance. Everyone starts with a unique shape. Kalos helps you expand that shape toward all three.
            </p>
          </div>

          <HoverTriangle />
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
              All the marketing dollars in fitness are spent on that 1%. Trying to convince you on a supplement, zero effort, pop this pill. But really, that's not nearly as important as eating the right amount of food and training consistently.
            </p>
          </div>

          <div className="flex gap-6 lg:gap-10 mb-12">
            {/* Generalizability scale */}
            <div className="hidden md:flex flex-col items-center justify-between py-14 shrink-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-tertiary text-center leading-tight max-w-[90px]">Less generalisable, more art</p>
              <div className="flex-1 w-px bg-gradient-to-b from-text-tertiary/40 via-text-tertiary/20 to-text-tertiary/40 my-4" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-tertiary text-center leading-tight max-w-[90px]">More generalisable, more science</p>
            </div>

            {/* Pyramids */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 flex-1">
              <Pyramid title="Nutrition" data={nutritionPyramid} />
              <Pyramid title="Exercise" data={exercisePyramid} />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-warm-border p-8 md:p-10 text-center max-w-[800px] mx-auto">
            <p className="text-[17px] text-text-secondary leading-[1.75] italic">
              "We could have the best program in the world designed by the greatest trainer of all time. If we do it once a month, we're not going to see results."
            </p>
          </div>
        </div>
      </section>

      {/* ── Section D: Your Kalos Journey (homepage-style timeline) ── */}
      <section className="bg-cream-light py-20 md:py-28">
        <div ref={journeyRef} className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">The Path</p>
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-primary leading-[1.1]">
              Your Kalos journey
            </h2>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative mb-20">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-warm-border" />
            <div
              className="hidden md:block absolute top-6 left-0 h-0.5 bg-accent/40 transition-all duration-500"
              style={{ width: activeStep === null ? '0%' : `${(activeStep / (journeySteps.length - 1)) * 100}%` }}
            />

            <div className="grid md:grid-cols-3 relative">
              {journeySteps.map((step, i) => (
                <div
                  key={step.step}
                  className="flex flex-col items-center text-center group cursor-pointer"
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    activeStep === i
                      ? 'bg-accent border-accent scale-110 shadow-[0_0_20px_rgba(184,92,56,0.3)]'
                      : activeStep !== null && i < activeStep
                        ? 'bg-cream border-accent'
                        : 'bg-cream border-warm-border hover:border-accent/40'
                  }`}>
                    <step.icon size={20} className={`transition-colors duration-300 ${activeStep === i ? 'text-white' : 'text-accent'}`} strokeWidth={1.5} />
                  </div>

                  <p className={`mt-5 text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${activeStep === i ? 'text-accent' : 'text-text-tertiary'}`}>
                    Step {step.step}
                  </p>
                  <h3 className={`mt-2 text-[20px] font-heading font-bold transition-colors duration-300 ${activeStep === i ? 'text-text-primary' : 'text-text-primary/70'}`}>
                    {step.title}
                  </h3>
                  {step.optional && <p className="text-[12px] text-text-tertiary mt-1 italic">(optional)</p>}

                  <div className={`overflow-hidden transition-all duration-400 ${activeStep === i ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="bg-white rounded-2xl border border-warm-border p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] max-w-[320px] mx-auto text-left">
                      <p className="text-[14px] font-semibold text-accent mb-3">{step.subtitle}</p>
                      <p className="text-[14px] text-text-secondary leading-[1.7] mb-4">{step.description}</p>
                      {step.ctaHref === '/#pricing' ? (
                        <button onClick={handleBookScan} className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent hover:text-accent-hover transition-colors duration-300 cursor-pointer">{step.cta}</button>
                      ) : (
                        <Link to={step.ctaHref} className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent hover:text-accent-hover transition-colors duration-300">{step.cta}</Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pillars */}
          <div ref={pillarsRef} className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {pillars.map((pillar) => (
              <div key={pillar.title}>
                <div className="w-full h-0.5 bg-accent/20 mb-6" />
                <h4 className="text-[15px] font-bold uppercase tracking-[0.1em] text-text-primary mb-3">{pillar.title}</h4>
                <p className="text-[15px] text-text-secondary leading-[1.75]">{pillar.text}</p>
              </div>
            ))}
          </div>
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
          <button
            onClick={handleBookScan}
            className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-8 py-4 text-[16px] font-semibold hover:bg-accent-hover transition-colors duration-300 cursor-pointer"
          >
            Book My Scan
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}
