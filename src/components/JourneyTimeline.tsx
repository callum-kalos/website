import { useFadeIn } from '../hooks/useFadeIn'
import {
  ScanLine,
  Users,
  Trophy,
  Camera,
  ArrowRight,
  Activity,
  Heart,
  Dumbbell,
  Bone,
  BookOpen,
  Target,
  MessageCircle,
  FileText,
  Utensils,
  TrendingUp,
} from 'lucide-react'

interface Pill {
  icon: typeof ScanLine
  label: string
  sublabel: string
}

interface Step {
  id: string
  num: number
  title: string
  duration: string
  description: string
  icon: typeof ScanLine
  optional: boolean
  imageBrief: string
  image: string | null
  pills: Pill[]
}

const steps: Step[] = [
  {
    id: 'scan',
    num: 1,
    title: 'Complete your DEXA scan',
    duration: '10 min',
    description:
      'A clinical-grade DEXA scan in our private rooms. The most accurate picture of your body composition that exists.',
    icon: ScanLine,
    optional: false,
    imageBrief: 'Member lying on the DEXA bed, warm lighting, KALOS signage in frame.',
    image: '/journey-scan.jpg',
    pills: [
      { icon: Activity, label: 'Body Fat %', sublabel: 'Total + regional fat distribution' },
      { icon: Heart, label: 'Visceral Fat', sublabel: 'Hidden fat around your organs' },
      { icon: Dumbbell, label: 'Lean Tissue', sublabel: 'Muscle by arms, legs, and trunk' },
      { icon: Bone, label: 'Bone Density', sublabel: 'Full skeletal bone map' },
    ],
  },
  {
    id: 'analysis',
    num: 2,
    title: 'Expert analysis of your results',
    duration: '20 min',
    description:
      'A real conversation with your Kalos analyst. Every number on your scan, what it means, and what to prioritize.',
    icon: Users,
    optional: false,
    imageBrief: 'Analyst + member seated at a table, scan results on screen / printout, both leaning in.',
    image: '/journey-analysis.jpg',
    pills: [
      { icon: BookOpen, label: 'Plain-English Breakdown', sublabel: 'Every metric explained' },
      { icon: Target, label: 'Personalized Priorities', sublabel: 'What to fix first, for you' },
      { icon: MessageCircle, label: 'Open Q&A', sublabel: 'A real conversation, not a PDF' },
      { icon: FileText, label: 'Take-Home Report', sublabel: 'A printout you can keep' },
    ],
  },
  {
    id: 'coaching',
    num: 3,
    title: 'Change your numbers',
    duration: 'Optional',
    description:
      'A personalized plan and ongoing coaching to actually move the metrics that matter. Compounding results, tracked end-to-end.',
    icon: Trophy,
    optional: true,
    imageBrief: 'Long-term member showing visible composition change OR coach + member reviewing month-over-month progress.',
    image: null,
    pills: [
      { icon: Dumbbell, label: 'Custom Training', sublabel: 'Built around your scan and goals' },
      { icon: Utensils, label: 'Nutrition Targets', sublabel: 'Protein, calories, weekly checkpoints' },
      { icon: ScanLine, label: 'Monthly Rescans', sublabel: 'Measure real change, not guesswork' },
      { icon: TrendingUp, label: 'Progress Tracking', sublabel: 'Long-term trends, end-to-end' },
    ],
  },
]

export default function JourneyTimeline() {
  const headRef = useFadeIn()
  const cardsRef = useFadeIn()

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

        {/* Three cards side by side */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {steps.map((step) => (
            <article
              key={step.id}
              className="group relative bg-white rounded-3xl border border-warm-border overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col touch-manipulation"
              tabIndex={0}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-cream to-cream-dark overflow-hidden">
                {step.image ? (
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center max-w-[260px]">
                      <Camera size={36} strokeWidth={1} className="mx-auto mb-3 text-text-primary/25" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-primary/45 mb-2">
                        Image placeholder
                      </p>
                      <p className="text-[11px] text-text-primary/40 leading-[1.55]">
                        {step.imageBrief}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step number badge (top-left) */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_2px_8px_rgba(74,74,244,0.4)]">
                    <span className="text-[14px] font-heading font-bold">{step.num}</span>
                  </div>
                  {step.optional && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      Optional
                    </span>
                  )}
                </div>

                {/* Duration badge (top-right) */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {step.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-7 md:p-8 flex flex-col flex-1 min-h-[280px]">
                <h3 className="text-[22px] md:text-[24px] font-heading font-bold text-text-primary leading-[1.2] mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] text-text-secondary leading-[1.65] transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0 md:group-hover:opacity-0">
                  {step.description}
                </p>

                {/* Hover hint (desktop) */}
                <p className="hidden md:flex items-center gap-1.5 mt-auto pt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-tertiary transition-opacity duration-300 group-hover:opacity-0">
                  Hover to see what's covered
                  <ArrowRight size={12} />
                </p>

                {/* Pills (revealed on hover/focus) */}
                <div
                  className="absolute inset-0 p-7 md:p-8 flex flex-col bg-white opacity-0 translate-y-2 transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus:opacity-100 group-focus:translate-y-0 group-focus:pointer-events-auto"
                  aria-hidden="true"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent mb-4">
                    What's covered
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 flex-1">
                    {step.pills.map((p) => (
                      <div
                        key={p.label}
                        className="rounded-xl border border-warm-border bg-cream-light/60 p-3 flex flex-col"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                          <p.icon size={16} className="text-accent" strokeWidth={1.75} />
                        </div>
                        <p className="text-[12px] font-bold text-text-primary leading-tight mb-0.5">
                          {p.label}
                        </p>
                        <p className="text-[10.5px] text-text-secondary leading-[1.4]">
                          {p.sublabel}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile: pills always visible below description */}
                <div className="md:hidden mt-5 pt-5 border-t border-warm-border">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-3">
                    What's covered
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {step.pills.map((p) => (
                      <div
                        key={p.label}
                        className="rounded-lg border border-warm-border bg-cream-light/60 p-2.5 flex items-center gap-2"
                      >
                        <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                          <p.icon size={14} className="text-accent" strokeWidth={1.75} />
                        </div>
                        <p className="text-[11px] font-bold text-text-primary leading-tight">
                          {p.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Shared CTA */}
        <div className="text-center">
          <a
            href="https://www.livekalos.com/book-now"
            className="inline-flex items-center gap-2 px-9 py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-colors duration-200 shadow-[0_2px_12px_rgba(74,74,244,0.3)]"
          >
            Book My DEXA Scan
            <ArrowRight size={16} />
          </a>
          <p className="mt-4 text-[13px] text-text-tertiary">
            Step 3 is optional. Most members start with the scan and analysis to see where they stand.
          </p>
        </div>
      </div>
    </section>
  )
}
