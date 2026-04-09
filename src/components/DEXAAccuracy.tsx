import { useFadeIn } from '../hooks/useFadeIn'

const experts = [
  {
    name: 'Dr. John Shepherd',
    title: 'The "Godfather of DEXA". Inventor of classification algorithm used in DEXA',
    quote: 'Kalos is ...without parallel among commercial DXA scanning providers. ... consistent with a leading research institution',
    photo: '/DEXA Experts/Dr John Shepherd.jpg',
  },
  {
    name: 'Dr. Tom Kelly',
    title: 'Senior Principal Scientist of Hologic Inc., (manufacturer of DEXA)',
    quote: '... a genuine advancement in applied DEXA body composition analysis. ...not aware of another commercial DEXA provider that operates with this level of rigor.',
    photo: '/DEXA Experts/Tom Kelly.jpeg',
  },
]

export default function DEXAAccuracy() {
  const headRef = useFadeIn()
  const contentRef = useFadeIn()

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div ref={headRef} className="text-center mb-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Precision You Can Trust
          </p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            The most accurate DEXA scan in the nation
          </h2>
        </div>

        <div ref={contentRef}>
          {/* R&D Callout */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-[15px] text-text-secondary leading-[1.75] mb-3">
              Through years of R&D, we've developed a proprietary phantom which reduces DEXA calibration variance by approximately 75%. This means the changes you see between scans are real, not noise.
            </p>
            <p className="text-[15px] text-text-secondary leading-[1.75]">
              When other providers tell you that you gained 2 lbs of muscle, there's a good chance it's within the margin of error. When we tell you, it's because it actually happened.
            </p>
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-accent mt-5">3+ years of R&D · Proprietary calibration technology</p>
          </div>

          {/* Expert endorsements */}
          <div className="grid md:grid-cols-2 gap-6">
            {experts.map((expert) => (
              <div
                key={expert.name}
                className="bg-white rounded-3xl border border-warm-border p-7 lg:p-8 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] hover:border-accent/40 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start gap-4 mb-5">
                  {/* Photo */}
                  <div className="w-16 h-16 rounded-2xl bg-cream-dark shrink-0 border border-warm-border overflow-hidden">
                    <img src={expert.photo} alt={expert.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-heading font-bold text-accent leading-tight">
                      {expert.name}
                    </h4>
                    <p className="text-[13px] text-text-secondary leading-[1.5] mt-1">
                      {expert.title}
                    </p>
                  </div>
                </div>

                <blockquote className="text-[15px] text-text-secondary italic leading-[1.7] border-l-2 border-accent/30 pl-5">
                  "{expert.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
