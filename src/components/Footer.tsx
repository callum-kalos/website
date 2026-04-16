import { Link } from 'react-router-dom'

const footerLinks: Record<string, { label: string; href: string; internal?: boolean }[]> = {
  Company: [
    { label: 'About', href: '#' },
    { label: 'Team', href: '/#team' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Services: [
    { label: 'Premium Scan', href: '/#pricing' },
    { label: 'Basic Scan', href: '/#pricing' },
    { label: 'Coaching', href: '#' },
    { label: 'Corporate', href: '#' },
  ],
  Locations: [
    { label: 'San Francisco', href: '/locations/san-francisco', internal: true },
    { label: 'Palo Alto', href: '/locations/palo-alto', internal: true },
    { label: 'San Jose', href: '/locations/san-jose', internal: true },
  ],
  Support: [
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-20">
        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 mb-16">
          <div className="md:col-span-1">
            <img src="/Logo - BLACK (1).svg" alt="Kalos" className="h-7 brightness-0 invert" />
            <p className="text-[14px] mt-5 leading-[1.75] text-white/35">
              Clinical-grade body composition scanning and coaching across the Bay Area.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-6">{title}</h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.internal ? (
                      <Link
                        to={link.href}
                        className="text-[14px] text-white/45 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[14px] text-white/45 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/30">
            Join 10,000+ people who have transformed their health with Kalos.
          </p>
          <p className="text-[12px] text-white/20">
            &copy; {new Date().getFullYear()} Kalos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
