import { useQuery } from '@tanstack/react-query'
import Layout from '../../components/sidebar/Layout'
import { DataTable } from '@/components/DataTable'
import { API_URL } from '@/utils/constant'
import { Skeleton } from '@/components/ui/skeleton'
import { instructorColumns } from '@/components/Instructor/Columns'

export default function Instructor() {

  const { isLoading, error, data } = useQuery(['instructor'], () =>
    fetch(API_URL + 'instructor').then(res =>
      res.json()
    )
  )
  return (
    <div className='w-full justify-center'>

      <Layout>
        {isLoading ? <Skeleton className="w-[100px] h-[20px] rounded-full" />
          : <DataTable columns={instructorColumns} data={data} />}
      </Layout>
    </div>
  )
}
