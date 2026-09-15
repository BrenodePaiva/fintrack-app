import { Navigate } from 'react-router'

import AddTransactionButton from '@/components/add-transaction-button'
import Balance from '@/components/balance'
import BalanceChart from '@/components/balance-chart'
import DateSelection from '@/components/date-selection'
import Header from '@/components/header'
import TransactionsTable from '@/components/transactions-table'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()

  if (isInitializing) return null

  if (!user) return <Navigate to="/login" />

  return (
    <>
      <Header />
      <div className="space-y-6 p-8">
        <div className="inline-table items-center justify-between sm:flex">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="mt-2.5 flex flex-col items-start gap-2 sm:mt-0 sm:flex-row sm:items-center">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1fr_490px]">
          <Balance />
          <BalanceChart />
        </div>

        <TransactionsTable />
      </div>
    </>
  )
}

export default HomePage
