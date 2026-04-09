import { useState } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { TrendingUp, TrendingDown, ArrowRight, BarChart3, Database, Users, Target, RotateCcw } from 'lucide-react'

// ── Types ──

interface Projection {
  muscleLbs: string
  fatLbs: string
  bodyFatDrop: string
  almiChange: string
  headline: string
}

// ── Data ──

const ageOptions = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'] as const
const daysOptions = ['2', '3', '4', '5+'] as const

// ── Helpers ──

function getProjection(gender: 'male' | 'female', age: string, days: string): Projection {
  const isMale = gender === 'male'
  const baseMuscle = isMale ? 5.5 : 3.0
  const baseFat = isMale ? 4.5 : 3.5
  const baseBfDrop = isMale ? 2.8 : 2.2
  const baseAlmi = isMale ? 12 : 10

  let ageFactor = 1.0
  if (age === '18-24') ageFactor = 1.15
  else if (age === '25-34') ageFactor = 1.05
  else if (age === '35-44') ageFactor = 0.95
  else if (age === '45-54') ageFactor = 0.85
  else if (age === '55-64') ageFactor = 0.75
  else if (age === '65+') ageFactor = 0.7

  let freqFactor = 1.0
  if (days === '2') freqFactor = 0.65
  else if (days === '3') freqFactor = 0.85
  else if (days === '4') freqFactor = 1.0
  else if (days === '5+') freqFactor = 1.15

  const muscle = baseMuscle * ageFactor * freqFactor
  const fat = baseFat * ageFactor * freqFactor
  const bfDrop = baseBfDrop * ageFactor * freqFactor
  const almi = Math.round(baseAlmi * ageFactor * freqFactor)

  const isOlder = age === '55-64' || age === '65+'
  const isMidAge = age === '45-54' || age === '35-44'
  let headline = ''
  if (isOlder) {
    headline = isMale
      ? 'Men in your age group typically see meaningful muscle preservation and fat loss. Consistency is key.'
      : 'Women in your age group often see bone density stabilize alongside real body composition shifts.'
  } else if (isMidAge) {
    headline = isMale
      ? 'This is the decade where data matters most. You have the capacity for strong results with the right plan.'
      : 'Women in their 40s and 50s respond incredibly well to structured strength training guided by data.'
  } else {
    headline = isMale
      ? 'You are in a prime window for body recomposition. Expect fast, visible changes with consistent effort.'
      : 'You are in a prime window for building a strong foundation. Expect meaningful shifts in just four weeks.'
  }

  return {
    muscleLbs: `+${muscle.toFixed(1)} lbs`,
    fatLbs: `-${fat.toFixed(1)} lbs`,
    bodyFatDrop: `-${bfDrop.toFixed(1)}%`,
    almiChange: `+${almi} %ile`,
    headline,
  }
}

// ── Callout data ──

const callouts = [
  { icon: Database, text: '1,000+ A/B tests tracked using DEXA scans' },
  { icon: BarChart3, text: 'All training, nutrition, and lifestyle inputs meticulously tracked' },
  { icon: Users, text: 'Built from real Kalos member outcomes, personalized for you' },
]

// ── Main Component ──

