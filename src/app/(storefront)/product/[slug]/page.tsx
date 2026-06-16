import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductGallery from './ProductGallery'
import AddToCartButton from './AddToCartButton'

export const dynamic = 'force-dynamic'

export default async function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*, categories(name, slug), images(image_url)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-charcoal/60 mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <Link href={`/collections/${product.categories?.slug || 'all'}`} className="hover:text-gold transition-colors">
                {product.categories?.name}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-charcoal font-medium">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Images */}
        <div className="w-full md:w-1/2">
          <ProductGallery images={product.images || []} />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-2 text-gold uppercase tracking-widest text-sm font-medium">
            {product.categories?.name}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">{product.name}</h1>
          
          <div className="flex items-end space-x-3 mb-6">
            <span className="text-2xl font-medium text-charcoal">Rs. {product.price}</span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-lg text-charcoal/50 line-through mb-0.5">Rs. {product.compare_at_price}</span>
            )}
          </div>

          <div className="prose prose-sm text-charcoal/80 mb-8 font-light leading-relaxed">
            {product.description?.split('\n').map((line: string, i: number) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-gold/20">
            {product.stock_quantity > 0 ? (
              <AddToCartButton product={product} />
            ) : (
              <button disabled className="w-full bg-charcoal/10 text-charcoal/50 uppercase tracking-widest font-medium py-4">
                Sold Out
              </button>
            )}
          </div>
          
          {/* Features / Guarantees */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gold/20 pt-6">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-charcoal">Delivery</span>
              <span className="text-xs text-charcoal/60 mt-1">Nationwide within 3-5 days</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-charcoal">Authentic</span>
              <span className="text-xs text-charcoal/60 mt-1">100% original fabric guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
