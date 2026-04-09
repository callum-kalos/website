import { useState, useRef, useEffect } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const team = [
  {
    name: 'Matteo Ascherio-Victoria',
    title: 'General Manager',
    initials: 'MA',
  },
  {
    name: 'Daniel Christensen',
    title: 'Performance Analyst',
    initials: 'DC',
  },
  {
    name: 'Sean Corcoran',
    title: 'Head of Engineering',
    initials: 'SC',
  },
  {
    name: 'Noah Feinberg',
    title: 'Performance Analyst',
    initials: 'NF',
  },
  {
    name: 'Thérèse Harvey',
    title: 'Performance Analyst',
    initials: 'TH',
  },
  {
    name: 'Sophie Klube',
    title: 'Performance Analyst',
    initials: 'SK',
  },
  {
    name: 'Joshua Lee',
    title: 'Performance Analyst',
    initials: 'JL',
  },
  {
    name: 'Chris McHughes',
    title: 'Performance Analyst',
    initials: 'CM',
  },
  {
    name: 'Ben Mefford',
    title: 'Performance Analyst',
    initials: 'BM',
  },
  {
    name: 'Morgan Mitchell',
    title: 'Performance Analyst',
    initials: 'MM',
  },
  {
    name: 'Lexy Nevis',
    title: 'Performance Analyst',
    initials: 'LN',
  },
  {
    name: 'Callum Parker',
    title: 'Co-Founder',
    initials: 'CP',
  },
  {
    name: 'Max Shakespeare',
    title: 'Performance Analyst',
    initials: 'MS',
  },
  {
    name: 'Alex Shultz',
    title: 'General Manager',
    initials: 'AS',
  },
  {
    name: 'Harsh Sinha',
    title: 'Founder',
    initials: 'HS',
  },
]

export default function Team() {
  const headRef = useFadeIn()
  const carouselRef = useFadeIn()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const totalMembers = team.length
  // Show 4 on desktop, 2 on tablet, 1 on mobile
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 4
    if (window.innerWidth >= 1024) return 4
    if (window.innerWidth >= 640) return 2
    return 1
  }

  const updateScrollState = () => {
    const el = scrollContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)

    // Calculate active index based on scroll position
    const cardWidth = el.scrollWidth / totalMembers
    const newIndex = Math.round(el.scrollLeft / cardWidth)
    setActiveIndex(newIndex)
  }

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (!el) return
    const visibleCount = getVisibleCount()
    const cardWidth = el.scrollWidth / totalMembers
    const scrollAmount = cardWidth * visibleCount
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  // Calculate dot count
  const dotCount = Math.ceil(totalMembers / getVisibleCount())
  const activeDot = Math.min(Math.floor(activeIndex / getVisibleCount()), dotCount - 1)

  return (
    <section id="team" className="bg-cream-light py-28 md:py-36">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Our team</p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            Performance analysts. Not technicians.
          </h2>
          <p className="text-[17px] text-text-secondary mt-5 max-w-xl mx-auto leading-[1.7]">
            Your scan is only as good as the person interpreting it.
          </p>
          <div className="mt-8 inline-block bg-accent/10 border border-accent/20 rounded-2xl px-8 py-5 max-w-2xl">
            <p className="text-[15px] text-text-primary leading-[1.7]">
              <span className="font-bold">Our guarantee:</span> if you complete a premium scan and don't walk away having learned something AI couldn't have told you, we'll refund your scan.
            </p>
          </div>
        </div>

        <div ref={carouselRef} className="relative">
          {/* Arrow buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute -left-4 md:-left-5 top-[35%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-warm-border shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-cream transition-colors duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={18} className="text-text-primary" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute -right-4 md:-right-5 top-[35%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-warm-border shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-cream transition-colors duration-200"
              aria-label="Next"
            >
              <ChevronRight size={18} className="text-text-primary" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="flex-shrink-0 w-[calc(100%-0px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] group"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-cream-dark border border-warm-border mb-6">
                  <div className="w-full h-full bg-gradient-to-b from-cream to-cream-dark flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="text-[56px] font-heading font-bold text-text-primary/8">
                      {member.initials}
                    </span>
                  </div>
                </div>
                <h3 className="text-[20px] font-heading font-bold">{member.name}</h3>
                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-accent mt-1.5">
                  {member.title}
                </p>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollContainerRef.current
                  if (!el) return
                  const cardWidth = el.scrollWidth / totalMembers
                  el.scrollTo({
                    left: cardWidth * i * getVisibleCount(),
                    behavior: 'smooth',
                  })
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeDot === i
                    ? 'bg-accent w-6'
                    : 'bg-text-primary/15 hover:bg-text-primary/30'
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
