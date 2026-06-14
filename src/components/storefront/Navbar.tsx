'use client'

import Link from 'next/link'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar({ settings }: { settings?: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  
  useEffect(() => {
    const updateCount = () => {
      const cartStr = localStorage.getItem('lamsa_cart')
      if (cartStr) {
        const cart = JSON.parse(cartStr)
        const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0)
        setCartCount(count)
      } else {
        setCartCount(0)
      }
    }
    
    updateCount()
    window.addEventListener('cart_updated', updateCount)
    return () => window.removeEventListener('cart_updated', updateCount)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsMenuOpen(false) // Close menu if open on mobile
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gold/20 bg-beige/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden flex-1">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -ml-2 text-charcoal hover:text-gold transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center sm:justify-start">
            <Link href="/" className="font-serif text-3xl md:text-4xl font-bold tracking-widest text-charcoal">
              {settings?.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.logo_url} alt="Lamsa Logo" className="h-20 w-auto object-contain py-2" />
              ) : (
                'LAMSA'
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-center space-x-6 flex-1 ml-8">
            <Link href="/" className="text-sm font-medium tracking-widest text-charcoal hover:text-gold transition-colors uppercase">
              Home
            </Link>
            <Link href="/collections/new-arrivals" className="text-sm font-medium tracking-widest text-charcoal hover:text-gold transition-colors uppercase">
              New Arrivals
            </Link>
            <Link href="/collections/all" className="text-sm font-medium tracking-widest text-charcoal hover:text-gold transition-colors uppercase">
              Collections
            </Link>
            <Link href="/about" className="text-sm font-medium tracking-widest text-charcoal hover:text-gold transition-colors uppercase">
              About Us
            </Link>
          </div>

          {/* Search & Cart Icons (Desktop & Mobile) */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4 flex-1">
            
            {/* Desktop Search Bar */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center border-b border-charcoal/20 pb-1 mr-2">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all text-charcoal placeholder:text-charcoal/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="text-charcoal hover:text-gold transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Mobile Search Icon (opens menu or can route to search) */}
            <Link href="/search" className="lg:hidden p-2 text-charcoal hover:text-gold transition-colors">
              <Search className="h-5 w-5" />
            </Link>

            <Link href="/cart" className="p-2 text-charcoal hover:text-gold transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full bg-gold text-white text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-beige border-t border-gold/20 absolute w-full shadow-lg">
          <div className="pt-2 pb-4 space-y-1">
            <form onSubmit={handleSearch} className="px-4 py-3 flex items-center border-b border-charcoal/10 mb-2">
              <input 
                type="text" 
                placeholder="Search for dresses..." 
                className="bg-transparent border-none outline-none flex-1 text-base text-charcoal placeholder:text-charcoal/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="p-2 text-charcoal hover:text-gold">
                <Search className="h-5 w-5" />
              </button>
            </form>
            
            <Link 
              href="/" 
              className="block px-4 py-3 text-base font-medium text-charcoal hover:bg-gold/10 hover:text-gold uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/collections/new-arrivals" 
              className="block px-4 py-3 text-base font-medium text-charcoal hover:bg-gold/10 hover:text-gold uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link 
              href="/collections/all" 
              className="block px-4 py-3 text-base font-medium text-charcoal hover:bg-gold/10 hover:text-gold uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-3 text-base font-medium text-charcoal hover:bg-gold/10 hover:text-gold uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
