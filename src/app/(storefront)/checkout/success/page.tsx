import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function CheckoutSuccessPage({ searchParams }: { searchParams: { order_id?: string } }) {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center min-h-[60vh] flex flex-col items-center justify-center">
      <CheckCircle className="h-20 w-20 text-green-600 mb-8" />
      
      <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Order Confirmed!</h1>
      <p className="text-lg text-charcoal/70 mb-8">
        Thank you for shopping with Lamsa. Your order has been placed successfully and will be delivered via Cash on Delivery.
      </p>

      {searchParams?.order_id && (
        <div className="bg-beige-dark/50 p-6 mb-8 border border-charcoal/10 inline-block text-left w-full max-w-md">
          <p className="text-sm text-charcoal/60 uppercase tracking-widest mb-1">Order Reference ID</p>
          <p className="font-mono text-lg font-medium text-charcoal">{searchParams.order_id}</p>
        </div>
      )}

      <Link href="/collections/all" className="inline-block bg-charcoal text-beige hover:bg-gold hover:text-white transition-colors uppercase tracking-widest font-medium py-4 px-12">
        Continue Shopping
      </Link>
    </div>
  )
}
