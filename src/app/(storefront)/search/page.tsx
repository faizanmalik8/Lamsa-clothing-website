import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/storefront/ProductCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams
  const query = resolvedParams.q || ''
  const supabase = await createClient()

  let products: any[] = []

  if (query) {
    // Search by exact ID first (UUID format check could be added, but Supabase handles cast errors gracefully if using rpc or text conversion, 
    // wait: checking by UUID text directly might throw an error if it's not a valid UUID. 
    // Let's use ilike on name or description for now. We can try ID if it looks like a UUID.
    
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(query)

    if (isUuid) {
      const { data } = await supabase
        .from('products')
        .select('*, categories(name, slug), images(image_url)')
        .eq('id', query)
        .eq('is_active', true)
      if (data) products = data
    } else {
      const { data } = await supabase
        .from('products')
        .select('*, categories(name, slug), images(image_url)')
        .ilike('name', `%${query}%`)
        .eq('is_active', true)
      if (data) products = data
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Search Products</h1>
        <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
        
        <form className="max-w-xl mx-auto flex items-center space-x-2" method="GET" action="/search">
          <Input 
            name="q" 
            defaultValue={query} 
            placeholder="Search by name or product ID..." 
            className="flex-1 rounded-none border-charcoal/20 focus-visible:ring-gold"
          />
          <Button type="submit" className="rounded-none bg-charcoal text-beige hover:bg-gold hover:text-white">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </form>
      </div>

      {query && (
        <div className="mt-12">
          <h2 className="text-lg font-medium text-charcoal mb-6">
            Search results for "{query}"
          </h2>
          
          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-charcoal/10">
              <p className="text-lg text-charcoal font-medium mb-2">Not Available</p>
              <p className="text-charcoal/60 text-sm">We couldn't find any dress matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
