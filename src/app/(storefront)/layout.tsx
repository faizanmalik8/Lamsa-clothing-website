import React from 'react'
import { createClient } from '@/lib/supabase/server'
import Announcement from '@/components/storefront/Announcement'
import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'

export const dynamic = 'force-dynamic'

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // Fetch settings for Announcement and Footer
  const { data: settings } = await supabase.from('settings').select('*').eq('id', 1).single()

  return (
    <div className="flex min-h-screen flex-col bg-beige">
      {settings?.is_announcement_active && settings?.announcement_text && (
        <Announcement text={settings.announcement_text} />
      )}
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  )
}
