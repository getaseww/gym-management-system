import { useQuery } from '@tanstack/react-query'
import Layout from '../../components/sidebar/Layout'
import { DataTable } from '@/components/DataTable'
import { API_URL } from '@/utils/constant'
import { Skeleton } from '@/components/ui/skeleton'
import { paymentColumns } from '@/components/Payment/Columns'

export default function Payment() {
  const { isLoading, error, data } = useQuery(['payment'], () =>
    fetch(API_URL + 'payment').then(res =>
      res.json()
    )
  )

  return (
    <div className='w-full justify-center'>
      <Layout>
        {isLoading ? <Skeleton className="w-[100px] h-[20px] rounded-full" />
          : <DataTable columns={paymentColumns} data={data} />}
      </Layout>
    </div>
  )
}
