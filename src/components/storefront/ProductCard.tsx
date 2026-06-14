import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default function ProductCard({ product }: { product: any }) {
  const firstImage = product.images && product.images.length > 0 ? product.images[0].image_url : null

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/product/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-beige-dark">
        {firstImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={firstImage} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-charcoal/20 font-serif">
            Lamsa
          </div>
        )}
        {product.compare_at_price && product.compare_at_price > product.price && (
          <div className="absolute top-2 left-2 bg-charcoal text-beige text-xs uppercase tracking-widest px-2 py-1 font-semibold">
            Sale
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] sm:text-xs text-gold uppercase tracking-widest mb-1 font-medium">
          {product.categories?.name}
        </div>
        <Link href={`/product/${product.slug}`} className="font-serif text-sm sm:text-lg text-charcoal mb-2 hover:text-gold transition-colors line-clamp-1 sm:line-clamp-2">
          {product.name}
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-auto">
          <span className="text-charcoal font-medium text-sm sm:text-base">Rs. {product.price}</span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-charcoal/50 line-through text-xs sm:text-sm">Rs. {product.compare_at_price}</span>
          )}
        </div>
      </div>
      <div className="hidden sm:block absolute top-2 right-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
        <Link href={`/product/${product.slug}`} className="block bg-white/90 backdrop-blur p-2 shadow-md hover:bg-gold hover:text-white transition-colors text-charcoal">
          <ShoppingBag className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}
