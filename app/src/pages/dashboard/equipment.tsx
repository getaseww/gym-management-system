import { useQuery } from '@tanstack/react-query'
import Layout from '../../components/sidebar/Layout'
import { DataTable } from '@/components/DataTable'
import { API_URL } from '@/utils/constant'
import { equipmentColumns } from '@/components/Equipment/Columns'
import { Skeleton } from "@/components/ui/skeleton"


export default function Equipment() {

  const { isLoading, error, data } = useQuery(['equipment'], () =>
    fetch(API_URL + 'equipment').then(res =>
      res.json()
    )
  )

  console.log("data from eequipment",isLoading, data)
  return (
    <div className='w-full justify-center'>
      <Layout>
        {isLoading ? <Skeleton className="w-[100px] h-[20px] rounded-full" />
          : <DataTable columns={equipmentColumns} data={data} />}
      </Layout>
    </div>
  )
}
