import { useFadeIn } from '../hooks/useFadeIn'
import { Check } from 'lucide-react'

export default function Pricing() {
  const headRef = useFadeIn()
  const gridRef = useFadeIn('stagger')

  return (
    <section id="pricing" className="bg-cream py-28 md:py-36">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Pricing</p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            Three ways to start
          </h2>
          <div className="mt-5 inline-flex items-center gap-2 bg-green/10 border border-green/20 rounded-full px-5 py-2">
            <Check size={14} className="text-green" strokeWidth={3} />
            <span className="text-[13px] font-semibold text-green">HSA/FSA eligible</span>
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-[1200px] mx-auto">
          {/* Premium */}
          <div className="relative bg-white rounded-3xl border-2 border-accent/20 shadow-[0_8px_32px_rgba(184,92,56,0.08)] p-8 lg:p-10 flex flex-col hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(184,92,56,0.16)] hover:border-accent/40 transition-all duration-300 cursor-pointer">
            <span className="absolute -top-4 left-8 bg-accent text-white text-[11px] font-bold uppercase tracking-[0.15em] px-5 py-2 rounded-full">
              Most popular
            </span>
            <h3 className="text-[22px] font-heading font-bold">Premium Scan</h3>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-[48px] font-heading font-bold text-text-primary leading-none">$84</span>
              <span className="text-[20px] text-text-tertiary line-through">$199</span>
            </div>
            <p className="text-[14px] text-text-secondary mt-4 leading-[1.75]">
              10-minute DEXA scan + 20-minute in-person analysis with a Kalos analyst. Walk away with complete clarity about your body composition and a prioritized action plan.
            </p>
            <ul className="mt-6 space-y-3.5 flex-1">
              {['Clinical-grade DEXA scan', '20-min analyst consultation', 'Full body composition report', 'Personalized action plan'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Check size={12} className="text-green" strokeWidth={3} />
                  </div>
                  <span className="text-[14px] text-text-primary">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-8 block text-center px-6 py-4 bg-accent text-white text-[14px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.25)]"
            >
              Book Premium Scan
            </a>
          </div>

          {/* Premium Duo */}
          <div className="relative bg-white rounded-3xl border-2 border-accent/20 shadow-[0_8px_32px_rgba(184,92,56,0.08)] p-8 lg:p-10 flex flex-col hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(184,92,56,0.16)] hover:border-accent/40 transition-all duration-300 cursor-pointer">
            <span className="absolute -top-4 left-8 bg-green text-white text-[11px] font-bold uppercase tracking-[0.15em] px-5 py-2 rounded-full">
              Great for couples
            </span>
            <h3 className="text-[22px] font-heading font-bold">Premium Duo Scan</h3>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-[48px] font-heading font-bold text-text-primary leading-none">$74</span>
              <span className="text-[16px] text-text-tertiary font-medium">/scan</span>
              <span className="text-[20px] text-text-tertiary line-through">$199</span>
            </div>
            <p className="text-[14px] text-text-secondary mt-4 leading-[1.75]">
              Back-to-back scans + personalized interpretation from a Kalos analyst. Bring a friend, partner, or family member and both save.
            </p>
            <ul className="mt-6 space-y-3.5 flex-1">
              {['Two back-to-back DEXA scans', '40-min in-person expert interpretation', 'Understand fat, muscle, visceral fat and what to change', 'Immediate results', 'Physical printout', 'Priority scheduling'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Check size={12} className="text-green" strokeWidth={3} />
                  </div>
                  <span className="text-[14px] text-text-primary">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-8 block text-center px-6 py-4 bg-accent text-white text-[14px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.25)]"
            >
              Book Premium Duo Scan
            </a>
          </div>

          {/* Basic */}
          <div className="bg-cream-light rounded-3xl border border-warm-border p-8 lg:p-10 flex flex-col hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(0,0,0,0.08)] hover:border-text-tertiary/30 transition-all duration-300 cursor-pointer">
            <h3 className="text-[22px] font-heading font-bold">Basic Scan</h3>
            <div className="mt-4">
              <span className="text-[48px] font-heading font-bold text-text-primary leading-none">$59</span>
            </div>
            <p className="text-[14px] text-text-secondary mt-4 leading-[1.75]">
              10-minute DEXA scan. Results emailed as a PDF. Perfect if you already have a trainer or just want the raw data.
            </p>
            <ul className="mt-6 space-y-3.5 flex-1">
              {['Clinical-grade DEXA scan', 'PDF results via email'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Check size={12} className="text-green" strokeWidth={3} />
                  </div>
                  <span className="text-[14px] text-text-primary">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-8 block text-center px-6 py-4 bg-transparent border-2 border-accent text-accent text-[14px] font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300"
            >
              Book Basic Scan
            </a>
          </div>
        </div>

        <p className="text-center text-[14px] text-text-tertiary mt-12">
          Already a member? Book your monthly scan through the app.
        </p>
      </div>
    </section>
  )
}
