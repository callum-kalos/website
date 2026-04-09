import { useCountUp } from '../hooks/useCountUp'
import { Star } from 'lucide-react'

export default function SocialProofBar() {
  const scans = useCountUp(10000)
  const reviews = useCountUp(500)

  return (
    <section className="bg-cream-light border-y border-warm-border">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 sm:gap-4">
          <div ref={scans.ref} className="text-center">
            <div className="text-[36px] md:text-[42px] font-heading font-bold text-text-primary leading-none">
              {scans.count.toLocaleString()}+
            </div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-text-tertiary mt-2">
              Scans completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-[36px] md:text-[42px] font-heading font-bold text-text-primary leading-none">
              +2.5 lbs
            </div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-text-tertiary mt-2">
              Avg muscle gain, 4 weeks
            </div>
          </div>
          <div className="text-center">
            <div className="text-[36px] md:text-[42px] font-heading font-bold text-text-primary leading-none">
              -4.2 lbs
            </div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-text-tertiary mt-2">
              Avg fat loss, 4 weeks
            </div>
          </div>
          <div className="text-center">
            <div className="text-[36px] md:text-[42px] font-heading font-bold text-text-primary leading-none">
              -18 g
            </div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-text-tertiary mt-2">
              Avg visceral fat reduction
            </div>
          </div>
          <div ref={reviews.ref} className="text-center col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[36px] md:text-[42px] font-heading font-bold text-text-primary leading-none">4.9</span>
              <Star size={22} className="text-accent fill-accent mt-1" />
            </div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-text-tertiary mt-2">
              Google ({reviews.count}+ reviews)
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
