import { useQuery } from '@tanstack/react-query'
import Layout from '../../components/sidebar/Layout'
import { DataTable } from '@/components/DataTable'
import { API_URL } from '@/utils/constant'
import { Skeleton } from '@/components/ui/skeleton'
import { attendanceColumns } from '@/components/Attendance/Columns'

export default function Dashboard() {
  const { isLoading, error, data } = useQuery(['attendance'], () =>
  fetch(API_URL + 'attendance').then(res =>
    res.json()
  )
)

  return (
    <div className='w-full justify-center'>
      
      <Layout>
        {isLoading ? <Skeleton className="w-[100px] h-[20px] rounded-full" />
          : <DataTable columns={attendanceColumns} data={data} />}
      </Layout>
    </div>
  )
}
