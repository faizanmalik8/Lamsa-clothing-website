'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateOrderStatus } from './actions'
import { toast } from 'sonner'

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false)

  async function handleStatusChange(newStatus: string | null) {
    if (!newStatus) return;

    setLoading(true)
    const res = await updateOrderStatus(orderId, newStatus)
    setLoading(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Order status updated')
    }
  }

  return (
    <Select disabled={loading} defaultValue={currentStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map(status => (
          <SelectItem key={status} value={status} className="capitalize">
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
