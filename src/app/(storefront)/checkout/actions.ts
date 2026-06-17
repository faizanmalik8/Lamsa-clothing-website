'use server'

import { createAdminClient } from '@/lib/supabase/server'

export async function placeOrder(formData: FormData, cartItems: any[], subtotal: number, shipping: number) {
  const supabase = createAdminClient()

  // Parse form data
  const customer_name = formData.get('customer_name') as string
  const customer_email = formData.get('customer_email') as string
  const customer_phone = formData.get('customer_phone') as string
  const shipping_address = formData.get('shipping_address') as string
  const city = formData.get('city') as string

  if (!customer_name || !customer_phone || !shipping_address || !city) {
    return { error: 'Please fill in all required fields' }
  }

  if (!cartItems || cartItems.length === 0) {
    return { error: 'Your cart is empty' }
  }

  const total_amount = subtotal + shipping
  const order_number = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

  // 1. Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{
      order_number,
      customer_name,
      customer_email,
      customer_phone,
      city,
      shipping_address,
      status: 'pending',
      total_amount
    }])
    .select()
    .single()

  if (orderError || !order) {
    return { error: orderError?.message || 'Failed to create order' }
  }

  // 2. Create order items and update stock
  for (const item of cartItems) {
    // Insert order item
    await supabase.from('order_items').insert([{
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_time: item.price
    }])

    // Update product stock
    const { data: productData } = await supabase
      .from('products')
      .select('stock_quantity')
      .eq('id', item.product_id)
      .single()

    if (productData) {
      const newStock = Math.max(0, productData.stock_quantity - item.quantity)
      await supabase
        .from('products')
        .update({ stock_quantity: newStock })
        .eq('id', item.product_id)
    }
  }

  return { success: true, orderId: order.id }
}
