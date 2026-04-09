import React from 'react'
import { useFadeIn } from '../hooks/useFadeIn'

interface Physician {
  name: string
  title: string
  company: string
  quote: string | React.ReactNode
  photoUrl: string | null
  logoUrl: string | null
  logoHref?: string
}

const physicians: Physician[] = [
  {
    name: 'Dr. Chris Threatt',
    title: "Men's Concierge Health",
    company: 'Kane Health',
    quote: <><strong className="text-text-primary">A DEXA scan is only as valuable as the conversation that follows it</strong>. Having an expert walk my patients through their results has fundamentally changed how they engage with their own health. That's why <strong className="text-text-primary">I always recommend the full Kalos analysis</strong>.</>,
    photoUrl: '/Physicians/chris-threatt.jpg',
    logoUrl: '/Physicians/kane-health-logo.webp',
    logoHref: 'https://www.kane.health/',
  },
  {
    name: 'Dr. Placeholder',
    title: 'Internal Medicine',
    company: 'Bay Area Medical Group',
    quote: "Placeholder quote. Replace with a real physician testimonial. Having accurate body composition data changes the conversation I have with my patients about their health.",
    photoUrl: null,
    logoUrl: null,
  },
  {
    name: 'Dr. Placeholder',
    title: 'Sports Medicine',
    company: 'SF Performance Clinic',
    quote: "Placeholder quote. Replace with a real physician testimonial. I send all of my patients to Kalos because the analysis they receive goes far beyond what any other DEXA provider offers.",
    photoUrl: null,
    logoUrl: null,
  },
]

function PhysicianCard({ physician }: { physician: Physician }) {
  return (
    <div className="bg-white rounded-3xl border border-warm-border p-8 lg:p-10 flex flex-col hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-all duration-300">
      {/* Quote */}
      <blockquote className="text-[16px] text-text-secondary leading-[1.75] flex-1 mb-8">
        "{physician.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between pt-6 border-t border-warm-border">
        <div className="flex items-center gap-4">
          {/* Photo */}
          <div className="w-14 h-14 rounded-full overflow-hidden bg-cream-dark shrink-0">
            {physician.photoUrl ? (
              <img src={physician.photoUrl} alt={physician.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                <span className="text-[18px] font-heading font-bold text-accent">
                  {physician.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="text-[15px] font-bold text-text-primary">{physician.name}</p>
            <p className="text-[13px] text-text-tertiary">{physician.title}</p>
          </div>
        </div>

        {/* Company logo */}
        <div className="shrink-0">
          {physician.logoUrl ? (
            <a href={physician.logoHref || '#'} target="_blank" rel="noopener noreferrer">
              <img src={physician.logoUrl} alt={physician.company} className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300" />
            </a>
          ) : (
            <span className="text-[12px] font-semibold text-text-tertiary uppercase tracking-[0.1em]">
              {physician.company}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PhysicianEndorsements() {
  const headRef = useFadeIn()
  const gridRef = useFadeIn('stagger')

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Expert analysis</p>
          <h2 className="text-[32px] md:text-[42px] font-heading font-bold text-text-primary leading-[1.1]">
            The difference is the expert analysis
          </h2>
          <p className="text-[16px] text-text-secondary mt-5 max-w-2xl mx-auto leading-[1.7]">
            The real value of a premium scan is the human expert who walks you through every detail of your results, turning raw data into a plan you can actually act on.
          </p>

          {/* Guarantee callout */}
          <div className="mt-10 inline-block bg-accent/10 border-2 border-accent/25 rounded-2xl px-8 py-6 max-w-2xl">
            <p className="text-[15px] text-text-primary leading-[1.7]">
              <span className="font-bold">Our guarantee:</span> if you complete a premium scan and don't walk away having learned something AI couldn't have told you, we'll refund your scan.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {physicians.map((p, i) => (
            <PhysicianCard key={i} physician={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-dark transition-colors duration-200"
          >
            Book My Premium Scan
          </a>
        </div>
      </div>
    </section>
  )
}
