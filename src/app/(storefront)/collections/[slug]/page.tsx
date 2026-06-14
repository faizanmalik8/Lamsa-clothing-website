import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/storefront/ProductCard'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const supabase = await createClient()

  let title = 'Collection'
  let query = supabase
    .from('products')
    .select('*, categories(name, slug), images(image_url)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (slug === 'all') {
    title = 'All Collections'
  } else if (slug === 'new-arrivals') {
    title = 'New Arrivals'
    query = query.limit(20)
  } else {
    // Check if category exists
    const { data: category } = await supabase.from('categories').select('*').eq('slug', slug).single()
    if (!category) {
      notFound()
    }
    title = category.name
    query = query.eq('category_id', category.id)
  }

  const { data: products } = await query

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">{title}</h1>
        <div className="w-24 h-1 bg-gold mx-auto"></div>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-charcoal/50">
          <p className="text-lg">No products found in this collection.</p>
        </div>
      )}
    </div>
  )
}
