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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_2fr] gap-6">
          <Balance />
          <BalanceChart />
        </div>

        <TransactionsTable />
      </div>
    </>
  )
}

export default HomePage
