import { createClient } from '@/lib/supabase/server'
import SettingsForm from './SettingsForm'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('*').eq('id', 1).single()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <SettingsForm initialData={settings || {}} />
    </div>
  )
}
