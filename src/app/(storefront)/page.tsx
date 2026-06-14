import { createClient } from '@/lib/supabase/server'
import HeroSlider from '@/components/storefront/HeroSlider'
import ProductCard from '@/components/storefront/ProductCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StorefrontHome() {
  const supabase = await createClient()

  // Fetch active banners
  const { data: banners } = await supabase
    .from('hero_banners')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*, categories(name), images(image_url)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(4)

  // Fetch new arrivals (latest 8 products)
  const { data: newArrivals } = await supabase
    .from('products')
    .select('*, categories(name), images(image_url)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider banners={banners || []} />

      {/* Featured Section */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">Featured Collection</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals Section */}
      {newArrivals && newArrivals.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-beige-dark/50">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">New Arrivals</h2>
              <div className="w-24 h-1 bg-gold"></div>
            </div>
            <Link href="/collections/new-arrivals" className="hidden sm:flex items-center text-charcoal hover:text-gold transition-colors font-medium tracking-widest uppercase text-sm">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center sm:hidden">
            <Link href="/collections/new-arrivals" className="inline-flex items-center text-charcoal hover:text-gold transition-colors font-medium tracking-widest uppercase text-sm border-b border-charcoal hover:border-gold pb-1">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Categories / Promo Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal text-beige text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6 tracking-wide">Elegance in Every Thread</h2>
        <p className="max-w-2xl mx-auto text-beige/80 mb-10 font-light leading-relaxed">
          Explore our wide range of premium unstitched fabrics. From breezy summer lawns to luxurious festive chiffons, craft your perfect look with Lamsa.
        </p>
        <Link href="/collections/all" className="inline-block border border-gold text-gold hover:bg-gold hover:text-charcoal px-8 py-3 uppercase tracking-widest font-medium transition-colors">
          Explore Collections
        </Link>
      </section>
    </div>
  )
}
