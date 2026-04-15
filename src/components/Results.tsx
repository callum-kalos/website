import { useState, useMemo, useRef, useEffect } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight, ArrowRight, X, BarChart3, User, RotateCcw } from 'lucide-react'

// ── Types ──

interface Delta {
  label: string
  value: string
  direction: 'up' | 'down'
}

interface DashboardMetric {
  label: string
  before: string
  after: string
  change: string
  direction: 'up' | 'down'
  barPercent: number
}

interface ProgramDetail {
  label: string
  value: string
}

interface CaseStudy {
  name: string
  age: number
  gender: 'male' | 'female'
  role: string
  goal: string
  goalLabel: string
  before: string
  deltas: Delta[]
  quote: string
  tag: string
  dashboard: {
    duration: string
    scans: number
    metrics: DashboardMetric[]
    program: ProgramDetail[]
    summary: string
  }
}

// ── Data ──

const caseStudies: CaseStudy[] = [
  {
    name: 'Jeff',
    age: 53,
    gender: 'male',
    role: 'Engineer',
    goal: 'gain-muscle',
    goalLabel: 'Feel confident with his shirt off on vacation and have the energy to keep up with his teenage kids on hikes.',
    before: "Hadn't strength trained since college. Walking the dog was his only exercise.",
    deltas: [
      { label: 'Muscle', value: '+11.5 lbs', direction: 'up' },
      { label: 'Fat', value: '-6 lbs', direction: 'down' },
      { label: 'Body Fat', value: '30.2% → 26.6%', direction: 'down' },
      { label: 'ALMI', value: '35th → 62nd %ile', direction: 'up' },
    ],
    quote: 'The hard numbers really help quantify exactly how the gap is.',
    tag: '4-week member',
    dashboard: {
      duration: '4 weeks',
      scans: 2,
      metrics: [
        { label: 'Lean Muscle', before: '142.3 lbs', after: '153.8 lbs', change: '+11.5 lbs', direction: 'up', barPercent: 92 },
        { label: 'Body Fat', before: '48.2 lbs', after: '42.2 lbs', change: '-6.0 lbs', direction: 'down', barPercent: 75 },
        { label: 'Body Fat %', before: '30.2%', after: '26.6%', change: '-3.6%', direction: 'down', barPercent: 68 },
        { label: 'ALMI', before: '35th %ile', after: '62nd %ile', change: '+27 %ile', direction: 'up', barPercent: 85 },
        { label: 'Total Weight', before: '196.5 lbs', after: '202.0 lbs', change: '+5.5 lbs', direction: 'up', barPercent: 45 },
        { label: 'Visceral Fat', before: '1.8 lbs', after: '1.4 lbs', change: '-0.4 lbs', direction: 'down', barPercent: 55 },
      ],
      program: [
        { label: 'Training', value: '4x/week upper/lower split, 55-min sessions. Barbell and dumbbell compounds in the gym.' },
        { label: 'Nutrition', value: '180g protein/day. Example: eggs and oats AM, chicken rice bowl lunch, salmon with sweet potato dinner. Post-workout shake within 30 min.' },
        { label: 'Key priority', value: 'Compound lifts pushed to failure. Squat, bench, deadlift, overhead press with progressive overload each week.' },
      ],
      summary: 'Jeff gained significant muscle while losing fat. His body fat percentage dropped 3.6 points and his ALMI jumped from the 35th to the 62nd percentile in just 4 weeks.',
    },
  },
  {
    name: 'Maki',
    age: 62,
    gender: 'female',
    role: 'Retiree',
    goal: 'bone-density',
    goalLabel: 'Be able to pick up and carry her grandkids for the next 20 years without worrying about breaking a bone.',
    before: 'Wanted to stay mobile and active for her grandkids. Had never lifted weights.',
    deltas: [
      { label: 'Muscle', value: '+1.5 lbs', direction: 'up' },
      { label: 'Fat', value: '-0.5 lb', direction: 'down' },
      { label: 'Left Arm', value: '+7-8% muscle', direction: 'up' },
    ],
    quote: 'The process has been sustainable and empowering. I feel stronger every week.',
    tag: '4-week member',
    dashboard: {
      duration: '4 weeks',
      scans: 2,
      metrics: [
        { label: 'Lean Muscle', before: '89.2 lbs', after: '90.7 lbs', change: '+1.5 lbs', direction: 'up', barPercent: 55 },
        { label: 'Body Fat', before: '42.8 lbs', after: '42.3 lbs', change: '-0.5 lbs', direction: 'down', barPercent: 40 },
        { label: 'Left Arm Muscle', before: '3.1 lbs', after: '3.4 lbs', change: '+7.8%', direction: 'up', barPercent: 72 },
        { label: 'Right Arm Muscle', before: '3.4 lbs', after: '3.6 lbs', change: '+5.9%', direction: 'up', barPercent: 60 },
        { label: 'Bone Density', before: '-1.2 T', after: '-1.1 T', change: '+0.1 T', direction: 'up', barPercent: 48 },
      ],
      program: [
        { label: 'Training', value: '3x/week full body, 45-min sessions. Machine-based with guided dumbbell work for safety and confidence.' },
        { label: 'Nutrition', value: '100g protein/day. Example: Greek yogurt with berries AM, tuna salad lunch, grilled chicken with greens dinner. Calcium and vitamin D supplementation daily.' },
        { label: 'Key priority', value: 'Load-bearing exercises for bone strength. Single-arm and single-leg work to correct left-right imbalances.' },
      ],
      summary: 'At 62, Maki added lean muscle and began correcting a significant left-right arm imbalance. Her bone density held stable, which is a major win at her age.',
    },
  },
  {
    name: 'Justin',
    age: 34,
    gender: 'male',
    role: 'Startup CEO',
    goal: 'accountability',
    goalLabel: 'Stop losing progress every time he travels for work. Build a physique he can maintain on the road, not just at home.',
    before: "On a good streak, then travel derails everything. Couldn't maintain consistency alone.",
    deltas: [
      { label: 'Bench PR', value: '165 lbs', direction: 'up' },
      { label: 'Consistency', value: 'Through 3 weeks travel', direction: 'up' },
    ],
    quote: "The DEXA scan piece is nice to have. But more than anything, it's you and the relationship with you and somebody to hold me accountable.",
    tag: '1-year member',
    dashboard: {
      duration: '12 months',
      scans: 8,
      metrics: [
        { label: 'Lean Muscle', before: '155.0 lbs', after: '163.2 lbs', change: '+8.2 lbs', direction: 'up', barPercent: 80 },
        { label: 'Body Fat', before: '28.5 lbs', after: '24.1 lbs', change: '-4.4 lbs', direction: 'down', barPercent: 65 },
        { label: 'Body Fat %', before: '16.8%', after: '13.9%', change: '-2.9%', direction: 'down', barPercent: 62 },
        { label: 'Bench Press', before: '135 lbs', after: '165 lbs', change: '+30 lbs', direction: 'up', barPercent: 75 },
        { label: 'Training Consistency', before: '2-3x/week', after: '4-5x/week', change: 'Through travel', direction: 'up', barPercent: 88 },
      ],
      program: [
        { label: 'Training', value: '4-5x/week push/pull/legs, 50-min sessions. Barbell compounds at home gym, dumbbell-only hotel workouts when traveling.' },
        { label: 'Nutrition', value: '190g protein/day. Sunday meal prep: pre-portioned chicken, rice, veggie containers. Travel days: protein-forward restaurant picks and portable shakes.' },
        { label: 'Key priority', value: 'Maintaining consistency through travel. Hotel gym alternatives mapped for every trip. Weekly analyst check-ins for accountability.' },
      ],
      summary: 'Over 12 months and 8 scans, Justin maintained consistency even through 3 weeks of travel. His bench press increased 30 lbs and he dropped nearly 3% body fat.',
    },
  },
  {
    name: 'Sarah',
    age: 28,
    gender: 'female',
    role: 'Product Manager',
    goal: 'recomposition',
    goalLabel: 'Look and feel athletic, not just "skinny." Build visible muscle definition and stop guessing whether her workouts are actually working.',
    before: 'Felt healthy but had no baseline data. Wanted to optimize, not just maintain.',
    deltas: [
      { label: 'Muscle', value: '+4.2 lbs', direction: 'up' },
      { label: 'Fat', value: '-3.8 lbs', direction: 'down' },
      { label: 'Body Fat', value: '28.1% → 24.3%', direction: 'down' },
    ],
    quote: 'Seeing the actual numbers changed how I train. I stopped guessing and started progressing.',
    tag: '4-week member',
    dashboard: {
      duration: '4 weeks',
      scans: 2,
      metrics: [
        { label: 'Lean Muscle', before: '102.4 lbs', after: '106.6 lbs', change: '+4.2 lbs', direction: 'up', barPercent: 72 },
        { label: 'Body Fat', before: '40.1 lbs', after: '36.3 lbs', change: '-3.8 lbs', direction: 'down', barPercent: 70 },
        { label: 'Body Fat %', before: '28.1%', after: '24.3%', change: '-3.8%', direction: 'down', barPercent: 78 },
        { label: 'ALMI', before: '48th %ile', after: '65th %ile', change: '+17 %ile', direction: 'up', barPercent: 68 },
        { label: 'Visceral Fat', before: '0.9 lbs', after: '0.6 lbs', change: '-0.3 lbs', direction: 'down', barPercent: 50 },
      ],
      program: [
        { label: 'Training', value: '4x/week upper/lower split, 50-min sessions. Dumbbell and cable machine focus in the gym. 1x HIIT, 2x zone 2 cycling.' },
        { label: 'Nutrition', value: '130g protein/day in a slight deficit. Example: protein smoothie AM, turkey wrap lunch, stir-fry with tofu dinner. Timed carbs around workouts.' },
        { label: 'Key priority', value: 'Recomposition, not weight loss. Compound lifts pushed to failure. Tracking scale weight and DEXA separately to avoid misleading numbers.' },
      ],
      summary: 'Sarah achieved a textbook body recomposition, gaining 4.2 lbs of muscle while losing 3.8 lbs of fat. Her body fat percentage dropped nearly 4 points in just 4 weeks.',
    },
  },
  {
    name: 'David',
    age: 45,
    gender: 'male',
    role: 'Attorney',
    goal: 'gain-muscle',
    goalLabel: 'Stop being "the thin guy who runs." Build enough strength to ski with his kids and protect his joints as he ages.',
    before: 'Ran marathons but was losing muscle mass. Doctor suggested a body composition check.',
    deltas: [
      { label: 'Muscle', value: '+6.3 lbs', direction: 'up' },
      { label: 'ALMI', value: '42nd → 71st %ile', direction: 'up' },
      { label: 'Bone Density', value: '+2.1% T-score', direction: 'up' },
    ],
    quote: 'I thought I was fit. Turns out I was just thin. Kalos helped me see the difference.',
    tag: '1-year member',
    dashboard: {
      duration: '12 months',
      scans: 6,
      metrics: [
        { label: 'Lean Muscle', before: '138.5 lbs', after: '144.8 lbs', change: '+6.3 lbs', direction: 'up', barPercent: 78 },
        { label: 'Body Fat %', before: '18.4%', after: '15.2%', change: '-3.2%', direction: 'down', barPercent: 65 },
        { label: 'ALMI', before: '42nd %ile', after: '71st %ile', change: '+29 %ile', direction: 'up', barPercent: 88 },
        { label: 'Bone Density', before: '0.0 T', after: '+0.3 T', change: '+2.1%', direction: 'up', barPercent: 58 },
        { label: 'Leg Muscle', before: '42.1 lbs', after: '46.8 lbs', change: '+4.7 lbs', direction: 'up', barPercent: 75 },
      ],
      program: [
        { label: 'Training', value: '4x/week, 1-hour sessions. 2x barbell strength days, 2x hybrid strength-cardio. Reduced running to 2x/week, added weighted rucking.' },
        { label: 'Nutrition', value: '160g protein/day (doubled from before). Example: egg scramble AM, grilled chicken salad lunch, steak with roasted vegetables dinner. Added creatine supplementation.' },
        { label: 'Key priority', value: 'Load-bearing compound lifts for bone density. Gradual shift from endurance to strength without losing cardio base.' },
      ],
      summary: 'David transitioned from endurance-only training to a balanced program. He gained 6.3 lbs of lean muscle, improved his ALMI by 29 percentile points, and saw meaningful bone density gains.',
    },
  },
  {
    name: 'Lisa',
    age: 55,
    gender: 'female',
    role: 'Teacher',
    goal: 'bone-density',
    goalLabel: 'Stay independent and active into her 70s. Be able to garden, travel, and carry groceries without pain or fear of injury.',
    before: 'Post-menopause, worried about bone density and muscle loss. Felt lost at the gym.',
    deltas: [
      { label: 'Muscle', value: '+3.1 lbs', direction: 'up' },
      { label: 'Bone Density', value: 'Stable', direction: 'up' },
      { label: 'Body Fat', value: '35.4% → 31.8%', direction: 'down' },
    ],
    quote: 'My doctor was impressed at my last checkup. The data gave me confidence to keep going.',
    tag: '4-week member',
    dashboard: {
      duration: '4 weeks',
      scans: 2,
      metrics: [
        { label: 'Lean Muscle', before: '94.2 lbs', after: '97.3 lbs', change: '+3.1 lbs', direction: 'up', barPercent: 65 },
        { label: 'Body Fat', before: '51.8 lbs', after: '48.4 lbs', change: '-3.4 lbs', direction: 'down', barPercent: 68 },
        { label: 'Body Fat %', before: '35.4%', after: '31.8%', change: '-3.6%', direction: 'down', barPercent: 72 },
        { label: 'Bone Density', before: '-1.4 T', after: '-1.4 T', change: 'Stable', direction: 'up', barPercent: 45 },
        { label: 'Trunk Muscle', before: '38.1 lbs', after: '39.8 lbs', change: '+1.7 lbs', direction: 'up', barPercent: 55 },
      ],
      program: [
        { label: 'Training', value: '3x/week full body, 45-min sessions. Machine and dumbbell work in the gym with guided form coaching. 1x yoga, daily walks.' },
        { label: 'Nutrition', value: '110g protein/day. Example: overnight oats with protein powder AM, lentil soup lunch, baked salmon with quinoa dinner. Vitamin D and calcium supplementation daily.' },
        { label: 'Key priority', value: 'Load-bearing exercises for bone density preservation. Core strengthening and balance work to reduce fall risk.' },
      ],
      summary: 'Lisa lost 3.4 lbs of fat and gained 3.1 lbs of muscle in 4 weeks. Critically, her bone density held stable post-menopause, which her doctor highlighted as a significant positive.',
    },
  },
]

