import { useQuery } from '@tanstack/react-query'
import Layout from '../../components/sidebar/Layout'
import { DataTable } from '@/components/DataTable'
import { API_URL } from '@/utils/constant'
import { Skeleton } from '@/components/ui/skeleton'
import { fitnessClassColumns } from '@/components/FitnessClass/Columns'

export default function FitnessClass() {

  const { isLoading, error, data } = useQuery(['class'], () =>
  fetch(API_URL + 'class').then(res =>
    res.json()
  )
)

  return (
    <div className='w-full justify-center'>
      <Layout>
        {isLoading ? <Skeleton className="w-[100px] h-[20px] rounded-full" />
          : <DataTable columns={fitnessClassColumns} data={data} />}
      </Layout>
    </div>
  )
}
