import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('price, compare_at_price, is_active')

  const { data: orders } = await supabase
    .from('orders')
    .select('total_amount, status')

  const productCount = products?.length || 0
  const orderCount = orders?.length || 0

  const activeProducts = products?.filter(p => p.is_active) || []
  const activeProductCount = activeProducts.length
  
  const saleProductsCount = products?.filter(p => p.compare_at_price && p.compare_at_price > p.price).length || 0
  
  const totalAmount = activeProducts.reduce((sum, p) => sum + Number(p.price || 0), 0)
  
  const soldAmount = orders?.reduce((sum, o) => sum + Number(o.total_amount || 0), 0) || 0

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Products</p>
          <p className="text-3xl font-bold mt-2">{productCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-gray-500">Active Products</p>
          <p className="text-3xl font-bold mt-2">{activeProductCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-gray-500">Sale Products</p>
          <p className="text-3xl font-bold mt-2">{saleProductsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Amount (Active)</p>
          <p className="text-3xl font-bold mt-2">Rs. {totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold mt-2">{orderCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-gray-500">Sold Amount</p>
          <p className="text-3xl font-bold mt-2">Rs. {soldAmount.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
