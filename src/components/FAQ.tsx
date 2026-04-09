import { useState } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What happens during a Premium scan?',
    a: 'You arrive, change if needed, and lie on the DEXA scanner for about 6 minutes. Then your Kalos analyst sits with you for 20 minutes, walking through your full body composition report: body fat, muscle mass by region, visceral fat, bone density, ALMI percentile, and asymmetries. You leave with a clear understanding of where you stand and what to prioritize.',
  },
  {
    q: 'Do I have to sign up for a coaching program?',
    a: "No. Many people come in for a single scan and that's it. If you want to explore coaching after seeing your results, we'll tell you about it. If you don't, no pressure. Ever.",
  },
  {
    q: "What can a Kalos analyst tell me that AI can't?",
    a: 'Our guarantee: if you complete a premium scan and don\'t walk away having learned something AI couldn\'t have told you, we\'ll refund your scan. Our analysts combine your DEXA data with your training history, goals, injury background, and lifestyle to give you advice that no algorithm can replicate.',
  },
  {
    q: 'How often should I get scanned?',
    a: 'One scan shows you where you are. Two scans show you what changed. Three scans show you the full trajectory. For most people, every 4 to 8 weeks is the sweet spot to track meaningful change.',
  },
  {
    q: 'Is the scan HSA/FSA eligible?',
    a: 'Yes. Both Premium and Basic scans are HSA/FSA eligible. You\'ll receive a receipt you can submit for reimbursement.',
  },
  {
    q: 'What should I wear?',
    a: 'Wear comfortable athletic clothing without metal (zippers, underwire, belt buckles). Leggings and a t-shirt work great. We have a changing area if needed.',
  },
  {
    q: 'Where are your locations?',
    a: 'We have three locations across the Bay Area: San Francisco, Palo Alto, and San Jose (Pruneyard). All locations offer the same scan experience with the same analyst-led consultation.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useFadeIn()

  return (
    <section id="faq" className="bg-cream-light py-28 md:py-36">
      <div className="w-full max-w-[860px] mx-auto px-6 md:px-10" ref={ref}>
        <div className="text-center mb-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">FAQ</p>
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-primary leading-[1.1]">
            Common questions
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-warm-border">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-7 text-left group"
              >
                <span className="text-[18px] font-semibold text-text-primary pr-8 group-hover:text-accent transition-colors duration-300">
                  {faq.q}
                </span>
                <div className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center shrink-0">
                  {openIndex === i ? (
                    <Minus size={16} className="text-text-secondary" />
                  ) : (
                    <Plus size={16} className="text-text-secondary" />
                  )}
                </div>
              </button>
              <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
                <div>
                  <p className="pb-7 text-[16px] text-text-secondary leading-[1.8] pr-12">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
