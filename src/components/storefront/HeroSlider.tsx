'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroSlider({ banners }: { banners: any[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!banners || banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners])

  if (!banners || banners.length === 0) {
    return (
      <div className="w-full h-[60vh] bg-beige-dark flex items-center justify-center">
        <h2 className="text-2xl font-serif text-charcoal/50">Welcome to Lamsa</h2>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-charcoal">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.image_url}
            alt={banner.title || 'Lamsa Banner'}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            {banner.title && (
              <h1 className="font-serif text-4xl md:text-6xl text-beige mb-4 tracking-widest drop-shadow-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {banner.title}
              </h1>
            )}
            {banner.subtitle && (
              <p className="text-lg md:text-xl text-beige/90 mb-8 max-w-2xl font-light drop-shadow animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
                {banner.subtitle}
              </p>
            )}
            {banner.link_url && (
              <Link 
                href={banner.link_url}
                className="bg-beige text-charcoal px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-gold hover:text-white transition-colors animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300"
              >
                Shop Now
              </Link>
            )}
          </div>
        </div>
      ))}

      {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-charcoal/20 hover:bg-charcoal/50 text-beige rounded-full transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-charcoal/20 hover:bg-charcoal/50 text-beige rounded-full transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  )
}
