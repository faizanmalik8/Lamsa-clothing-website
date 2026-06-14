'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateSettings(formData: FormData) {
  const supabase = await createClient()
  
  let logo_url = null
  const logoFile = formData.get('logo_image') as File | null
  
  if (logoFile && logoFile.size > 0) {
    const fileExt = logoFile.name.split('.').pop()
    const fileName = `logo-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('settings_images')
      .upload(fileName, logoFile)

    if (uploadError) {
      return { error: 'Logo upload failed: ' + uploadError.message }
    }

    const { data: publicUrlData } = supabase.storage
      .from('settings_images')
      .getPublicUrl(fileName)
    logo_url = publicUrlData.publicUrl
  }

  const settingsData: any = {
    contact_email: formData.get('contact_email') as string,
    phone_number: formData.get('phone_number') as string,
    whatsapp_number: formData.get('whatsapp_number') as string,
    instagram_url: formData.get('instagram_url') as string,
    facebook_url: formData.get('facebook_url') as string,
    announcement_text: formData.get('announcement_text') as string,
    is_announcement_active: formData.get('is_announcement_active') === 'on',
    flat_shipping_cost: parseFloat((formData.get('flat_shipping_cost') as string) || '0'),
  }

  if (logo_url) {
    settingsData.logo_url = logo_url
  }

  const { error } = await supabase
    .from('settings')
    .update(settingsData)
    .eq('id', 1)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/settings')
  revalidatePath('/', 'layout') // Revalidate everything for global settings
  return { success: true }
}
