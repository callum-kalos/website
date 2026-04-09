import { useState } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { Scan, Dumbbell, Trophy, ArrowRight, Play } from 'lucide-react'

/**
 * VERSION 1: Founder video top-left, headline top-right, horizontal timeline below.
 */

const journeySteps = [
  {
    step: '01',
    icon: Scan,
    title: 'Your First Scan',
    subtitle: 'Know where you stand',
    description: 'A 10-minute DEXA scan gives you the most accurate picture of your body composition. Your analyst walks you through every number and helps you understand what to prioritize.',
    cta: 'Book now',
    ctaHref: '#pricing',
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

export default function PhilosophyV1() {
  const headRef = useFadeIn()
  const timelineRef = useFadeIn()
  const pillarsRef = useFadeIn('stagger')
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <section className="bg-cream pt-16 md:pt-20 pb-28 md:pb-36">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header: Video left, text right */}
        <div ref={headRef} className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center mb-20">
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
              <video
                autoPlay
                controls
                className="w-full h-full object-cover"
              >
                <source src="/founder-message.mp4" type="video/mp4" />
              </video>
            )}
            {/* Poster/placeholder background */}
            {!videoPlaying && (
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2a2420] to-[#1A1A1A]" />
            )}
          </div>

          {/* Text */}
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Our philosophy</p>
            <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
              We don't just measure your body. We change what it's capable of.
            </h2>
            <p className="text-[17px] text-text-secondary mt-6 leading-[1.75]">
              Most health services hand you a number and send you home. At Kalos, we combine clinical-grade testing with expert coaching so your data becomes your transformation.
            </p>
          </div>
        </div>

        {/* Horizontal Timeline */}
        <div ref={timelineRef} className="relative mb-24">
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
                    <a href={step.ctaHref} className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent hover:text-accent-hover transition-colors duration-300">{step.cta}</a>
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

        <div className="text-center mt-14">
          <a href="#pricing" className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:text-accent-hover transition-colors duration-300">
            See pricing and get started <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
