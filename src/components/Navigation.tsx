import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Results', href: '#results' },
  { label: 'Our Team', href: '#team' },
  { label: 'Locations', href: '#locations' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/92 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-[76px]">
        <a href="#" className="block">
          <img
            src="/Logo - BLACK (1).svg"
            alt="Kalos"
            className={`h-8 transition-all duration-500 ${
              scrolled ? 'brightness-0' : 'brightness-0 invert'
            }`}
          />
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[14px] font-semibold tracking-wide uppercase transition-colors duration-500 ${
                scrolled
                  ? 'text-text-primary/50 hover:text-text-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#pricing"
            className={`inline-flex items-center px-7 py-3 text-[14px] font-semibold tracking-wide rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-accent text-white hover:bg-accent-hover'
                : 'bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 border border-white/20'
            }`}
          >
            Book a Scan
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 transition-colors duration-500 ${
            scrolled ? 'text-text-primary' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-cream px-6 py-8 space-y-1 border-t border-warm-border">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[15px] font-semibold text-text-primary/60 py-3"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="block text-center mt-4 px-7 py-3.5 bg-accent text-white font-semibold rounded-full"
          >
            Book a Scan
          </a>
        </div>
      )}
    </nav>
  )
}
