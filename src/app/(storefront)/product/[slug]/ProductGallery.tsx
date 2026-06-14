'use client'

import { useState } from 'react'

export default function ProductGallery({ images }: { images: any[] }) {
  const [mainImage, setMainImage] = useState(images && images.length > 0 ? images[0].image_url : null)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[3/4] bg-beige-dark flex items-center justify-center">
        <span className="font-serif text-charcoal/30 text-2xl">Lamsa</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image */}
      <div className="w-full aspect-[3/4] bg-beige-dark relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={mainImage} 
          alt="Product details" 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, idx) => (
            <button 
              key={idx}
              onClick={() => setMainImage(image.image_url)}
              className={`relative w-20 h-24 flex-shrink-0 border-2 transition-colors overflow-hidden ${
                mainImage === image.image_url ? 'border-gold' : 'border-transparent hover:border-gold/50'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={image.image_url} 
                alt={`Thumbnail ${idx + 1}`} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
