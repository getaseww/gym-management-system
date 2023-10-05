import { useQuery } from '@tanstack/react-query'
import Layout from '../../components/sidebar/Layout'
import { DataTable } from '@/components/DataTable'
import { API_URL } from '@/utils/constant'
import { Skeleton } from '@/components/ui/skeleton'
import { inventoryColumns } from '@/components/Inventory/Columns'

export default function Inventory() {
  const { isLoading, error, data } = useQuery(['inventory'], () =>
    fetch(API_URL + 'inventory').then(res =>
      res.json()
    )
  )

  console.log("data from inventory", isLoading, data)

  return (
    <div className='w-full justify-center'>
    <Layout>
      {isLoading ? <Skeleton className="w-[100px] h-[20px] rounded-full" />
        : <DataTable columns={inventoryColumns} data={data} />}
    </Layout>
    </div>
  )
}