const ageRanges = [
  { label: 'All ages', min: 0, max: 100 },
  { label: '20s-30s', min: 20, max: 39 },
  { label: '40s-50s', min: 40, max: 59 },
  { label: '60+', min: 60, max: 100 },
]

const goalFilters = [
  { label: 'All goals', value: 'all' },
  { label: 'Lose fat', value: 'lose-fat' },
  { label: 'Gain muscle', value: 'gain-muscle' },
  { label: 'Recomposition', value: 'recomposition' },
  { label: 'Bone density', value: 'bone-density' },
  { label: 'Accountability', value: 'accountability' },
]

// ── Helpers ──

function DeltaChip({ delta }: { delta: Delta }) {
  const Icon = delta.direction === 'up' ? TrendingUp : TrendingDown
  return (
    <div className="inline-flex items-center gap-1.5 bg-green/8 px-3 py-1.5 rounded-full">
      <Icon size={13} className="text-green" />
      <span className="text-[13px] font-bold text-green">{delta.value}</span>
      <span className="text-[12px] text-text-tertiary font-medium">{delta.label}</span>
    </div>
  )
}

// ── Results Dashboard Modal ──

function ResultsModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  const { dashboard } = study

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto shadow-[0_32px_80px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-cream-light flex items-center justify-center hover:bg-cream-dark transition-colors z-10">
          <X size={18} className="text-text-primary" />
        </button>

        {/* Header */}
        <div className="p-8 pb-0 md:p-10 md:pb-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent bg-accent/8 px-3 py-1.5 rounded-full">{study.tag}</span>
            <span className="text-[12px] text-text-tertiary">{dashboard.duration} · {dashboard.scans} scans</span>
          </div>
          <h3 className="text-[28px] md:text-[32px] font-heading font-bold text-text-primary mt-3">
            {study.name}, {study.age}
          </h3>
          <p className="text-[14px] text-text-tertiary">{study.role}</p>
          <p className="text-[15px] text-text-secondary italic mt-3 leading-[1.7]">{study.before}</p>
        </div>

        {/* Metrics */}
        <div className="p-8 md:p-10">
          <div className="space-y-5">
            {dashboard.metrics.map((metric) => {
              const Icon = metric.direction === 'up' ? TrendingUp : TrendingDown
              return (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] font-semibold text-text-primary">{metric.label}</span>
                    <div className="flex items-center gap-1.5">
                      <Icon size={13} className="text-green" />
                      <span className="text-[14px] font-bold text-green">{metric.change}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] text-text-tertiary w-20 shrink-0">{metric.before}</span>
                    <div className="flex-1 h-3 bg-cream-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent/60 to-green rounded-full transition-all duration-700"
                        style={{ width: `${metric.barPercent}%` }}
                      />
                    </div>
                    <span className="text-[12px] font-bold text-text-primary w-20 shrink-0 text-right">{metric.after}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Program details */}
          <div className="mt-8 pt-6 border-t border-warm-border">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-4">{study.gender === 'male' ? 'His' : 'Her'} program</h4>
            <div className="grid grid-cols-2 gap-3">
              {dashboard.program.map((item) => (
                <div key={item.label} className="bg-cream-light rounded-xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent mb-1.5">{item.label}</p>
                  <p className="text-[13px] text-text-secondary leading-[1.6]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 pt-6 border-t border-warm-border">
            <p className="text-[15px] text-text-secondary leading-[1.7]">{dashboard.summary}</p>
          </div>

          {/* Quote */}
          <blockquote className="mt-6 pt-6 border-t border-warm-border text-[15px] text-text-secondary italic leading-[1.7]">
            "{study.quote}"
          </blockquote>

          {/* CTA */}
          <a href="#pricing" onClick={onClose} className="mt-8 w-full py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.25)] flex items-center justify-center gap-2">
            Book My Scan
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Flip Card ──

function FlipCard({ study, onViewModal: _onViewModal }: { study: CaseStudy; onViewModal: () => void }) {
  const [flipped, setFlipped] = useState(false)
  const { dashboard } = study

  return (
    <div
      className="h-[520px] cursor-pointer group/card"
      style={{ perspective: '1200px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`flip-card-inner relative w-full h-full ${flipped ? 'flipped' : ''}`}
      >
        {/* ── FRONT ── */}
        <div className="flip-card-front absolute inset-0 bg-white rounded-3xl p-8 lg:p-10 border border-warm-border flex flex-col group-hover/card:border-accent/30 group-hover/card:shadow-[0_16px_48px_rgba(0,0,0,0.08)] group-hover/card:-translate-y-1 transition-all duration-300">
          {/* Avatar + Name row */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border-2 border-accent/20">
              <User size={24} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-[22px] font-heading font-bold leading-tight">{study.name}, {study.age}</h3>
                  <p className="text-[13px] text-text-tertiary mt-0.5">{study.role}</p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-accent bg-accent/8 px-2.5 py-1.5 rounded-full whitespace-nowrap shrink-0">{study.tag}</span>
              </div>
            </div>
          </div>

          <p className="text-[14px] text-text-secondary italic leading-[1.65] mb-5">{study.before}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {study.deltas.map((d, i) => <DeltaChip key={i} delta={d} />)}
          </div>

          <blockquote className="pt-5 border-t border-warm-border text-[14px] text-text-secondary leading-[1.65] mb-5 flex-1">"{study.quote}"</blockquote>

          <div
            className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-[13px] font-bold text-white rounded-full shadow-[0_2px_12px_rgba(184,92,56,0.25)] group-hover/card:bg-accent-hover transition-all duration-300"
          >
            <BarChart3 size={15} />
            View Full Approach
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="flip-card-back absolute inset-0 bg-white rounded-3xl p-7 lg:p-8 border border-warm-border flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[17px] font-heading font-bold leading-tight">{study.name}'s Journey</h3>
              <p className="text-[11px] text-text-tertiary mt-0.5">{dashboard.duration} · {dashboard.scans} scans</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-cream-light flex items-center justify-center hover:bg-cream-dark transition-colors">
              <RotateCcw size={14} className="text-text-secondary" />
            </div>
          </div>

          {/* 1. Goal */}
          <div className="mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-1.5">Goal</p>
            <p className="text-[13px] text-text-primary font-medium leading-[1.5]">{study.goalLabel}</p>
          </div>

          {/* 2. Approach */}
          <div className="mb-3 pt-3 border-t border-warm-border">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-2">Approach</p>
            <div className="space-y-1.5">
              {dashboard.program.slice(0, 3).map((item) => (
                <div key={item.label} className="flex gap-2">
                  <span className="text-[11px] font-bold text-text-tertiary shrink-0 w-[70px]">{item.label}</span>
                  <span className="text-[11px] text-text-secondary leading-[1.5]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Results */}
          <div className="pt-3 border-t border-warm-border flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-2">Results</p>
            <div className="space-y-2.5">
              {dashboard.metrics.slice(0, 3).map((metric) => {
                const Icon = metric.direction === 'up' ? TrendingUp : TrendingDown
                return (
                  <div key={metric.label} className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-text-primary">{metric.label}</span>
                    <div className="flex items-center gap-1">
                      <Icon size={11} className="text-green" />
                      <span className="text-[12px] font-bold text-green">{metric.change}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-3 w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-[13px] font-bold text-white rounded-full hover:bg-accent-hover transition-all duration-300">
            <RotateCcw size={14} />
            Flip Back
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Member Results ──

function MemberResults() {
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all')
  const [ageFilter, setAgeFilter] = useState(0)
  const [goalFilter, setGoalFilter] = useState('all')
  const [startIndex, setStartIndex] = useState(0)
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      if (genderFilter !== 'all' && study.gender !== genderFilter) return false
      const range = ageRanges[ageFilter]
      if (study.age < range.min || study.age > range.max) return false
      if (goalFilter !== 'all' && study.goal !== goalFilter) return false
      return true
    })
  }, [genderFilter, ageFilter, goalFilter])

  const visibleCount = 3
  const maxStart = Math.max(0, filtered.length - visibleCount)
  const safeStart = Math.min(startIndex, maxStart)
  const canGoLeft = safeStart > 0
  const canGoRight = safeStart < maxStart
  const goLeft = () => setStartIndex(Math.max(0, safeStart - 1))
  const goRight = () => setStartIndex(Math.min(maxStart, safeStart + 1))

  useMemo(() => { setStartIndex(0) }, [genderFilter, ageFilter, goalFilter])

  const visibleStudies = filtered.slice(safeStart, safeStart + visibleCount)

  return (
    <>
      {/* Gender + Age filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        {(['all', 'male', 'female'] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGenderFilter(g)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer ${
              genderFilter === g
                ? 'bg-accent text-white shadow-[0_2px_8px_rgba(184,92,56,0.2)]'
                : 'bg-cream border border-warm-border text-text-secondary hover:text-text-primary hover:border-accent/40 hover:bg-accent/5 hover:-translate-y-0.5'
            }`}
          >
            {g === 'all' ? 'All' : g === 'male' ? 'Male' : 'Female'}
          </button>
        ))}
        <div className="w-px h-6 bg-warm-border mx-2 hidden sm:block" />
        {ageRanges.map((range, i) => (
          <button
            key={range.label}
            onClick={() => setAgeFilter(i)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer ${
              ageFilter === i
                ? 'bg-accent text-white shadow-[0_2px_8px_rgba(184,92,56,0.2)]'
                : 'bg-cream border border-warm-border text-text-secondary hover:text-text-primary hover:border-accent/40 hover:bg-accent/5 hover:-translate-y-0.5'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-warm-border mb-4" />

      {/* Goal filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {goalFilters.map((goal) => (
          <button
            key={goal.value}
            onClick={() => setGoalFilter(goal.value)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer ${
              goalFilter === goal.value
                ? 'bg-accent text-white shadow-[0_2px_8px_rgba(184,92,56,0.2)]'
                : 'bg-cream border border-warm-border text-text-secondary hover:text-text-primary hover:border-accent/40 hover:bg-accent/5 hover:-translate-y-0.5'
            }`}
          >
            {goal.label}
          </button>
        ))}
      </div>

      <div className="relative">
        {canGoLeft && (
          <button onClick={goLeft} className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-warm-border shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300" aria-label="Previous">
            <ChevronLeft size={20} className="text-text-primary" />
          </button>
        )}
        {canGoRight && (
          <button onClick={goRight} className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-warm-border shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300" aria-label="Next">
            <ChevronRight size={20} className="text-text-primary" />
          </button>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[17px] text-text-secondary">No results match your filters. Try adjusting above.</p>
          </div>
        ) : (
          <div ref={carouselRef} className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {visibleStudies.map((study) => (
              <FlipCard key={study.name} study={study} onViewModal={() => setSelectedStudy(study)} />
            ))}
          </div>
        )}

        {selectedStudy && <ResultsModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />}

        {filtered.length > visibleCount && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxStart + 1 }).map((_, i) => (
              <button key={i} onClick={() => setStartIndex(i)} className={`rounded-full transition-all duration-300 ${i === safeStart ? 'w-8 h-2.5 bg-accent' : 'w-2.5 h-2.5 bg-text-tertiary/30 hover:bg-text-tertiary/50'}`} aria-label={`Page ${i + 1}`} />
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-[13px] text-text-tertiary mt-10 font-medium">
        Real results from real Kalos members. No inflated numbers.
      </p>

      {/* CTA linking to projection */}
      <div className="text-center mt-12">
        <a
          href="#projection"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.25)] hover:-translate-y-0.5"
        >
          See what's possible for you
          <ArrowRight size={18} />
        </a>
      </div>
    </>
  )
}

// ── Main Section ──

export default function Results() {
  const headRef = useFadeIn()

  return (
    <section id="results" className="bg-cream-light py-28 md:py-36">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Beyond the scan</p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            Your scan is the starting line, not the finish.
          </h2>
          <p className="text-[17px] text-text-secondary mt-5 max-w-3xl mx-auto leading-[1.7]">
            Over a thousand members come back for scans every month, using each one to A/B test hyper-personalized training and nutrition programs. Every visit shows real, measurable progress towards their health and fitness goals.
          </p>
        </div>

        <MemberResults />
      </div>
    </section>
  )
}
