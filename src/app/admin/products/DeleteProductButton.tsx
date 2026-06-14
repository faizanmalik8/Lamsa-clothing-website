'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { deleteProduct } from './actions'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

export default function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this product? All associated images will also be deleted.')) return

    setLoading(true)
    const res = await deleteProduct(id)
    setLoading(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Product deleted')
    }
  }

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete} 
      disabled={loading}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
