import { useState, useMemo } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

type ReviewTag = 'results' | 'imbalances' | 'fat-loss' | 'muscle-gain' | 'analysis' | 'coaching'

interface Review {
  name: string
  stars: number
  text: string
  tags: ReviewTag[]
}

const tagLabels: Record<ReviewTag, string> = {
  'results': 'Results',
  'imbalances': 'Imbalances',
  'fat-loss': 'Fat Loss',
  'muscle-gain': 'Muscle Gain',
  'analysis': 'Analysis',
  'coaching': 'Coaching',
}

const reviews: Review[] = [
  {
    name: 'Sarah M.',
    stars: 5,
    text: "I came in expecting a quick scan and a printout. Instead, I got a 20-minute deep dive into my body composition with an analyst who genuinely understood exercise science.",
    tags: ['analysis'],
  },
  {
    name: 'David L.',
    stars: 5,
    text: "What sets Kalos apart is the analysis. I've gotten DEXA scans elsewhere, but nobody has ever sat down and explained what the numbers actually mean for my specific goals.",
    tags: ['analysis', 'results'],
  },
  {
    name: 'Rachel K.',
    stars: 5,
    text: "My analyst caught a significant muscle imbalance I had no idea about and gave me specific exercises to fix it. This is what healthcare should feel like.",
    tags: ['imbalances'],
  },
  {
    name: 'Marcus T.',
    stars: 5,
    text: "Came back for my second scan after 8 weeks. Seeing the exact changes in muscle and fat, region by region, was incredibly motivating. The data doesn't lie.",
    tags: ['results', 'muscle-gain', 'fat-loss'],
  },
  {
    name: 'Elena P.',
    stars: 5,
    text: "I lost 12 lbs of fat in 10 weeks and my analyst helped me understand exactly which habits were driving the change. The scan-to-scan comparison was eye-opening.",
    tags: ['fat-loss', 'results'],
  },
  {
    name: 'James W.',
    stars: 5,
    text: "After 6 months of training, I'd gained 8 lbs of lean mass. My ALMI went from 40th to 68th percentile. Having the data keeps me accountable.",
    tags: ['muscle-gain', 'results'],
  },
  {
    name: 'Priya S.',
    stars: 5,
    text: "My right side was significantly stronger than my left. The analyst spotted it immediately and gave me a corrective program. Four weeks later, the asymmetry was cut in half.",
    tags: ['imbalances', 'coaching'],
  },
  {
    name: 'Tom R.',
    stars: 5,
    text: "The coaching program changed everything for me. My coach used my DEXA data to adjust my nutrition and training week by week. I've never been in better shape.",
    tags: ['coaching', 'muscle-gain'],
  },
]

const filterOptions: { value: ReviewTag | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'results', label: 'Results' },
  { value: 'imbalances', label: 'Imbalances' },
  { value: 'fat-loss', label: 'Fat Loss' },
  { value: 'muscle-gain', label: 'Muscle Gain' },
  { value: 'analysis', label: 'Analysis' },
  { value: 'coaching', label: 'Coaching' },
]

export default function Reviews() {
  const headRef = useFadeIn()
  const [activeFilter, setActiveFilter] = useState<ReviewTag | 'all'>('all')
  const [startIndex, setStartIndex] = useState(0)

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return reviews
    return reviews.filter((r) => r.tags.includes(activeFilter))
  }, [activeFilter])

  const visibleCount = 4
  const maxStart = Math.max(0, filtered.length - visibleCount)
  const safeStart = Math.min(startIndex, maxStart)

  const canGoLeft = safeStart > 0
  const canGoRight = safeStart < maxStart

  const goLeft = () => setStartIndex(Math.max(0, safeStart - 1))
  const goRight = () => setStartIndex(Math.min(maxStart, safeStart + 1))

  useMemo(() => {
    setStartIndex(0)
  }, [activeFilter])

  const visibleReviews = filtered.slice(safeStart, safeStart + visibleCount)

  return (
    <section className="bg-cream py-28 md:py-36">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Reviews</p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            Don't take our word for it
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                activeFilter === opt.value
                  ? 'bg-accent text-white shadow-[0_2px_8px_rgba(184,92,56,0.2)]'
                  : 'bg-cream-light border border-warm-border text-text-secondary hover:text-text-primary hover:border-text-tertiary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          {canGoLeft && (
            <button
              onClick={goLeft}
              className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-warm-border shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={20} className="text-text-primary" />
            </button>
          )}

          {canGoRight && (
            <button
              onClick={goRight}
              className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-warm-border shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
              aria-label="Next reviews"
            >
              <ChevronRight size={20} className="text-text-primary" />
            </button>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[17px] text-text-secondary">No reviews match this filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {visibleReviews.map((review) => (
                <div
                  key={`${review.name}-${safeStart}`}
                  className="bg-white rounded-3xl p-8 lg:p-9 border border-warm-border flex flex-col hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-all duration-300"
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Star key={j} size={16} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-[15px] text-text-secondary leading-[1.75] flex-1">
                    "{review.text}"
                  </p>
                  <div className="mt-6">
                    <p className="text-[14px] font-bold text-text-primary mb-2.5">{review.name}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {review.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-semibold uppercase tracking-[0.1em] text-accent/60 bg-accent/6 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {tagLabels[tag]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dot indicators */}
          {filtered.length > visibleCount && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: maxStart + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStartIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === safeStart
                      ? 'w-8 h-2.5 bg-accent'
                      : 'w-2.5 h-2.5 bg-text-tertiary/30 hover:bg-text-tertiary/50'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-semibold text-accent hover:text-accent-hover transition-colors duration-300"
          >
            Read all reviews on Google →
          </a>
        </div>
      </div>
    </section>
  )
}
