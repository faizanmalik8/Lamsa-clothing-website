'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const existingCart = localStorage.getItem('lamsa_cart')
    if (existingCart) {
      setCart(JSON.parse(existingCart))
    }
    setMounted(true)
  }, [])

  const updateCart = (newCart: any[]) => {
    setCart(newCart)
    localStorage.setItem('lamsa_cart', JSON.stringify(newCart))
    window.dispatchEvent(new Event('cart_updated'))
  }

  const handleQuantityChange = (index: number, delta: number) => {
    const newCart = [...cart]
    const item = newCart[index]
    const newQty = item.quantity + delta
    
    if (newQty > 0 && newQty <= item.max_stock) {
      item.quantity = newQty
      updateCart(newCart)
    }
  }

  const handleRemove = (index: number) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    updateCart(newCart)
  }

  if (!mounted) return <div className="min-h-[60vh] flex items-center justify-center">Loading cart...</div>

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Your Cart</h1>
        <div className="w-24 h-1 bg-gold mx-auto"></div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white border border-charcoal/10 flex flex-col items-center">
          <ShoppingBag className="h-16 w-16 text-gold mb-4 opacity-50" />
          <p className="text-xl text-charcoal mb-6">Your shopping cart is empty.</p>
          <Link href="/collections/all" className="bg-charcoal text-beige hover:bg-gold hover:text-white transition-colors uppercase tracking-widest font-medium py-3 px-8">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-charcoal/20 text-sm font-semibold uppercase tracking-widest text-charcoal/60">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-charcoal/10">
              {cart.map((item, index) => (
                <div key={index} className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center w-full">
                    <div className="w-20 h-24 bg-beige-dark flex-shrink-0 relative">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-charcoal/30">No Img</div>
                      )}
                    </div>
                    <div className="ml-4 flex flex-col">
                      <Link href={`/product/${item.slug}`} className="font-serif text-lg text-charcoal hover:text-gold transition-colors">
                        {item.name}
                      </Link>
                      <button onClick={() => handleRemove(index)} className="text-sm text-red-500 hover:text-red-700 mt-2 flex items-center w-fit">
                        <Trash2 className="h-3 w-3 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center w-full sm:w-auto flex justify-between sm:block mt-4 sm:mt-0">
                    <span className="sm:hidden text-charcoal/60 text-sm uppercase">Price:</span>
                    Rs. {item.price}
                  </div>
                  
                  <div className="col-span-2 flex justify-center w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="flex items-center border border-charcoal/20">
                      <button onClick={() => handleQuantityChange(index, -1)} className="p-2 hover:bg-beige-dark transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(index, 1)} className="p-2 hover:bg-beige-dark transition-colors" disabled={item.quantity >= item.max_stock}>
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-right w-full sm:w-auto flex justify-between sm:block mt-4 sm:mt-0 font-medium">
                    <span className="sm:hidden text-charcoal/60 text-sm uppercase">Total:</span>
                    Rs. {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 border border-charcoal/10 shadow-sm sticky top-24">
              <h2 className="font-serif text-2xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-charcoal/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-sm italic">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-charcoal/20 pt-4 mb-8 font-semibold text-lg text-charcoal">
                <span>Estimated Total</span>
                <span>Rs. {subtotal}</span>
              </div>
              
              <Link href="/checkout" className="w-full flex items-center justify-center bg-charcoal text-beige hover:bg-gold hover:text-white transition-colors uppercase tracking-widest font-medium py-4">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <p className="text-center text-xs text-charcoal/50 mt-4">
                Taxes and shipping calculated at checkout.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
