import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import OrderStatusSelect from '../OrderStatusSelect'
import DeleteOrderButton from '../DeleteOrderButton'

export const dynamic = 'force-dynamic'

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch Order
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (!order) {
    notFound()
  }

  // Fetch Order Items
  const { data: orderItems } = await supabase
    .from('order_items')
    .select(`
      quantity,
      price_at_time,
      products (
        name,
        slug,
        images(image_url)
      )
    `)
    .eq('order_id', id)

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Order Details</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-500">Status:</span>
          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
          <DeleteOrderButton orderId={order.id} redirectToOrders={true} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Customer Details */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{order.customer_name}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{order.customer_phone}</p>
            </div>
            {order.customer_email && (
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{order.customer_email}</p>
              </div>
            )}
            <div>
              <p className="text-gray-500">City</p>
              <p className="font-medium">{order.city}</p>
            </div>
            <div>
              <p className="text-gray-500">Delivery Address</p>
              <p className="font-medium">{order.shipping_address}</p>
            </div>
            <div className="pt-4 border-t">
              <p className="text-gray-500">Order Date</p>
              <p className="font-medium">{new Date(order.created_at).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {orderItems?.map((item, idx) => {
                const product = item.products as any
                const firstImage = product?.images?.[0]?.image_url

                return (
                  <div key={idx} className="flex gap-4 items-center pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-16 h-20 bg-gray-100 relative rounded overflow-hidden flex-shrink-0">
                      {firstImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={firstImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Img</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Link href={`/product/${product.slug}`} className="font-medium text-blue-600 hover:underline" target="_blank">
                        {product.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">
                        Rs. {item.price_at_time} × {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium">
                      Rs. {item.price_at_time * item.quantity}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 pt-6 border-t flex justify-end">
              <div className="w-64 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">Rs. {order.total_amount - 250}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">Rs. 250</span>
                </div>
                <div className="flex justify-between pt-3 border-t text-lg font-bold">
                  <span>Total</span>
                  <span>Rs. {order.total_amount}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
