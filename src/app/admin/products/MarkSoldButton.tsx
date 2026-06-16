'use client'

import { Button } from '@/components/ui/button'
import { markProductSold } from './actions'
import { useState } from 'react'
import { toast } from 'sonner'
import { CheckCircle } from 'lucide-react'

export default function MarkSoldButton({ id, stock }: { id: string, stock: number }) {
  const [loading, setLoading] = useState(false)

  if (stock === 0) {
    return (
      <Button variant="secondary" size="sm" disabled className="bg-gray-100 text-gray-500">
        Sold Out
      </Button>
    )
  }

  const handleMarkSold = async () => {
    if (confirm('Are you sure you want to mark this product as sold? This will set its stock to 0.')) {
      setLoading(true)
      const res = await markProductSold(id)
      setLoading(false)

      if (res?.error) {
        toast.error(res.error)
      } else {
        toast.success('Product marked as sold')
      }
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleMarkSold} disabled={loading} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
      <CheckCircle className="mr-1 h-3 w-3" />
      Mark Sold
    </Button>
  )
}
