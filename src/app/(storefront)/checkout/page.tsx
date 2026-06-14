'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { placeOrder } from './actions'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shippingCost, setShippingCost] = useState(250) // Default fixed shipping as requested

  useEffect(() => {
    const existingCart = localStorage.getItem('lamsa_cart')
    if (existingCart) {
      const parsedCart = JSON.parse(existingCart)
      setCart(parsedCart)
      if (parsedCart.length === 0) {
        router.push('/cart')
      }
    } else {
      router.push('/cart')
    }
    setMounted(true)
  }, [router])

  if (!mounted) return <div className="min-h-[60vh] flex items-center justify-center">Loading checkout...</div>

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const total = subtotal + shippingCost

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const res = await placeOrder(formData, cart, subtotal, shippingCost)
    setLoading(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      // Clear cart
      localStorage.removeItem('lamsa_cart')
      window.dispatchEvent(new Event('cart_updated'))
      toast.success('Order placed successfully!')
      router.push(`/checkout/success?order_id=${res.orderId}`)
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Checkout</h1>
        <div className="w-24 h-1 bg-gold mx-auto"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 flex-col-reverse lg:flex-row">
        {/* Checkout Form */}
        <div className="w-full lg:w-2/3">
          <form action={handleSubmit} className="bg-white p-6 md:p-8 border border-charcoal/10">
            <h2 className="font-serif text-2xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Contact & Delivery</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Full Name *</Label>
                <Input id="customer_name" name="customer_name" required placeholder="Jane Doe" className="rounded-none border-charcoal/20 focus-visible:ring-gold" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_phone">Phone Number *</Label>
                <Input id="customer_phone" name="customer_phone" required placeholder="0300 1234567" className="rounded-none border-charcoal/20 focus-visible:ring-gold" />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <Label htmlFor="customer_email">Email Address (Optional)</Label>
              <Input id="customer_email" name="customer_email" type="email" placeholder="jane@example.com" className="rounded-none border-charcoal/20 focus-visible:ring-gold" />
            </div>

            <div className="space-y-2 mb-6">
              <Label htmlFor="shipping_address">Complete Address *</Label>
              <Textarea id="shipping_address" name="shipping_address" required rows={3} placeholder="House, Street, Area..." className="rounded-none border-charcoal/20 focus-visible:ring-gold" />
            </div>

            <div className="space-y-2 mb-8">
              <Label htmlFor="city">City *</Label>
              <Input id="city" name="city" required placeholder="Lahore" className="rounded-none border-charcoal/20 focus-visible:ring-gold" />
            </div>

            <div className="bg-beige-dark/30 p-4 mb-8 border border-charcoal/10 text-sm text-charcoal/80">
              <p className="font-semibold text-charcoal mb-1">Payment Method</p>
              <p>Cash on Delivery (COD) - You will pay for your order when it arrives at your doorstep.</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-charcoal text-beige hover:bg-gold hover:text-white transition-colors uppercase tracking-widest font-medium py-4"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-beige-dark/20 p-6 border border-charcoal/10 sticky top-24">
            <h2 className="font-serif text-2xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-20 bg-white relative flex-shrink-0 border border-charcoal/10">
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    <span className="absolute -top-2 -right-2 bg-charcoal text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-sm font-medium text-charcoal line-clamp-2">{item.name}</span>
                    <span className="text-xs text-charcoal/60 mt-1">Rs. {item.price}</span>
                  </div>
                  <div className="flex items-center text-sm font-medium">
                    Rs. {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-charcoal/10 text-sm text-charcoal/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping (Fixed)</span>
                <span>Rs. {shippingCost}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-charcoal/20 pt-4 mt-4 font-semibold text-lg text-charcoal">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
