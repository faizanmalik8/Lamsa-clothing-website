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
import { addProduct } from '../actions'
import { toast } from 'sonner'

export default function ProductForm({ categories }: { categories: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const res = await addProduct(formData)
    setLoading(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Product added successfully')
      router.push('/admin/products')
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" required placeholder="Elegant Lawn Suit" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category_id">Category</Label>
              <Select name="category_id" required>
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
              <Input id="price" name="price" type="number" min="0" step="0.01" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compare_at_price">Compare At Price (Optional)</Label>
              <Input id="compare_at_price" name="compare_at_price" type="number" min="0" step="0.01" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input id="stock_quantity" name="stock_quantity" type="number" min="0" required defaultValue="10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Product Images</Label>
              <Input id="images" name="images" type="file" accept="image/*" multiple required />
              <p className="text-xs text-gray-500">You can select multiple images.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={5} placeholder="Product details, fabric info, etc." />
          </div>

          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="is_active" name="is_active" value="on" defaultChecked />
              <Label htmlFor="is_active">Active (Visible to customers)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="is_featured" name="is_featured" value="on" />
              <Label htmlFor="is_featured">Featured (Show on homepage)</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
