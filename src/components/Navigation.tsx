import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, MapPin } from 'lucide-react'
import { locationsList } from '../data/locations'

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Results', href: '/#results' },
  { label: 'Our Team', href: '/#team' },
  { label: 'Locations', href: '/#locations', hasDropdown: true },
  { label: 'FAQ', href: '/#faq' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLocationsOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setLocationsOpen(true)
  }
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setLocationsOpen(false), 150)
  }

  // On location pages the nav always shows the scrolled (opaque) style,
  // because we don't want a transparent nav over a light cream section
  // if the hero image hasn't loaded yet.
  const forceScrolled = !isHome || scrolled

  /**
   * Resolve anchor hrefs. On the homepage, #pricing → #pricing.
   * On other pages, #pricing → /#pricing (navigates home first).
   */
  const resolveHref = (href: string) => {
    if (isHome && href.startsWith('/#')) return href.replace('/', '')
    return href
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        forceScrolled
          ? 'bg-cream/92 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-[76px]">
        {/* Logo, always links home */}
        <Link to="/" className="block">
          <img
            src="/Logo - BLACK (1).svg"
            alt="Kalos"
            className={`h-8 transition-all duration-500 ${
              forceScrolled ? 'brightness-0' : 'brightness-0 invert'
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <a
                  href={resolveHref(link.href)}
                  className={`inline-flex items-center gap-1.5 text-[14px] font-semibold tracking-wide uppercase transition-colors duration-500 ${
                    forceScrolled
                      ? 'text-text-primary/50 hover:text-text-primary'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${locationsOpen ? 'rotate-180' : ''}`}
                  />
                </a>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    locationsOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-2xl border border-warm-border shadow-[0_12px_40px_rgba(0,0,0,0.12)] py-3 min-w-[220px]">
                    {locationsList.map((loc) => (
                      <Link
                        key={loc.slug}
                        to={`/locations/${loc.slug}`}
                        onClick={() => setLocationsOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-cream transition-colors duration-150"
                      >
                        <MapPin size={14} className="text-accent shrink-0" />
                        <div>
                          <p className="text-[14px] font-semibold text-text-primary leading-tight">
                            {loc.city}
                          </p>
                          <p className="text-[11px] text-text-tertiary leading-tight mt-0.5">
                            {loc.address.neighborhood}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-warm-border mt-2 pt-2 px-5">
                      <a
                        href={resolveHref('/#locations')}
                        className="text-[12px] font-semibold text-accent hover:text-accent-hover transition-colors duration-200"
                        onClick={() => setLocationsOpen(false)}
                      >
                        View all locations →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className={`text-[14px] font-semibold tracking-wide uppercase transition-colors duration-500 ${
                  forceScrolled
                    ? 'text-text-primary/50 hover:text-text-primary'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Book a Scan CTA */}
        <div className="hidden md:block">
          <a
            href={resolveHref('/#pricing')}
            className={`inline-flex items-center px-7 py-3 text-[14px] font-semibold tracking-wide rounded-full transition-all duration-500 ${
              forceScrolled
                ? 'bg-accent text-white hover:bg-accent-hover'
                : 'bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 border border-white/20'
            }`}
          >
            Book a Scan
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 transition-colors duration-500 ${
            forceScrolled ? 'text-text-primary' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream px-6 py-8 space-y-1 border-t border-warm-border">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                  className="flex items-center justify-between w-full text-[15px] font-semibold text-text-primary/60 py-3"
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileLocationsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileLocationsOpen && (
                  <div className="pl-4 pb-2 space-y-1">
                    {locationsList.map((loc) => (
                      <Link
                        key={loc.slug}
                        to={`/locations/${loc.slug}`}
                        onClick={() => {
                          setMobileOpen(false)
                          setMobileLocationsOpen(false)
                        }}
                        className="flex items-center gap-2.5 text-[14px] text-text-primary/50 py-2"
                      >
                        <MapPin size={13} className="text-accent" />
                        {loc.city}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                onClick={() => setMobileOpen(false)}
                className="block text-[15px] font-semibold text-text-primary/60 py-3"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href={resolveHref('/#pricing')}
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
