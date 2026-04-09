import { useState, useRef, useEffect, useMemo } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { ChevronLeft, ChevronRight, Play, Plus, Minus } from 'lucide-react'

const team = [
  {
    name: 'Harsh Sinha',
    title: 'Founder',
    initials: 'HS',
    bio: 'Harsh is a former Meta AI Data Scientist and Equinox personal trainer who is certified by the National Academy of Sports Medicine in personal training and nutrition coaching. He holds a Bachelor\'s Degree in Computer Science from Harvard University.',
  },
  {
    name: 'Callum Parker',
    title: 'Co-Founder',
    initials: 'CP',
    bio: 'Callum is a former 800m runner (PR: 1:54) and was the first person to join the 1000lb club and run a 4:30 mile on the same day. He holds a Bachelor\'s Degree in Economics from the University of Cambridge. He is certified by the National Academy of Sports Medicine in personal training and nutrition coaching.',
  },
  {
    name: 'Alex Shultz',
    title: 'General Manager',
    initials: 'AS',
    bio: 'Alex is a former Division I collegiate swimmer from Yale University and Olympic Trials qualifier. He has worked with Olympic medalists, professional triathletes, and general fitness enthusiasts looking to improve strength and longevity. He is certified by the National Academy of Sports Medicine in personal training and nutrition coaching.',
  },
  {
    name: 'Matteo Ascherio-Victoria',
    title: 'General Manager',
    initials: 'MA',
    bio: 'Matteo is a semi-professional soccer player, calisthenics athlete and former Data Scientist at Accenture. He holds a Bachelor\'s degree in Quantitative Science and Human Health from Emory University. He is certified by the National Academy of Sports Medicine in personal training and nutrition coaching and is a 200-hour certified yoga teacher.',
  },
  {
    name: 'Sean Corcoran',
    title: 'Performance Analyst',
    initials: 'SC',
    bio: 'Sean is a former software engineer at ServiceNow with an obsession for weights and running. He\'s benched over 3 plates and ran a marathon in 3 hours, as well as completing multiple Ironman and Ultramarathon races. He holds a Bachelor\'s degree in Computer Science from Cornell University and is certified by the National Academy of Sports Medicine in personal training and nutrition coaching.',
  },
  {
    name: 'Daniel Christensen',
    title: 'Performance Analyst',
    initials: 'DC',
    bio: 'Daniel is a Performance Analyst at Kalos with experience coaching physique competitors, semi-professional and professional fighters, and high-performing professionals. His recent work focuses on busy parents and professionals committed to rebuilding strength, improving body composition, and prioritizing long-term health. Daniel is a NASM Certified Personal Trainer, NASN Licensed Prime Sport Nutritionist, and Neurological Profiling (Neurotyping) Specialist. He holds a Bachelor\'s degree in Recording Arts from Middlesex University (UK). Outside of work, Daniel plays guitar, produces music, trains Brazilian Jiu-Jitsu, owns 6 chickens, and has a combined Squat, Bench, and Deadlift total exceeding 1,600 pounds.',
  },
  {
    name: 'Noah Feinberg',
    title: 'Performance Analyst',
    initials: 'NF',
    bio: 'Noah is a strength and conditioning coach and sport scientist who has worked across the UFC, NHL, Olympic wrestling, and with everyday athletes. He\'s been fortunate to train UFC champions and Olympic medalists, and has also spent time in human performance research at the Mayo Clinic. He holds an MSc in Strength and Conditioning from Arizona State University.',
  },
  {
    name: 'Thérèse Harvey',
    title: 'Performance Analyst',
    initials: 'TH',
    bio: 'Thérèse has a decade of experience in fitness coaching. She was a Tier 3 trainer for Equinox before transitioning to private coaching, where she specialized in helping clients of all ages build muscle with an emphasis on optimizing biomechanics. She was also a Head Trainer for F45, where she coached 300+ members and guided coach development in movement analysis and cue refinement. She\'s led classes and workshops across the city from barbell technique to pole dance and has multiple certifications including mobility and kettlebell training, pain-free strength performance and movement flow.',
  },
  {
    name: 'Sophie Klube',
    title: 'Performance Analyst',
    initials: 'SK',
    bio: 'Sophie is a former competitive swimmer, Equinox Personal Trainer, and Pilates Instructor. She won the College Club National Championship in the 200 and 500 Yard Freestyle, and competed at Australian Nationals representing Sydney University. Sophie earned her Bachelor\'s degree with honors in Psychology from the University of California, Berkeley and is certified by the National Academy of Sports Medicine in personal training and nutrition coaching.',
  },
  {
    name: 'Joshua Lee',
    title: 'Performance Analyst',
    initials: 'JL',
    bio: 'Joshua is a former product manager at Zelle and a founder with a lifelong passion for fitness and health. A competitive powerlifter, he\'s benched over 300 lbs and squatted and deadlifted more than 400 lbs, all at under 150 lbs body weight. He earned his Bachelor\'s degree in Mathematics from the University of Washington.',
  },
  {
    name: 'Chris McHughes',
    title: 'Performance Analyst',
    initials: 'CM',
    bio: 'Chris is a former multi-sport athlete, with over 15 years of expertise in bodybuilding as a coach and competitor. He ran the 49ers Affiliate Gym as the Fitness Manager, and trained athletes as an elite coach. He holds a Bachelor\'s degree in Communications and Film from the University of Arkansas, and is certified by the National Academy of Sports Medicine in personal training and nutrition.',
  },
  {
    name: 'Ben Mefford',
    title: 'Performance Analyst',
    initials: 'BM',
    bio: 'Ben is a former competitive swimmer and swim coach with experience coaching both elite swimming and weightlifting. He holds a Bachelor\'s degree in Molecular & Cell Biology, with an emphasis in Physiology, from the University of California, Berkeley, and is certified by the National Academy of Sports Medicine in personal training.',
  },
  {
    name: 'Morgan Mitchell',
    title: 'Performance Analyst',
    initials: 'MM',
    bio: 'Morgan is a former consultant at KPMG with over a decade of experience in weightlifting and competitive soccer and volleyball. She was recognized as the Top Female Trainer at Equinox Sports Club San Francisco in both 2023 and 2024 before joining Kalos. Morgan is a certified personal trainer and nutrition coach, with additional experience teaching swim lessons and preparing clients for elite athletic events such as Ironman competitions and triathlons.',
  },
  {
    name: 'Lexy Nevis',
    title: 'Performance Analyst',
    initials: 'LN',
    bio: 'Lexy is a former competitive lacrosse player and state champion. She has been lifting since age 14 and studied the psychology of coaching and elite athletes at Cal Poly, focusing on motivation and performance under pressure. She brings her experience as well as her NASM personal training and nutrition certification into her coaching, to help Kalos members build strength, stay consistent, and perform at their best.',
  },
  {
    name: 'Max Shakespeare',
    title: 'Performance Analyst',
    initials: 'MS',
    bio: 'Max is a former world champion and competitive rower with 15 years of experience in elite sport, representing Team GB, Harvard and Stanford. He holds a degree in Psychology from Harvard and a Master\'s in Community Health and Prevention Research from Stanford. Max combines his background in behavior change and well-being with his athletic experience to help Kalos members make lasting, positive health improvements.',
  },
]

