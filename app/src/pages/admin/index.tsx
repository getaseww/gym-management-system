import { paymentColumns } from '@/components/Payment/Columns'
import Layout from '../../components/sidebar/Layout'
import { DataTable } from '@/components/DataTable'
import { inventoryColumns } from '@/components/Inventory/Columns'
import { fitnessClassColumns } from '@/components/FitnessClass/Columns'

export default function Dashboard() {

  const data: any = [{
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  }, {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "getasew@example.com",
  }]
  return (
    <div className='w-full justify-center'>
      <Layout>

        <DataTable columns={fitnessClassColumns} data={data} />

        {/* <Button>Hello</Button> */}
        {/* <Classes/> */}
      </Layout>
    </div>
  )
}
