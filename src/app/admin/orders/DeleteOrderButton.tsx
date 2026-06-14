'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteOrder } from './actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function DeleteOrderButton({ orderId, redirectToOrders = false }: { orderId: string, redirectToOrders?: boolean }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) return

    setLoading(true)
    const res = await deleteOrder(orderId)
    setLoading(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Order deleted successfully')
      if (redirectToOrders) {
        router.push('/admin/orders')
      }
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
      <Trash2 className="h-4 w-4 mr-2" /> Delete
    </Button>
  )
}