export default function Team() {
  const headRef = useFadeIn()
  const carouselRef = useFadeIn()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const shuffledTeam = useMemo(() => {
    const arr = [...team]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])

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

  const toggleBio = (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedMember(expandedMember === name ? null : name)
  }

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
            {shuffledTeam.map((member) => (
              <div
                key={member.name}
                className="flex-shrink-0 w-[calc(100%-0px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] group"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-cream-dark border border-warm-border mb-6 relative">
                  <div className="w-full h-full bg-gradient-to-b from-cream to-cream-dark flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="text-[56px] font-heading font-bold text-text-primary/8">
                      {member.initials}
                    </span>
                  </div>
                  <button
                    className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/40 cursor-pointer"
                    aria-label={`Play intro video for ${member.name}`}
                    onClick={() => {}}
                  >
                    <Play size={16} className="text-white ml-0.5" fill="white" />
                  </button>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[20px] font-heading font-bold">{member.name}</h3>
                    <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-accent mt-1.5">
                      {member.title}
                    </p>
                  </div>
                  <button
                    onClick={(e) => toggleBio(member.name, e)}
                    className="mt-1 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 hover:bg-accent/20 transition-colors duration-200 cursor-pointer"
                    aria-label={`${expandedMember === member.name ? 'Hide' : 'Show'} bio for ${member.name}`}
                  >
                    {expandedMember === member.name ? (
                      <Minus size={14} className="text-accent" />
                    ) : (
                      <Plus size={14} className="text-accent" />
                    )}
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedMember === member.name ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[13px] text-text-secondary leading-[1.7]">{member.bio}</p>
                </div>
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
