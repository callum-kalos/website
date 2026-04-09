import { useEffect, useRef } from 'react'

export function useFadeIn<T extends HTMLElement = HTMLDivElement>(type: 'fade-in' | 'stagger' = 'fade-in') {
  const ref = useRef<T>(null)
  const typeRef = useRef(type)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add(typeRef.current)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
