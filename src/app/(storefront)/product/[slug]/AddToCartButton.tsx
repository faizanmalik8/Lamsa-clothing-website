'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { ShoppingBag, Plus, Minus } from 'lucide-react'

export default function AddToCartButton({ product }: { product: any }) {
  const [loading, setLoading] = useState(false)
  const [quantityInCart, setQuantityInCart] = useState(0)

  useEffect(() => {
    checkCart()
    window.addEventListener('cart_updated', checkCart)
    return () => window.removeEventListener('cart_updated', checkCart)
  }, [product.id])

  const checkCart = () => {
    try {
      const existingCart = localStorage.getItem('lamsa_cart')
      if (existingCart) {
        const cart = JSON.parse(existingCart)
        const existingItem = cart.find((item: any) => item.product_id === product.id)
        if (existingItem) {
          setQuantityInCart(existingItem.quantity)
        } else {
          setQuantityInCart(0)
        }
      } else {
        setQuantityInCart(0)
      }
    } catch (e) {
      setQuantityInCart(0)
    }
  }

  const updateQuantity = (delta: number) => {
    setLoading(true)
    try {
      const existingCart = localStorage.getItem('lamsa_cart')
      let cart = existingCart ? JSON.parse(existingCart) : []
      const existingItemIndex = cart.findIndex((item: any) => item.product_id === product.id)

      if (existingItemIndex > -1) {
        const newQty = cart[existingItemIndex].quantity + delta
        if (newQty > 0 && newQty <= product.stock_quantity) {
          cart[existingItemIndex].quantity = newQty
        } else if (newQty === 0) {
          cart.splice(existingItemIndex, 1)
          toast.success('Removed from cart')
        } else {
          toast.error('Cannot add more than available stock')
          setLoading(false)
          return
        }
      } else if (delta > 0) {
        cart.push({
          product_id: product.id,
          name: product.name,
          price: product.price,
          image: product.images && product.images.length > 0 ? product.images[0].image_url : null,
          slug: product.slug,
          quantity: 1,
          max_stock: product.stock_quantity
        })
        toast.success('Added to cart!')
      }

      localStorage.setItem('lamsa_cart', JSON.stringify(cart))
      window.dispatchEvent(new Event('cart_updated'))
    } catch (e) {
      toast.error('Failed to update cart')
    } finally {
      setLoading(false)
    }
  }

  if (quantityInCart > 0) {
    return (
      <div className="flex items-center justify-between w-full border border-charcoal text-charcoal">
        <button 
          onClick={() => updateQuantity(-1)}
          disabled={loading}
          className="p-4 hover:bg-beige-dark transition-colors flex-1 flex justify-center"
        >
          <Minus className="h-5 w-5" />
        </button>
        <div className="px-6 font-medium text-lg min-w-[3rem] text-center">
          {quantityInCart}
        </div>
        <button 
          onClick={() => updateQuantity(1)}
          disabled={loading || quantityInCart >= product.stock_quantity}
          className="p-4 hover:bg-beige-dark transition-colors flex-1 flex justify-center disabled:opacity-50"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => updateQuantity(1)}
      disabled={loading || product.stock_quantity <= 0}
      className="w-full bg-charcoal text-beige hover:bg-gold hover:text-white transition-colors uppercase tracking-widest font-medium py-4 flex items-center justify-center space-x-2 disabled:opacity-50"
    >
      <ShoppingBag className="h-5 w-5" />
      <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
    </button>
  )
}
