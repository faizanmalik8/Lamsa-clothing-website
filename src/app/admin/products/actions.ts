'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addProduct(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const category_id = formData.get('category_id') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const compare_at_price = formData.get('compare_at_price') ? parseFloat(formData.get('compare_at_price') as string) : null
  const stock_quantity = parseInt(formData.get('stock_quantity') as string)
  const is_active = formData.get('is_active') === 'on'
  const is_featured = formData.get('is_featured') === 'on'
  
  if (!name || !category_id || isNaN(price)) return { error: 'Name, Category, and Price are required' }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6)

  // Insert product
  const { data: product, error: dbError } = await supabase
    .from('products')
    .insert([{
      category_id,
      name,
      slug,
      description,
      price,
      compare_at_price,
      stock_quantity,
      is_active,
      is_featured
    }])
    .select()
    .single()

  if (dbError) return { error: dbError.message }

  // Upload images
  const images = formData.getAll('images') as File[]
  for (let i = 0; i < images.length; i++) {
    const file = images[i]
    if (file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${product.id}-${i}-${Math.random()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file)

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(fileName)

        await supabase
          .from('images')
          .insert([{
            product_id: product.id,
            image_url: publicUrlData.publicUrl,
            display_order: i
          }])
      }
    }
  }

  revalidatePath('/admin/products')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  // Delete associated images from storage first
  const { data: images } = await supabase.from('images').select('image_url').eq('product_id', id)
  if (images && images.length > 0) {
    const paths = images.map(img => img.image_url.split('/products/')[1]).filter(Boolean)
    if (paths.length > 0) {
      await supabase.storage.from('products').remove(paths)
    }
  }

  // The DB cascade should delete rows in `images` when `products` is deleted, based on schema, but let's just delete product
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/products')
  revalidatePath('/', 'layout')
  return { success: true }
}
