'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addCategory(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  
  if (!name) return { error: 'Name is required' }
  
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const { error } = await supabase
    .from('categories')
    .insert([{ name, slug }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true }
}
