import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background video / placeholder */}
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover brightness-[0.8]">
          <source src="/Hero video (1).mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-[76px] pb-24 mt-auto">
        <div className="flex flex-col items-start text-left max-w-[680px]">
          <h1 className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-heading font-bold text-white leading-[1.1] tracking-[-0.02em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            Your body is changing.{' '}
            <span className="text-accent">Now you can see exactly how.</span>
          </h1>
          <p className="mt-8 text-[17px] md:text-[19px] text-white/80 leading-[1.75] max-w-[580px]">
            Clinical-grade DEXA body composition scanning and personalized coaching from elite performance analysts across the Bay Area.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#pricing"
              className="inline-flex items-center px-9 py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.35)]"
            >
              Get Your Scan
            </a>
            <a
              href="#results"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-white/70 hover:text-white transition-colors duration-300"
            >
              See Member Results
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
