'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { deleteBanner, toggleBannerStatus } from './actions'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

export default function BannerItemActions({ id, imageUrl, isActive }: { id: string, imageUrl: string, isActive: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this banner?')) return
    setLoading(true)
    const res = await deleteBanner(id, imageUrl)
    setLoading(false)
    if (res?.error) toast.error(res.error)
    else toast.success('Banner deleted')
  }

  async function handleToggle(checked: boolean) {
    setLoading(true)
    const res = await toggleBannerStatus(id, checked)
    setLoading(false)
    if (res?.error) toast.error(res.error)
    else toast.success(checked ? 'Banner activated' : 'Banner deactivated')
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Switch checked={isActive} onCheckedChange={handleToggle} disabled={loading} />
        <span className="text-sm text-gray-500">{isActive ? 'Active' : 'Inactive'}</span>
      </div>
      <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
