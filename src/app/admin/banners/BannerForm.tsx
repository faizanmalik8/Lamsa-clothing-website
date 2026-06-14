'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { addBanner } from './actions'
import { toast } from 'sonner'

export default function BannerForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const res = await addBanner(formData)
    setLoading(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Banner added successfully')
      const form = document.getElementById('banner-form') as HTMLFormElement
      form.reset()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Banner</CardTitle>
      </CardHeader>
      <form id="banner-form" action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Banner Image</Label>
            <Input id="image" name="image" type="file" accept="image/*" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input id="title" name="title" placeholder="Summer Collection" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle (Optional)</Label>
            <Input id="subtitle" name="subtitle" placeholder="Up to 50% off" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link_url">Link URL (Optional)</Label>
            <Input id="link_url" name="link_url" placeholder="/collection?sale=true" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Uploading...' : 'Add Banner'}
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}
