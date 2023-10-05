import { useQuery } from '@tanstack/react-query'
import Layout from '../../components/sidebar/Layout'
import { DataTable } from '@/components/DataTable'
import { API_URL } from '@/utils/constant'
import { Skeleton } from '@/components/ui/skeleton'
import { membershipPlanColumns } from '@/components/MembershipPlan/Columns'

export default function MembershipPlan() {

  const { isLoading, error, data } = useQuery(['membership-plan'], () =>
  fetch(API_URL + 'membership-plan').then(res =>
    res.json()
  )
)
  return (
    <div className='w-full justify-center'>
     
     <Layout>
        {isLoading ? <Skeleton className="w-[100px] h-[20px] rounded-full" />
          : <DataTable columns={membershipPlanColumns} data={data} />}
      </Layout>
    </div>
  )
}
