'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { updateSettings } from './actions'
import { toast } from 'sonner'

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const res = await updateSettings(formData)
    setLoading(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Settings updated successfully')
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Store Settings</h1>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Brand Logo</CardTitle>
            <CardDescription>Upload a logo to display in the navigation bar.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initialData?.logo_url && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Current Logo:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={initialData.logo_url} alt="Current Logo" className="h-12 object-contain" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="logo_image">Upload New Logo (Image)</Label>
                <Input id="logo_image" name="logo_image" type="file" accept="image/*" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Details displayed to customers for support.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_email">Email Address</Label>
              <Input id="contact_email" name="contact_email" type="email" defaultValue={initialData?.contact_email || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input id="phone_number" name="phone_number" type="tel" defaultValue={initialData?.phone_number || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
              <Input id="whatsapp_number" name="whatsapp_number" type="tel" defaultValue={initialData?.whatsapp_number || ''} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input id="instagram_url" name="instagram_url" type="url" defaultValue={initialData?.instagram_url || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input id="facebook_url" name="facebook_url" type="url" defaultValue={initialData?.facebook_url || ''} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Store Policies</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="flat_shipping_cost">Flat Shipping Cost (PKR / USD)</Label>
              <Input id="flat_shipping_cost" name="flat_shipping_cost" type="number" min="0" step="0.01" defaultValue={initialData?.flat_shipping_cost || 0} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcement Bar</CardTitle>
            <CardDescription>Top bar notification on the storefront.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="is_announcement_active" name="is_announcement_active" defaultChecked={initialData?.is_announcement_active} />
              <Label htmlFor="is_announcement_active">Enable Announcement Bar</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="announcement_text">Announcement Text</Label>
              <Textarea id="announcement_text" name="announcement_text" defaultValue={initialData?.announcement_text || ''} />
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