export default function ProjectionCalculator() {
  const headRef = useFadeIn()
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState('25-34')
  const [days, setDays] = useState('4')
  const [step, setStep] = useState<'quiz' | 'capture' | 'results'>('quiz')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const projection = getProjection(gender, age, days)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, send { firstName, lastName, email, phone, gender, age, days } to your backend
    setStep('results')
  }

  return (
    <section id="projection" className="bg-cream pt-16 md:pt-20 pb-28 md:pb-36">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headRef} className="text-center mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">4-week projection</p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            What results can you expect?
          </h2>
          <p className="text-[17px] text-text-secondary mt-5 max-w-3xl mx-auto leading-[1.7]">
            Tell us about yourself and we will show you exactly what your cohort achieves in 4 weeks, powered by one of the largest serial DEXA datasets in the world.
          </p>
        </div>

        {/* Side-by-side layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-[1200px] mx-auto">

          {/* LEFT: Key callouts */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[24px] md:text-[28px] font-heading font-bold text-text-primary leading-[1.2] mb-3">
              Projections built on real data
            </h3>
            <p className="text-[15px] text-text-secondary leading-[1.7] mb-8">
              Kalos has one of the largest serial DEXA body composition datasets in the world. Thousands of A/B tests run on real people's bodies, tracking every input between scans.
            </p>

            <div className="space-y-5">
              {callouts.map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-accent" />
                  </div>
                  <span className="text-[15px] font-semibold text-text-primary">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Quiz/form card */}
          <div className="bg-white rounded-3xl border border-warm-border p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">

            {step === 'quiz' && (
              <>
                <div className="space-y-6 mb-8">
                  {/* Row 1: Gender + Exercise days */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Gender */}
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-3">I am</label>
                      <div className="flex gap-2">
                        {(['male', 'female'] as const).map((g) => (
                          <button key={g} onClick={() => setGender(g)} className={`flex-1 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 cursor-pointer ${gender === g ? 'bg-accent text-white shadow-[0_2px_8px_rgba(184,92,56,0.2)]' : 'bg-cream border border-warm-border text-text-secondary hover:border-accent/40 hover:bg-accent/5 hover:text-text-primary'}`}>
                            {g === 'male' ? 'Male' : 'Female'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Days */}
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-3 whitespace-nowrap">Days / week</label>
                      <div className="flex gap-2">
                        {daysOptions.map((d) => (
                          <button key={d} onClick={() => setDays(d)} className={`flex-1 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 cursor-pointer ${days === d ? 'bg-accent text-white shadow-[0_2px_8px_rgba(184,92,56,0.2)]' : 'bg-cream border border-warm-border text-text-secondary hover:border-accent/40 hover:bg-accent/5 hover:text-text-primary'}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Age range */}
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-3">My age</label>
                    <div className="flex gap-2">
                      {ageOptions.map((a) => (
                        <button key={a} onClick={() => setAge(a)} className={`flex-1 py-3 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer ${age === a ? 'bg-accent text-white shadow-[0_2px_8px_rgba(184,92,56,0.2)]' : 'bg-cream border border-warm-border text-text-secondary hover:border-accent/40 hover:bg-accent/5 hover:text-text-primary'}`}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button onClick={() => setStep('capture')} className="w-full py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.25)] flex items-center justify-center gap-2">
                  See My Projection
                  <ArrowRight size={18} />
                </button>
              </>
            )}

            {step === 'capture' && (
              <form onSubmit={handleSubmit}>
                <p className="text-[16px] text-text-secondary text-center mb-8 leading-[1.7]">
                  Enter your details and we will generate your personalized 4-week projection.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-2">First name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full px-5 py-3.5 rounded-xl border border-warm-border bg-cream-light text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-2">Last name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full px-5 py-3.5 rounded-xl border border-warm-border bg-cream-light text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full px-5 py-3.5 rounded-xl border border-warm-border bg-cream-light text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-2">Phone <span className="normal-case tracking-normal font-normal italic">(optional)</span></label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full px-5 py-3.5 rounded-xl border border-warm-border bg-cream-light text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('quiz')} className="px-6 py-4 rounded-full text-[15px] font-semibold text-text-secondary border border-warm-border hover:border-text-tertiary transition-all duration-300">
                    Back
                  </button>
                  <button type="submit" className="flex-1 py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.25)] flex items-center justify-center gap-2">
                    Get My Results
                    <ArrowRight size={18} />
                  </button>
                </div>

              </form>
            )}

            {step === 'results' && (
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setStep('quiz')}
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-hover transition-colors duration-200 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    Change Answers
                  </button>
                </div>
                <div className="mb-6">
                  <p className="text-[15px] text-text-secondary leading-[1.7] italic mb-6">{projection.headline}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: TrendingUp, val: projection.muscleLbs, label: 'Lean Muscle' },
                      { icon: TrendingDown, val: projection.fatLbs, label: 'Body Fat' },
                      { icon: TrendingDown, val: projection.bodyFatDrop, label: 'Body Fat %' },
                      { icon: TrendingUp, val: projection.almiChange, label: 'ALMI Percentile' },
                    ].map((item) => (
                      <div key={item.label} className="bg-cream-light rounded-2xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1.5">
                          <item.icon size={14} className="text-green" />
                          <span className="text-[20px] font-heading font-bold text-green">{item.val}</span>
                        </div>
                        <p className="text-[11px] text-text-tertiary font-medium">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-text-tertiary text-center mb-5 leading-[1.5]">
                  Based on results from over 1,000+ Kalos members. Individual results vary based on nutrition, sleep, and adherence.
                </p>
                <a href="#pricing" className="w-full py-4 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_2px_12px_rgba(184,92,56,0.25)] flex items-center justify-center gap-2">
                  Book My Scan
                  <ArrowRight size={18} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
