import { useQuery } from '@tanstack/react-query'
import Layout from '../../components/sidebar/Layout'
import { DataTable } from '@/components/DataTable'
import { API_URL } from '@/utils/constant'
import { Skeleton } from '@/components/ui/skeleton'
import { EquipmentCategoryColumns } from '@/components/EquipmentCategroy/Columns'

export default function EquipmentCategory() {
  const { isLoading, error, data } = useQuery(['equipment-category'], () =>
  fetch(API_URL + 'equipment-category').then(res =>
    res.json()
  )
)

  return (
    <div className='w-full justify-center'>
    <Layout>
      {isLoading ? <Skeleton className="w-[100px] h-[20px] rounded-full" />
        : <DataTable columns={EquipmentCategoryColumns} data={data} />}
    </Layout>
    </div>
  )
}
