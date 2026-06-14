import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import DeleteOrderButton from './DeleteOrderButton'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => {
                const date = new Date(order.created_at).toLocaleDateString()
                let statusColor = 'bg-gray-100 text-gray-800'
                if (order.status === 'pending') statusColor = 'bg-yellow-100 text-yellow-800'
                if (order.status === 'processing') statusColor = 'bg-blue-100 text-blue-800'
                if (order.status === 'shipped') statusColor = 'bg-purple-100 text-purple-800'
                if (order.status === 'delivered') statusColor = 'bg-green-100 text-green-800'
                if (order.status === 'cancelled') statusColor = 'bg-red-100 text-red-800'

                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">{order.id.split('-')[0]}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{order.customer_name}</span>
                        <span className="text-xs text-gray-500">{order.city}</span>
                      </div>
                    </TableCell>
                    <TableCell>Rs. {order.total_amount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${statusColor}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" /> View
                          </Button>
                        </Link>
                        <DeleteOrderButton orderId={order.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {(!orders || orders.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
