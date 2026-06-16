'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { editProduct } from '../../actions'
import { toast } from 'sonner'

export default function EditProductForm({ product, categories }: { product: any, categories: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const res = await editProduct(product.id, formData)
    setLoading(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Product updated successfully')
      router.push('/admin/products')
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" required defaultValue={product.name} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category_id">Category</Label>
              <Select name="category_id" required defaultValue={product.category_id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (PKR)</Label>
              <Input id="price" name="price" type="number" min="0" step="0.01" required defaultValue={product.price} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compare_at_price">Compare At Price (Optional)</Label>
              <Input id="compare_at_price" name="compare_at_price" type="number" min="0" step="0.01" defaultValue={product.compare_at_price || ''} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input id="stock_quantity" name="stock_quantity" type="number" min="0" required defaultValue={product.stock_quantity} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Add More Images (Optional)</Label>
              <Input id="images" name="images" type="file" accept="image/*" multiple />
              <p className="text-xs text-gray-500">Leaving this empty will keep existing images.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={5} defaultValue={product.description || ''} />
          </div>

          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="is_active" name="is_active" value="on" defaultChecked={product.is_active} />
              <Label htmlFor="is_active">Active (Visible to customers)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="is_featured" name="is_featured" value="on" defaultChecked={product.is_featured} />
              <Label htmlFor="is_featured">Featured (Show on homepage)</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
