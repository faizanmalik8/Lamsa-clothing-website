import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BannerForm from './BannerForm'
import BannerItemActions from './BannerItemActions'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function BannersPage() {
  const supabase = await createClient()
  const { data: banners } = await supabase
    .from('hero_banners')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hero Banners</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <BannerForm />
        </div>
        
        <div className="md:col-span-2 space-y-4">
          {banners?.map((banner) => (
            <Card key={banner.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-64 h-32 md:h-auto bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={banner.image_url} 
                    alt={banner.title || 'Banner'} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{banner.title || 'No Title'}</h3>
                    <p className="text-sm text-gray-500">{banner.subtitle || 'No Subtitle'}</p>
                    <p className="text-xs text-blue-500 mt-1">{banner.link_url}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <BannerItemActions id={banner.id} imageUrl={banner.image_url} isActive={banner.is_active} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {(!banners || banners.length === 0) && (
            <div className="text-center py-12 text-gray-500 border rounded-xl bg-white">
              No banners uploaded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
