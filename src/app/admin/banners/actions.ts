'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addBanner(formData: FormData) {
  const supabase = await createClient()
  
  const file = formData.get('image') as File
  const title = formData.get('title') as string
  const subtitle = formData.get('subtitle') as string
  const link_url = formData.get('link_url') as string
  
  if (!file || file.size === 0) return { error: 'Image is required' }

  // Upload image
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('hero_banners')
    .upload(fileName, file)

  if (uploadError) return { error: uploadError.message }

  const { data: publicUrlData } = supabase.storage
    .from('hero_banners')
    .getPublicUrl(fileName)

  const { error: dbError } = await supabase
    .from('hero_banners')
    .insert([{
      title,
      subtitle,
      link_url,
      image_url: publicUrlData.publicUrl,
      is_active: true
    }])

  if (dbError) return { error: dbError.message }

  revalidatePath('/admin/banners')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteBanner(id: string, imageUrl: string) {
  const supabase = await createClient()

  // Extract path from public URL
  const urlParts = imageUrl.split('/hero_banners/')
  const pathParts = urlParts.length > 1 ? urlParts[1] : null
  
  if (pathParts) {
    await supabase.storage.from('hero_banners').remove([pathParts])
  }

  const { error } = await supabase
    .from('hero_banners')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/banners')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function toggleBannerStatus(id: string, isActive: boolean) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hero_banners')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/banners')
  revalidatePath('/', 'layout')
  return { success: true }
}
